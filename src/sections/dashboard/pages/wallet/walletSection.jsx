import { NavLink } from 'react-router-dom';
import '../../dashboardStyles.css'

import { useAuth0 } from '@auth0/auth0-react';

function Wallet() {

    const { user } = useAuth0();

    return (
        <>
            <h1>Wallet</h1>
        </>
    )
}

export default Wallet;