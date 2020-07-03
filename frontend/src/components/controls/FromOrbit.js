import React, { Component } from 'react';
import axios from 'axios';
import { ShipContext } from '../../contexts/ShipProvider'
import FromOrbitToSurface from './FromOrbitToSurface'
import EscapeFromOrbit from './EscapeFromOrbit';
import ChildTransfert from './ChildTransfer';
import CommandModuleReEntry from './CommandModuleReEntry';
import PlanetTransfert from './PlanetTransfert';
import BackFromParent from './BackFromParent'
import FromMoonToMoon from './FromMoonToMoon';

export default class FromOrbit extends Component {
    state = {
        celestBodies: null
    }

    async componentDidMount() {
        try {
            const celestBodyRes = await axios({
                method: 'GET',
                url: `http://localhost:1337/celest-bodies/`
            })
            const fetchedCelestBody = celestBodyRes.data
            this.setState({ celestBodies: fetchedCelestBody })
            console.log('fetchedCelestBody', fetchedCelestBody);
        } catch (e) {
            alert(e)
        }
    }

    render() {
        if (this.state.celestBodies === null) {
            return 'loading'
        } else
            return (
                <div className='from__orbit'>
                    <FromOrbitToSurface 
                        fromOrbitToSurface={this.props.fromOrbitToSurface}
                        ship={this.props.ship}
                        celestBodies={this.state.celestBodies}
                    />
                    <EscapeFromOrbit
                        escapeFromOrbit={this.props.escapeFromOrbit}
                        ship={this.props.ship}
                        celestBodies={this.state.celestBodies}
                    />
                    <ChildTransfert 
                        childTransfert={this.props.childTransfert}
                        celestBodies={this.state.celestBodies}
                        ship={this.props.ship}
                    />
                    <CommandModuleReEntry 
                        commandModuleReEntry={this.props.commandModuleReEntry}
                        ship={this.props.ship}
                        celestBodies={this.state.celestBodies}
                        stage={this.props.stage}
                    />
                    <PlanetTransfert
                        ship={this.props.ship}
                        planetTransfert={this.props.planetTransfert}
                        celestBodies={this.state.celestBodies}
                    />
                    <BackFromParent 
                        ship={this.props.ship}
                        celestBodies={this.state.celestBodies}
                        backToParent={this.props.backToParent}
                    />
                    <FromMoonToMoon
                        fromMoonToMoon={this.props.fromMoonToMoon}
                        ship={this.props.ship}
                        celestBodies={this.state.celestBodies}
                    />
                </div>
            );
    }
}

FromOrbit.contextType = ShipContext;
