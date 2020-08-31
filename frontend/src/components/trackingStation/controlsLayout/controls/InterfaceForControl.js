import React from 'react';
import ManoeuvreControl from './ManoeuvreControl'
import { UserContext } from './../../../../contexts/UserContext';

import {useContext} from 'react'

const InterfaceForControl = props => {

    const user = useContext(UserContext)

    return (
        <ManoeuvreControl
            user={user}
            menuOpen={props.menuOpen}
            stage={props.stage}
            setIsLoading={props.setIsLoading}
            isLoading={props.isLoading}
            setFailedMsg={props.setFailedMsg}
        />
    );
};

export default InterfaceForControl;