import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const LogOut = props => {

    const user = useContext(UserContext)
    
    function doLogOut(){
        console.log('yes');
        localStorage.removeItem('user')
        user.setUser(null)
    }

    return (
        <p onClick={doLogOut} style={{
            fontSize: '1.2rem',
            padding: '1rem 0',
            cursor: 'pointer',
            transition: 'color 0.2s ease-in-out',
            animation: '0.5s slideIn forwards',
        }} className={props.menuOpen ? 'logout' : 'logout disNone'}>Log out</p>
    );
};

export default LogOut;