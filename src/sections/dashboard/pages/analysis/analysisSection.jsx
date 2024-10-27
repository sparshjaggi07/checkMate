import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../../dashboardStyles.css';
import { useAuth0 } from '@auth0/auth0-react';

function AnalysisSection() {
    const { user } = useAuth0();
    const [showActions, setShowActions] = useState(Array(4).fill(false));

    const documents = [
        { type: 'Aadhaar Card', uploadDate: '25 Oct 2024 10:30 AM', verificationDate: '25 Oct 2024 12:15 PM', status: 'Verified', hash: 'https://via.placeholder.com/100' },
        { type: 'PAN Card', uploadDate: '13 Oct 2024 09:00 AM', verificationDate: 'Pending', status: 'Pending', hash: 'https://via.placeholder.com/100' },
        { type: 'Admit Card', uploadDate: '5 Oct 2024 11:45 AM', verificationDate: '5 Oct 2024 10:00 AM', status: 'Verified', hash: 'https://via.placeholder.com/100' },
        { type: 'Other Document', uploadDate: '29 Sept 2024 01:20 PM', verificationDate: '29 Sept 2024 02:30 PM', status: 'Verified', hash: 'https://via.placeholder.com/100' },
    ];

    const verifiedCount = documents.filter(doc => doc.status === 'Verified').length;
    const unverifiedCount = documents.filter(doc => doc.status === 'Pending').length;
    const verificationRatio = (verifiedCount / (verifiedCount + unverifiedCount) * 100).toFixed(2);

    const toggleActions = (index) => {
        const updatedShowActions = [...showActions];
        updatedShowActions[index] = !updatedShowActions[index];
        setShowActions(updatedShowActions);
    };

    return (
        <div className="flex flex-col items-center justify-start w-full min-h-screen">
            <div className="dark-gradient-background"></div>

            <div id='walletNavbar' className='w-full h-[100px] flex flex-row justify-between items-center font-albulaRegular backdrop-blur-md bg-slate-900 rounded-lg shadow-lg p-10'>
                <span className='text-3xl font-albulaBold text-white'>Welcome {user.given_name} {user.family_name}</span>
                <NavLink to="/dashboard/profile" id='md_imgHolder'>
                    <img src={user.picture} alt="User Icon" className='md_userIcon rounded-full h-[70%] w-[70%]' />
                </NavLink>
            </div>

            <div className="w-full grid grid-cols-4 gap-4 p-8">
                <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-2xl p-6 border border-slate-700">
                    <h3 className="text-lg font-bold text-gray-100 font-albulaMedium">Verified Documents</h3>
                    <p className="text-2xl font-bold text-blue-500">{verifiedCount}</p>
                </div>
                <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-2xl p-6 border border-slate-700">
                    <h3 className="text-lg font-bold text-gray-100 font-albulaMedium">Unverified Documents</h3>
                    <p className="text-2xl font-bold text-yellow-500">{unverifiedCount}</p>
                </div>
                <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-2xl p-6 border border-slate-700">
                    <h3 className="text-lg font-bold text-gray-100 font-albulaMedium">Verification Ratio</h3>
                    <p className="text-2xl font-bold text-purple-500">{verificationRatio}%</p>
                </div>
                <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-2xl p-6 border border-slate-700">
                    <h3 className="text-lg font-bold text-gray-100 font-albulaMedium">Access Wallet</h3>
                </div>
            </div>

            <main className="flex flex-col items-center w-full p-8 font-albulaMedium min-h-screen backdrop-blur-xl">
                <div className="rounded-[50px] backdrop-blur-md bg-gray-800 bg-opacity-50 p-10 text-gray-50 w-full shadow-lg border border-gray-600">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Document Logs</h2>
                    </div>
                    <p className="text-gray-100 mb-4">Uploaded Documents</p>

                    <div className="grid grid-cols-5 gap-4 px-10 py-4 font-semibold text-white">
                        <div>Document Type</div>
                        <div>Upload Date</div>
                        <div>Verification Date</div>
                        <div>Status</div>
                        <div className="text-right">Actions</div>
                    </div>

                    <div className="space-y-2 mt-2">
                        {documents.map((document, index) => (
                            <div key={index} className="grid grid-cols-5 gap-4 items-center px-10 py-4 rounded-full shadow-lg border border-gray-200 bg-gray-800 bg-opacity-40 backdrop-blur-md hover:bg-opacity-50 transition duration-300 ease-in-out">
                                <div className="flex items-center space-x-3">
                                    <span className="text-gray-200 font-medium">{document.type}</span>
                                </div>
                                <div className="text-gray-300">{document.uploadDate}</div>
                                <div className="text-gray-300">{document.verificationDate}</div>
                                <div>
                                    <span className={`inline-flex items-center justify-center w-24 h-8 px-3 py-1 rounded-full text-sm font-semibold ${
                                        document.status === 'Verified' ? 'bg-green-400 text-white' : 'bg-yellow-500 text-white'
                                    }`}>
                                        {document.status}
                                    </span>
                                </div>
                                <div className="text-right">
                                    {showActions[index] ? (
                                        <div className="flex space-x-2 opacity-100 transition-opacity duration-500 ease-out">
                                            <a href={document.hash} target="_blank" rel="noopener noreferrer" className="text-blue-600">View</a>
                                            {document.status === 'Pending' && (
                                                <button className="text-blue-600" onClick={() => alert('Connect functionality here')}>Connect</button>
                                            )}
                                        </div>
                                    ) : (
                                        <button
                                            className="inline-flex items-center justify-center w-20 h-8 px-3 py-1 rounded-full text-sm transition duration-300 ease-in-out transform hover:scale-105 bg-purple-600 text-white"
                                            onClick={() => toggleActions(index)}
                                        >
                                            Action
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AnalysisSection;