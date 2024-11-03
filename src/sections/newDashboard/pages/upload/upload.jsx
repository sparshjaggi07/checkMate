import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Lottie from 'react-lottie';
import axios from 'axios';

import UploadIcon from '../../../../assets/icons/uploadIcon.png';
import chimeSound from '../../../../assets/sound/chime.mp3';
import errorSound from '../../../../assets/sound/error.mp3'
import animationData from '../../../../assets/animations/enlargingCircle_Loader.json';
import tickAnimation from '../../../../assets/animations/tickAnimation.json';
import errorAnimation from '../../../../assets/animations/Error_Animation.json';

function Profile() {
    const { user, isAuthenticated } = useAuth0();
    const [file, setFile] = useState(null);
    const [docType, setDocType] = useState('');
    const [loading, setLoading] = useState(false);
    const [ipfsHash, setIpfsHash] = useState(null);
    const [verifyStatus, setVerifyStatus] = useState(false);

    const [newHash, setNewHash] = useState(null);
    const [error, setError] = useState(false);


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleRemoveFile = () => {
        setFile(null);
        setDocType('');
        setIpfsHash(null);
        setVerifyStatus(false);
        setError(false);
        setNewHash(null);
    };

    const handleTypeChange = (e) => {
        setDocType(e.target.value);
    };

    const handleUpload = async () => {
        if (file && docType) {
            await handleStoreDocument();
        } else {
            alert('Please select a file and document type.');
        }
    };

    const PINATA_API_KEY = import.meta.env.VITE_PINATA_API_KEY;
    const PINATA_SECRET_API_KEY = import.meta.env.VITE_PINATA_SECRET_KEY;

    const handleStoreDocument = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
        
            const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
            const headers = {
                pinata_api_key: PINATA_API_KEY,
                pinata_secret_api_key: PINATA_SECRET_API_KEY,
                "Content-Type": "multipart/form-data",
            };
        
            const response = await axios.post(url, formData, { headers });
            const hash = response.data.IpfsHash;
            setIpfsHash(hash);
            
        
        // Prepare data to send to your backend
        const backendData = JSON.stringify({
            ipfs_link: hash
        });

        const config = {
            method: 'post',
            url: `http://127.0.0.1:5000/c/${user.sub}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: backendData
        };
        

        // Send IPFS hash and document type to backend
        const backendResponse = await axios.request(config);
        const backendResponseData = backendResponse.data;

        console.log(JSON.stringify(backendResponseData));
        console.log(backendResponseData);
        console.log(docType);

        if(backendResponseData["predicted_document_type"] == docType){
            console.log("Classification of Document Completed");

            // Call to the second backend route if classification is successful
            const secondConfig = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:5000/p',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({ ipfs_link: hash })
            };

            const secondResponse = await axios.request(secondConfig);
            const secondResponseData = secondResponse.data;
            console.log(JSON.stringify(secondResponseData));

            if(secondResponseData["Match Result"]==1){
                console.log("Data Set Matched Successfully");

                // Additional request if dataset matched
                let additionalData = JSON.stringify({
                    "ipfs_link": hash // Use the same IPFS hash
                });

                let additionalConfig = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'http://127.0.0.1:5000/o',
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    data: additionalData
                };

                // Send additional request using await
                const additionalResponse = await axios.request(additionalConfig);
                const verifiedHash = additionalResponse.data;
                setNewHash(verifiedHash.ipfs_hash);

                console.log(verifiedHash);
                setLoading(false);
                setVerifyStatus(true);
                playChimeSound();
            } else {
                console.log("Data Set Matching Failed!");
                setError(true);
                playErrorSound();
            }

        } else {
            console.log("Classification of Document Failed!");
            setError(true);
            playErrorSound();
        }

        
        } catch (error) {
            console.error("Error uploading document to Pinata:", error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };

    const playChimeSound = () => {
        const audio = new Audio(chimeSound);
        audio.play();
    };

    const playErrorSound = () => {
        const audio = new Audio(errorSound);
        audio.play();
    };

    const [showAnimation, setShowAnimation] = useState(false);

    useEffect(() => {
        // Set showAnimation to true whenever loading, error, or verifyStatus is true
        if (loading || error || verifyStatus) {
            setShowAnimation(true);

            // Set a timeout to hide the animation after 5 seconds
            const timeout = setTimeout(() => {
                setShowAnimation(false);
            }, 5000);

            // Clear timeout if loading, error, or verifyStatus changes before 5 seconds
            return () => clearTimeout(timeout);
        }
    }, [loading, error, verifyStatus]);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        isAuthenticated && (
            <main className="fixed w-[calc(100vw-450px)] h-screen bg-[#0F0D13ff] rounded-tl-[40px] rounded-bl-[40px] p-7 font-albulaRegular transition-all duration-300">
                <div className="flex flex-row bg-white text-gray-900 rounded-[40px] h-full border-gray-400 shadow-lg">
                    <div className="w-2/3 bg-gray-50  py-36 px-20 shadow-inner flex flex-col justify-center rounded-l-[40px]">
                        
                    </div>

                    <div className="flex flex-col items-center justify-between w-2/3 bg-gradient-to-b from-violet-200 to-violet-300 rounded-r-[40px] py-36 shadow-inner">
                        <div className="w-full h-full bg-opacity-90 backdrop-blur-md  rounded-lg p-12 flex flex-col justify-center items-center">
                            <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center font-albulaMedium">Uploading Section</h1>

                            <div className="border-2 border-dashed border-gray-500 rounded-lg p-6 bg-gray-700 bg-opacity-30 mb-6 w-full h-[150px] transform transition-all duration-300 ease-in-out flex flex-col justify-center hover:drop-shadow-2xl">
                                {!file ? (
                                    <div className="flex flex-col items-center justify-center cursor-pointer h-full">
                                        <label htmlFor="file-upload" className="cursor-pointer">
                                            <div className="flex flex-col items-center justify-center">
                                                <img src={UploadIcon} alt="Upload Icon" className="w-[40px] h-[40px]"/>
                                                <p className="mt-5 text-white">Click to Upload File</p>
                                            </div>
                                            <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                                        </label>
                                    </div>
                                ) : (
                                    <div className="flex flex-row items-center justify-between">
                                        <p className="text-sm text-white">{file.name}</p>
                                        <button className="p-2 text-gray-400 bg-gray-700  rounded-full hover:bg-orange-600 transition-all duration-200" onClick={handleRemoveFile} >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="white">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>

                            <select value={docType} onChange={handleTypeChange} className="block w-full p-3 mb-6 border border-gray-500 rounded-md bg-gray-600 text-white focus:ring focus:ring-purple-500" disabled={!file}>
                                <option value="">Select Document Type</option>
                                <option value="admit">Admit Card</option>
                                <option value="result">Result</option>
                                <option value="other">Other</option>
                            </select>

                            <button onClick={handleUpload} className="w-full bg-purple-700 text-white py-3 rounded-md hover:bg-purple-800 transition-colors" disabled={!file || !docType}> Next </button>

                            
                            <div className="mt-6 flex justify-center">
                                {loading ? (
                                    <Lottie options={defaultOptions} height={150} width={150} />
                                ) : error ? (
                                    showAnimation && (
                                        <Lottie options={{ loop: false, autoplay: true, animationData: errorAnimation, rendererSettings: { preserveAspectRatio: "xMidYMid slice" } }} height={100} width={100} />
                                    )
                                ) : verifyStatus ? (
                                    showAnimation && (
                                        <Lottie options={{ loop: false, autoplay: true, animationData: tickAnimation, rendererSettings: { preserveAspectRatio: "xMidYMid slice" } }} height={150} width={150} />
                                    )
                                ) : null}
                            </div>

                            {error}
                        </div>
                    </div>
                </div>
            </main>
        )
    );
}

export default Profile;