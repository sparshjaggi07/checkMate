import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../../dashboardStyles.css';
import { useAuth0 } from '@auth0/auth0-react';

function AnalysisSection() {
    const { user } = useAuth0();
    const [showActions, setShowActions] = useState(Array(4).fill(false));

    const documents = [
        { type: 'Aadhaar Card', uploadDate: '31 Aug 2023 10:30 AM', verificationDate: '01 Sep 2023 12:15 PM', status: 'Verified', hash: 'https://via.placeholder.com/100' },
        { type: 'PAN Card', uploadDate: '30 Aug 2023 09:00 AM', verificationDate: 'Pending', status: 'Pending', hash: 'https://via.placeholder.com/100' },
        { type: 'Admit Card', uploadDate: '30 Aug 2023 11:45 AM', verificationDate: '31 Aug 2023 10:00 AM', status: 'Verified', hash: 'https://via.placeholder.com/100' },
        { type: 'Other Document', uploadDate: '29 Aug 2023 01:20 PM', verificationDate: '30 Aug 2023 02:30 PM', status: 'Verified', hash: 'https://via.placeholder.com/100' },
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
        <div className="flex flex-col items-center justify-start w-full min-h-screen animated-background">
            <div id='walletNavbar' className='bg-slate-900 w-full h-[100px] flex flex-row justify-between items-center font-albulaRegular text-gray-800 p-10'>
                <span className='text-3xl font-albulaBold text-white'>Welcome {user.given_name} {user.family_name}</span>
                <NavLink to="/dashboard/profile" id='md_imgHolder'>
                    <img src={user.picture} alt="User Icon" className='md_userIcon rounded-full h-[70%] w-[70%]'/>
                </NavLink>
            </div>

            {/* Top Menu Cards */}
            <div className="w-full grid grid-cols-3 gap-4 p-4">
                <div className="bg-white shadow-lg rounded-lg p-4 text-center">
                    <h3 className="text-lg font-bold text-gray-600">Verified Documents</h3>
                    <p className="text-2xl font-bold text-blue-500">{verifiedCount}</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4 text-center">
                    <h3 className="text-lg font-bold text-gray-600">Unverified Documents</h3>
                    <p className="text-2xl font-bold text-yellow-500">{unverifiedCount}</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4 text-center">
                    <h3 className="text-lg font-bold text-gray-600">Verification Ratio</h3>
                    <p className="text-2xl font-bold text-purple-500">{verificationRatio}%</p>
                </div>
            </div>

            <main className="flex flex-col items-center w-full p-8 font-albulaMedium">
                <div className="bg-gray-100 backdrop-blur-lg border border-gray-300 rounded-lg p-6 text-gray-800 w-full">
                    <h2 className="text-xl font-bold">Document Verification</h2>
                    <p className="text-gray-600">Uploaded Documents</p>
                    <div className="overflow-x-auto mt-4">
                        <table className="min-w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-gray-300 text-gray-600">
                                    <th className="py-2 px-4">Document Type</th>
                                    <th className="py-2 px-4">Upload Date</th>
                                    <th className="py-2 px-4">Verification Date</th>
                                    <th className="py-2 px-4">Status</th>
                                    <th className="py-2 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map((document, index) => (
                                    <tr key={index} className="border-b border-gray-300 transition duration-300 ease-in-out hover:bg-gray-200">
                                        <td className="py-3 px-4 text-gray-700">{document.type}</td>
                                        <td className="py-3 px-4 text-gray-700">{document.uploadDate}</td>
                                        <td className="py-3 px-4 text-gray-700">{document.verificationDate}</td>
                                        <td className="py-3 px-4">
                                            <span className={`inline-flex items-center justify-center w-24 h-8 px-3 py-1 rounded-full text-sm ${
                                                document.status === 'Verified' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
                                            }`}>
                                                {document.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
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
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AnalysisSection;
