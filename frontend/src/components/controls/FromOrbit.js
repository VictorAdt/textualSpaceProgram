import React, { Component } from 'react';
import axios from 'axios';
import { ShipContext } from '../../contexts/ShipProvider'
import FromOrbitToSurface from './FromOrbitToSurface'

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
                    />
                    <button
                        // isPlanet={this.hasChild}
                        onClick={() => this.props.escapeFromOrbit()}>
                        escape gravity
                    </button>
                    <button
                        // hasChild={this.hasChild}
                        onClick={() => this.props.childTransfer()}>
                        tranfert to child
                    </button>
                    <button
                        //  hasParachute={this.hasParachute && hasAtmospher}
                        onClick={() => this.props.commandModuleReEntry()}>
                        Make a re-entry burn and land the capsule
                    </button>

                    {this.state.celestBodies.map((e, i) => {
                        if (e.type === 'planet') {
                            return (
                                <button key={i} value={e} onClick={() => this.props.planetTransfert(e)}> tranfert to {e.name} </button>
                            )
                        } else {
                            return ''
                        }
                    }
                    )}
                </div>
            );
    }
}

FromOrbit.contextType = ShipContext;
