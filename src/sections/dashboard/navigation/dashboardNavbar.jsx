import { NavLink } from 'react-router-dom';
import ProfileIcon from '../../../assets/icons/d_profileIcon.svg';
import LoginIcon from '../../../assets/icons/d_lockIcon.svg';
import GearIcon from '../../../assets/icons/d_gearIcon.svg';
import ExitIcon from '../../../assets/icons/d_exitIcon.svg';
import { useAuth0 } from "@auth0/auth0-react";

function DashboardNavbar() {
    const { logout } = useAuth0();

    return (
        <>
            <nav className="w-[350px] max-w-[100%] h-screen overflow-y-auto flex flex-col justify-between bg-[#0F0D13ff]">
                <div className="text-white font-extrabold text-5xl text-left p-10 font-albulaExtraBold">
                    CHECK <br /> MATE
                </div>

                <ul className="flex flex-col items-start space-y-6 mb-24 text-gray-400">
                    <li className="w-full">
                        <NavLink to="/dashboard/wallet" className="flex items-center space-x-4 w-full p-5 hover:bg-gray-700 transition ease-in-out">
                            <img src={LoginIcon} alt="Wallet Icon" className="w-7 h-7"/>
                            <span className="text-lg">Wallet</span>
                        </NavLink>
                    </li>
                    <li className="w-full">
                        <NavLink to="/dashboard/verificationSection" className="flex items-center space-x-4 w-full p-5 hover:bg-gray-700 transition ease-in-out">
                            <img src={ProfileIcon} alt="Profile Icon" className="w-7 h-7"/>
                            <span className="text-lg">Verification Section</span>
                        </NavLink>
                    </li>
                    <li className="w-full">
                        <NavLink to="/dashboard/profile" className="flex items-center space-x-4 w-full p-5 hover:bg-gray-700 transition ease-in-out">
                            <img src={GearIcon} alt="Settings Icon" className="w-7 h-7"/>
                            <span className="text-lg">Profile</span>
                        </NavLink>
                    </li>
                </ul>

                <button className="flex items-center space-x-4 w-full p-5 hover:bg-gray-700 transition ease-in-out text-gray-400" onClick={() => logout({ returnTo: window.location.origin })} >
                    <img src={ExitIcon} alt="Exit Icon" className="w-7 h-7"/>
                    <span className="text-lg">Exit / Log Out</span>
                </button>
            </nav>
        </>
        
    );
}

export default DashboardNavbar;