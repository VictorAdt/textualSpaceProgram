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
import Carousel from './../../../node_modules/react-bootstrap/Carousel'


export default class FromOrbit extends Component {
    state = {
        celestBodies: null,
        index: 0
    }

    async componentDidMount() {
        try {
            const celestBodyRes = await axios({
                method: 'GET',
                url: `/celest-bodies/`
            })
            const fetchedCelestBody = celestBodyRes.data
            this.setState({ celestBodies: fetchedCelestBody })
            console.log('fetchedCelestBody', fetchedCelestBody);
        } catch (e) {
            alert(e)
        }
    }

    handleSelect = (selectedIndex, e) => {
        this.setState({ index: selectedIndex });
    };

    render() {
        if (this.state.celestBodies === null) {
            return 'loading'
        } else
            return (
                <Carousel
                    wrap={true}
                    indicators={true}
                    interval={null}
                    keyboard={true}
                    activeIndex={this.state.index}
                    onSelect={this.handleSelect}>


                    {this.props.ship.celest_body.hasGround &&
                        <Carousel.Item>
                            <FromOrbitToSurface
                                fromOrbitToSurface={this.props.fromOrbitToSurface}
                                ship={this.props.ship}
                                celestBodies={this.state.celestBodies}
                            />
                        </Carousel.Item>
                    }

                    {this.props.ship.celest_body.type !== 'star' &&
                        <Carousel.Item>
                            <EscapeFromOrbit
                                escapeFromOrbit={this.props.escapeFromOrbit}
                                ship={this.props.ship}
                                celestBodies={this.state.celestBodies}
                            />
                        </Carousel.Item>
                    }

                    {this.props.ship.celest_body.type === 'planet' &&
                        this.state.celestBodies.map((e, i) => (
                            e.type === 'naturalSatelit' && e.childrens[0].id === this.props.ship.celest_body.id &&
                            <Carousel.Item>
                                <ChildTransfert
                                    childTransfert={this.props.childTransfert}
                                    celestBodies={this.state.celestBodies}
                                    ship={this.props.ship}
                                    body={e}
                                />
                            </Carousel.Item>))
                    }

                    {this.props.ship.celest_body.atmosphere > 1.5
                        && this.props.ship.celest_body.hasGround &&
                        <Carousel.Item>
                            <CommandModuleReEntry
                                commandModuleReEntry={this.props.commandModuleReEntry}
                                ship={this.props.ship}
                                celestBodies={this.state.celestBodies}
                                stage={this.props.stage}
                            />
                        </Carousel.Item>}


                    {this.props.ship.celest_body.type === 'star' &&
                        this.state.celestBodies.map((e, i) =>
                            e.type === 'planet' &&
                            e.id !== this.props.ship.celest_body.id &&
                            <Carousel.Item key={i}>
                                <PlanetTransfert
                                    ship={this.props.ship}
                                    planetTransfert={this.props.planetTransfert}
                                    celestBodies={this.state.celestBodies}
                                    body={e}
                                />
                            </Carousel.Item>
                        )}


                    {/* this.props.ship.celest_body.type === 'naturalSatelit' &&
                        <Carousel.Item>
                            <BackFromParent
                                ship={this.props.ship}
                                celestBodies={this.state.celestBodies}
                                backToParent={this.props.backToParent}
                            />
                        </Carousel.Item>*/}

                    {/* <Carousel.Item style={{ backgroundColor: 'red' }} >#
                        <FromMoonToMoon
                            fromMoonToMoon={this.props.fromMoonToMoon}
                            ship={this.props.ship}
                            celestBodies={this.state.celestBodies}
                        />
                    </Carousel.Item> */}
                </Carousel >
            );
    }
}

FromOrbit.contextType = ShipContext;
