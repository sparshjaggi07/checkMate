import { NavLink } from 'react-router-dom';
import '../../dashboardStyles.css';
import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure axios is installed
import samplehash from '../../../../assets/sampleImages/samplehash.jpg'; // Import your sample image

function Wallet() {
    const { user } = useAuth0();
    const [images, setImages] = useState([]);

    // Fetch IPFS hashes from MongoDB based on user ID
    const fetchImagesFromMongoDB = async () => {
        try {
            const response = await axios.get('/api/images', {
                params: { userId: user.sub } // Pass the user ID as a query parameter
            });
            console.log('Response data:', response.data); // Log the response
            setImages(response.data); // Ensure this is an array
        } catch (error) {
            console.error('Error fetching images from MongoDB:', error);
        }
    };

    // Fetch images when component mounts
    useEffect(() => {
        fetchImagesFromMongoDB();
    }, [user.sub]); // Ensure to refetch if user ID changes

    return (
        <>
            <div className="flex flex-col items-center justify-start w-full h-full min-h-screen">
                <div id='walletNavbar' className='bg-slate-900 w-full h-[100px] flex flex-row justify-between items-center font-albulaRegular text-gray-800 p-10'>
                    <span className='text-3xl font-albulaBold text-white'>Welcome {user.given_name} {user.family_name}</span>
                    <NavLink to="/dashboard/profile" id='md_imgHolder'>
                        <img src={user.picture} alt="User Icon" className='md_userIcon rounded-full h-[70%] w-[70%]'/>
                    </NavLink>
                </div>
                <main className='w-full h-full'>
                    <div className="flex flex-col items-center justify-center w-full h-full p-6 font-albulaMedium bg-green-100">
                        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">Wallet</h1>

                            <div className="mb-6 text-center">
                                <h2 className="text-2xl text-gray-800">Welcome, {user.name}!</h2>
                                <p className="text-gray-600">{user.email}</p>
                            </div>

                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border">
                                <div className="bg-white rounded-lg p-4 flex flex-col items-center shadow-md">
                                    <img src={samplehash} alt="Demo Image" className="w-full h-48 object-cover rounded-lg mb-2" />
                                    <a href={samplehash} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" >
                                        Sample Hash Image
                                    </a>
                                </div>

                                {Array.isArray(images) && images.length > 0 ? (
                                    images.map((image, index) => (
                                        <div key={index} className="bg-white rounded-lg p-4 flex flex-col items-center shadow-md">
                                            <img src={`https://ipfs.io/ipfs/${image.ipfsHash}`} alt={`Uploaded Image ${index + 1}`} className="w-full h-48 object-cover rounded-lg mb-2" />
                                            <a
                                                href={`https://ipfs.io/ipfs/${image.ipfsHash}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                {image.ipfsHash}
                                            </a>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-600 text-center col-span-full">No images found.</p>
                                )}
                            </div>

                            {/* Navigation Links */}
                            <div className="mt-8 text-center">
                                <NavLink to="/dashboard/profile" className="text-blue-600 hover:underline mr-4">
                                    Go to Profile
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </ main>
            </div>
        </>
    );
}

export default Wallet;
