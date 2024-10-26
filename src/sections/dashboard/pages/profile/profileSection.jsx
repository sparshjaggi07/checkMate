import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from 'react';

function Profile() {
    const { user, isAuthenticated } = useAuth0();

    // Load saved profile info from localStorage
    const loadProfileInfo = () => {
        const savedProfile = localStorage.getItem('profileInfo');
        return savedProfile ? JSON.parse(savedProfile) : {
            enrollmentNumber: '',
            age: '',
            branch: '',
            rollNumber: '',
            collegeName: '',
            semester: '1',
        };
    };

    // State for additional user information
    const [profileInfo, setProfileInfo] = useState(loadProfileInfo);

    // Update localStorage whenever profileInfo changes
    useEffect(() => {
        localStorage.setItem('profileInfo', JSON.stringify(profileInfo));
    }, [profileInfo]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileInfo({
            ...profileInfo,
            [name]: value,
        });
    };

    // Handle form submission (for updating info)
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('Updated Profile Info:', profileInfo);
        alert("Profile information saved!");
    };

    return (
        isAuthenticated && (
            <div className="flex items-center justify-center w-full min-h-screen animated-gradient p-6 font-albulaMedium">
                <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6">
                    
                    {/* Image Section with Glassmorphism */}
                    <div className="w-full md:w-1/3 bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-2xl shadow-lg p-6 flex flex-col items-center">
                        <div className="w-40 h-40 rounded-full bg-white shadow-inner flex items-center justify-center mb-4">
                            <img src={user.picture} alt="User" className="w-36 h-36 rounded-full" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">{user.name}</h3>
                        <p className="text-gray-300 mb-4">{user.email}</p>
                        <div className="text-center w-full">
                            <p className="text-gray-300 my-1">Document Uploads: <span className="font-semibold text-orange-400">4</span></p>
                            <p className="text-gray-300 my-1">Document Verified: <span className="font-semibold text-green-400">3</span></p>
                            <p className="text-gray-300 my-1">Document Unverified <span className="font-semibold text-blue-400">1</span></p>
                        </div>
                    </div>
                    
                    {/* Details Section with Glassmorphism */}
                    <div className="w-full md:w-2/3 bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-2xl shadow-lg p-6 flex flex-col">
                        <form onSubmit={handleFormSubmit} className="w-full space-y-4">
                            <h3 className="text-2xl font-semibold text-white mb-4 text-center">Personal Information</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* First Name */}
                                <div className="flex flex-col">
                                    <label className="text-white font-medium">First Name</label>
                                    <input
                                        type="text"
                                        value={user.given_name || ''}
                                        readOnly
                                        className="p-3 rounded-lg bg-white bg-opacity-10 backdrop-blur-md text-white placeholder-white shadow-inner"
                                    />
                                </div>

                                {/* Last Name */}
                                <div className="flex flex-col">
                                    <label className="text-white font-medium">Last Name</label>
                                    <input
                                        type="text"
                                        value={user.family_name || ''}
                                        readOnly
                                        className="p-3 rounded-lg bg-white bg-opacity-10 backdrop-blur-md text-white placeholder-white shadow-inner"
                                    />
                                </div>

                                {/* Enrollment Number */}
                                <div className="flex flex-col">
                                    <label className="text-white font-medium">Enrollment Number</label>
                                    <input
                                        type="text"
                                        name="enrollmentNumber"
                                        value={profileInfo.enrollmentNumber}
                                        onChange={handleInputChange}
                                        className="p-3 rounded-lg bg-white bg-opacity-10 backdrop-blur-md text-white placeholder-white shadow-inner"
                                    />
                                </div>

                                {/* Age */}
                                <div className="flex flex-col">
                                    <label className="text-white font-medium">Age</label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={profileInfo.age}
                                        onChange={handleInputChange}
                                        className="p-3 rounded-lg bg-white bg-opacity-10 backdrop-blur-md text-white placeholder-white shadow-inner"
                                    />
                                </div>

                                {/* Branch */}
                                <div className="flex flex-col">
                                    <label className="text-white font-medium">Branch</label>
                                    <input
                                        type="text"
                                        name="branch"
                                        value={profileInfo.branch}
                                        onChange={handleInputChange}
                                        className="p-3 rounded-lg bg-white bg-opacity-10 backdrop-blur-md text-white placeholder-white shadow-inner"
                                    />
                                </div>

                                {/* Roll Number */}
                                <div className="flex flex-col">
                                    <label className="text-white font-medium">Roll Number</label>
                                    <input
                                        type="text"
                                        name="rollNumber"
                                        value={profileInfo.rollNumber}
                                        onChange={handleInputChange}
                                        className="p-3 rounded-lg bg-white bg-opacity-10 backdrop-blur-md text-white placeholder-white shadow-inner"
                                    />
                                </div>

                                {/* College Name */}
                                <div className="flex flex-col">
                                    <label className="text-white font-medium">College Name</label>
                                    <input
                                        type="text"
                                        name="collegeName"
                                        value={profileInfo.collegeName}
                                        onChange={handleInputChange}
                                        className="p-3 rounded-lg bg-white bg-opacity-10 backdrop-blur-md text-white placeholder-white shadow-inner"
                                    />
                                </div>

                                {/* Semester (Dropdown) */}
                                <div className="flex flex-col">
                                    <label className="text-white font-medium">Semester</label>
                                    <select
                                        name="semester"
                                        value={profileInfo.semester}
                                        onChange={handleInputChange}
                                        className="p-3 rounded-lg bg-white bg-opacity-10 backdrop-blur-md text-black shadow-inner"
                                    >
                                        {Array.from({ length: 8 }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Update Button */}
                            <button
                                type="submit"
                                className="w-full mt-6 p-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
}

export default Profile;
