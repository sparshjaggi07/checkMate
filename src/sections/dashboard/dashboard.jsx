import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import DashboardNavbar from './navigation/dashboardNavbar'

function Dashboard () {
    return (
        <>
            <div className="fixed left-0 w-[350px] h-screen z-10">
                <DashboardNavbar />
            </div>
            <div className="ml-[350px] p-6 w-full">
                <Outlet />
            </div>
        </>
    );
}

export default Dashboard;