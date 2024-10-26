import { NavLink } from 'react-router-dom';
import '../../dashboardStyles.css'

import { useAuth0 } from '@auth0/auth0-react';

function Wallet() {

    const { user } = useAuth0();

    return (
        <>
            <div className="flex flex-col items-center justify-start w-full min-h-screen animated-gradient">
                <div id='walletNavbar' className='bg-[#19161f] bg-opacity-50 backdrop-blur-xl border border-[#ffffff1a] w-full h-[100px] flex flex-row justify-between items-center font-albulaRegular text-white p-10'>
                    <span className='text-3xl'>Welcome {user.given_name} {user.family_name}</span>
                    <NavLink to="/dashboard/profile" id='md_imgHolder'>
                        <img src={user.picture} alt="User Icon" className='md_userIcon rounded-full h-[70%] w-[70%]'/>
                    </NavLink>
                </div>

                <main>
                    
                </main>
            </div>
        </>
    )
}

export default Wallet;