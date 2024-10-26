import React, { useState } from 'react';
import axios from 'axios';
import Lottie from 'react-lottie';
import { useAuth0 } from '@auth0/auth0-react';

import animationData from '../../../../assets/animations/enlargingCircle_Loader.json'; // adjust path as needed
import '../../dashboardStyles.css';

const UploadSection = () => {
    const [file, setFile] = useState(null);
    const [docType, setDocType] = useState('');
    const [loading, setLoading] = useState(false);
    const [ipfsHash, setIpfsHash] = useState(null);
    
    const { user } = useAuth0();

    const userID = user.sub;

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleRemoveFile = () => {
        setFile(null);
        setDocType('');
        setIpfsHash(null);
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

    const handleStoreDocument = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
    
            const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
            const headers = {
                pinata_api_key: '04b26ee360171f03ae2b',
                pinata_secret_api_key: '250fe3ce90862d18f94ced6c065a6bec5a956d528aef8ab9d737a9b3f0ca8065',
                "Content-Type": "multipart/form-data",
            };
    
            const response = await axios.post(url, formData, { headers });
            const hash = response.data.IpfsHash;
            setIpfsHash(hash);
    
            // Store hash in MongoDB along with userID and docType
            await axios.post('http://localhost:5000/api/storeDocument', {
                userID,
                docType,
                ipfsHash: hash,
            });
        } catch (error) {
            console.error("Error uploading document to Pinata:", error.response ? error.response.data : error.message);
            alert('Failed to store document in IPFS.');
        } finally {
            setLoading(false);
        }
    };
    

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen animated-gradient">
            <div className="max-w-xl w-full bg-gray-800 bg-opacity-40 backdrop-blur-md shadow-lg rounded-lg p-8 glass-card">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">Document Upload</h1>

                <div className="border-2 border-dashed border-gray-500 rounded-lg p-6 bg-gray-700 bg-opacity-30 mb-6">
                    {!file ? (
                        <div className="flex flex-col items-center justify-center cursor-pointer">
                            <label htmlFor="file-upload" className="cursor-pointer">
                                <div className="flex flex-col items-center justify-center">
                                    <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 01-4 4h16a4 4 0 004-4V8a4 4 0 00-4-4H7m7 12l5-5m0 0l-5-5m5 5H8" />
                                    </svg>
                                    <p className="mt-2 text-gray-300">Click to Upload File</p>
                                </div>
                                <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                            </label>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-300">{file.name}</p>
                            <button className="p-2 text-gray-400 bg-gray-600 bg-opacity-30 rounded-full hover:bg-gray-700" onClick={handleRemoveFile} >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                <select value={docType} onChange={handleTypeChange} className="block w-full p-3 mb-6 border border-gray-500 rounded-md bg-gray-600 text-white focus:ring focus:ring-purple-500" disabled={!file}>
                    <option value="">Select Document Type</option>
                    <option value="aadhar">Aadhar Card</option>
                    <option value="admit">Admit Card</option>
                    <option value="pan">PAN Card</option>
                    <option value="other">Other</option>
                </select>

                <button onClick={handleUpload} className="w-full bg-purple-700 text-white py-3 rounded-md hover:bg-purple-800 transition-colors" disabled={!file || !docType} >
                    Next
                </button>

                {loading && (
                    <div className="mt-6 flex justify-center">
                        <Lottie options={defaultOptions} height={150} width={150} />
                    </div>
                )}

                {ipfsHash && (
                    <div className="mt-6 p-4 bg-gray-700 bg-opacity-40 rounded-lg flex justify-center">
                        <a href={`https://ipfs.io/ipfs/${ipfsHash}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{ipfsHash}</a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadSection;