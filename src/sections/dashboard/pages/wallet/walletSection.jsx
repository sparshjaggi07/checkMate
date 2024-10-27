import { NavLink } from 'react-router-dom';
import '../../dashboardStyles.css';
import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure axios is installed
import samplehash from '../../../../assets/images/sampleImages/samplehash.jpeg'; // Import your sample image

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
        <div className="flex flex-col items-center justify-center w-full min-h-screen animated-gradient p-6 font-albulaMedium">
            <h1 className="text-3xl font-bold text-white mb-4">Wallet</h1>

            {/* User Info */}
            <div className="mb-6 text-center">
                <h2 className="text-xl text-white">Welcome, {user.name}!</h2>
                <p className="text-gray-300">{user.email}</p>
            </div>

            {/* Image Cards Section */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
                {/* Demo Card with Sample Image */}
                <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-lg p-4 flex flex-col items-center">
                    <img
                        src={samplehash} // Use the imported sample hash image
                        alt="Demo Image"
                        className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                    <a
                        href={samplehash} // Link to the sample hash image
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                    >
                        Sample Hash Image
                    </a>
                </div>

                {Array.isArray(images) && images.length > 0 ? (
                    images.map((image, index) => (
                        <div key={index} className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-lg p-4 flex flex-col items-center">
                            <img
                                src={`https://ipfs.io/ipfs/${image.ipfsHash}`}
                                alt={`Uploaded Image ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg mb-2"
                            />
                            <a
                                href={`https://ipfs.io/ipfs/${image.ipfsHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline"
                            >
                                {image.ipfsHash}
                            </a>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-300">.</p>
                )}
            </div>

            {/* Navigation Links */}
            <div className="mt-8">
                <NavLink to="/dashboard/profile" className="text-blue-400 hover:underline mr-4">
                    Go to Profile
                </NavLink>
            </div>
        </div>
    );
}

export default Wallet;
