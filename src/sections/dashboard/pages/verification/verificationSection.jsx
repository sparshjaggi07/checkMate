import React, { useState } from 'react';
import axios from 'axios';

import '../../dashboardStyles.css'

const DocumentManagement = () => {
    const [file, setFile] = useState(null);
    const [docType, setDocType] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ipfsHash, setIpfsHash] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleRemoveFile = () => {
        setFile(null);
        setDocType('');
        setIpfsHash(null);
        setIsValid(false);
    };

    const handleTypeChange = (e) => {
        setDocType(e.target.value);
    };

    const handleUpload = () => {
        if (file && docType) {
            setIsValid(true); // Immediately set the document as valid for now
        } else {
            alert('Please select a file and document type.');
        }
    };
    

    const handleStoreDocument = async () => {
        if (file) {
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
                
                // Try uploading to Pinata
                const response = await axios.post(url, formData, { headers });
                console.log(response.data); // Log the full response from Pinata
                
                // If the response is successful, store the hash
                const hash = response.data.IpfsHash;
                setIpfsHash(hash);
                alert(`Document stored in IPFS with hash: ${hash}`);
                        
            } catch (error) {
                // If there's an error, handle it and log the details
                console.error("Error uploading document to Pinata:", error.response ? error.response.data : error.message);
                alert('Failed to store document in IPFS.');
            } finally {
                setLoading(false); // Set loading to false once the request completes
            }
        } else {
            alert("Select a file!");
        }
    };
    

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen animated-gradient">
            <div className="max-w-xl w-full bg-gray-800 bg-opacity-40 backdrop-blur-md shadow-lg rounded-lg p-8 glass-card">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">Document Upload</h1>

                <div className="border-2 border-dashed border-gray-500 rounded-lg p-6 bg-gray-700 bg-opacity-30 mb-6">
                    {!file ? (
                        <div className="flex flex-col items-center justify-center cursor-pointer" >
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

                <button onClick={handleUpload} className="w-full bg-purple-700 text-white py-3 rounded-md hover:bg-purple-800 transition-colors" disabled={!file || !docType} >Next</button>

                {loading && <p className="mt-6 text-center text-gray-300">Loading... Verifying document...</p>}

                {isValid && (
                    <div className="mt-6">
                        <p className="text-center text-green-500 mb-4">Document Verified!</p>
                        <button onClick={handleStoreDocument} className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors" >
                            Store in IPFS
                        </button>

                        {ipfsHash && (
                            <div className="mt-6 p-4 bg-gray-700 bg-opacity-40 rounded-lg">
                                <p className="text-gray-300">IPFS Hash: {ipfsHash}</p>
                                <a href={`https://ipfs.io/ipfs/${ipfsHash}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                    View Document
                                </a>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DocumentManagement;
