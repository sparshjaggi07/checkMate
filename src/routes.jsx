import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

import Home from './sections/home/home';
import DashboardLayout from './sections/dashboard/dashboardLayout';
import Wallet from './sections/dashboard/pages/wallet/walletSection';
import VerificationSection from './sections/dashboard/pages/verification/verificationSection';
import Profile from './sections/dashboard/pages/profile/profileSection';

function WebRoutes() {
    const { isAuthenticated } = useAuth0();

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />

                {isAuthenticated ? (
                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route path="wallet" element={<Wallet />} />
                        <Route path="verificationSection" element={<VerificationSection />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="" element={<Navigate to="wallet" />} />
                    </Route>
                ) : (
                    <Route path="*" element={<Navigate to="/" />} />
                )}

            </Routes>
        </Router>
    );
}

export default WebRoutes;
