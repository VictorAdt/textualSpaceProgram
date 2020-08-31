import React, { Component } from 'react';
import axios from 'axios';
import { ShipContext } from './../../../../contexts/ShipProvider'
import FromOrbitToSurface from './FromOrbitToSurface'
import EscapeFromOrbit from './EscapeFromOrbit';
import ChildTransfert from './ChildTransfer';
import PlanetTransfert from './PlanetTransfert';
import Carousel from 'react-bootstrap/Carousel'


export default class FromOrbit extends Component {
    state = {
        celestBodies: null,
        index: 0
    }

    async componentDidMount() {
        try {
            const celestBodyRes = await axios({
                method: 'GET',
                url: `/celest-bodies/?_sort=apoapsis:ASC`
            })
            const fetchedCelestBody = celestBodyRes.data
            this.setState({ celestBodies: fetchedCelestBody })
        } catch (e) {
            console.log(e);
        }
    }

    handleSelect = (selectedIndex, e) => {
        this.setState({ index: selectedIndex });
    };

    render() {
        if (this.state.celestBodies === null || this.props.isLoading) {
            return null
        } else
            return (
                <Carousel
                    wrap={true}
                    indicators={false}
                    interval={null}
                    keyboard={true}
                    activeIndex={this.state.index}
                    onSelect={this.handleSelect}>
                    {/* */}
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
                                    isLoading={this.props.isLoading}
                                />
                            </Carousel.Item>
                        )}  
                    {/* */}
                    {this.props.ship.celest_body.type === 'planet' &&
                        this.state.celestBodies.map((e, i) => (
                            e.type === 'naturalSatelit' && e.childrens[0].id === this.props.ship.celest_body.id &&
                            <Carousel.Item key={i}>
                                <ChildTransfert
                                    childTransfert={this.props.childTransfert}
                                    celestBodies={this.state.celestBodies}
                                    ship={this.props.ship}
                                    body={e}
                                />
                            </Carousel.Item>))
                    }
                    {/* */}
                    {this.props.ship.celest_body.hasGround &&
                        <Carousel.Item>
                            <FromOrbitToSurface
                                fromOrbitToSurface={this.props.fromOrbitToSurface}
                                ship={this.props.ship}
                                celestBodies={this.state.celestBodies}
                            />
                        </Carousel.Item>
                    }
                    {/* */}
                    {this.props.ship.celest_body.type !== 'star' &&
                        <Carousel.Item>
                            <EscapeFromOrbit
                                escapeFromOrbit={this.props.escapeFromOrbit}
                                ship={this.props.ship}
                                celestBodies={this.state.celestBodies}
                            />
                        </Carousel.Item>
                    }

                </Carousel >
            );
    }
}

FromOrbit.contextType = ShipContext;
