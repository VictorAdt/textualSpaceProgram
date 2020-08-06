import React from 'react';
import Container from 'react-bootstrap/Row'

const SolarSystem = props => {
    const { celestBodies } = props
    if (celestBodies)
        return (
            <Container fluid xs={12} className="solar__system">
                {celestBodies.map((e, i) => {
                    if (e.type === 'star') {
                        return (
                        <span className="star" style={{
                            backgroundColor: '#' + e.primaryColor,
                            boxShadow:
                                `inset 10px 0 40px #${e.secondaryColor}, inset -10px 0 20px  #${e.tertiaryColor}, inset -40px 10px 110px #${e.quaternaryColor}`,
                            width: e.radius / 10000 + 'px',
                            height: e.radius / 10000 + 'px',
                        }}>
                            {celestBodies.map((planet, i) => {
                                if (planet.type === 'planet') {
                                    return (
                                        <span className="planet" style={{
                                            backgroundColor: '#' + planet.primaryColor,
                                            boxShadow:
                                                `inset 10px 0 40px #${planet.secondaryColor}, inset -10px 0 20px  #${planet.tertiaryColor}, inset -40px 10px 110px #${planet.quaternaryColor}`,
                                            width: planet.hasGround ? planet.radius / 500 + 'px': planet.radius / 1800 + 'px',
                                            height: planet.hasGround ? planet.radius / 500 + 'px': planet.radius / 1800 + 'px',
                                            left: Math.cbrt(planet.apoapsis) / 25 + 'vw',
                                            transform: `rotate(360deg) translateX(${planet.apoapsis / 2000000})`
                                        }}>
                                            {celestBodies.map( (e,i) => {
                                                if(e.type === 'naturalSatelit' && e.childrens[0].id === planet.id ){
                                                    return(
                                                        <span className="naturalSatelit" style={{
                                                            backgroundColor: '#' + e.primaryColor,
                                                            boxShadow:
                                                                `inset 10px 0 40px #${e.secondaryColor}, inset -10px 0 20px  #${e.tertiaryColor}, inset -40px 10px 110px #${e.quaternaryColor}`,
                                                            width: e.hasGround ? e.radius / 500 + 'px': e.radius / 1800 + 'px',
                                                            height: e.hasGround ? e.radius / 500 + 'px': e.radius / 1800 + 'px',
                                                            bottom: Math.cbrt(e.apoapsis) / 80 * i + 'vh',
                                                            transform: `rotate(360deg) translateX(${e.apoapsis / 2000000})`
                                                        }}>
                                                        </span>
                                                    )
                                                }
                                            })}
                                        </span>
                                    )
                                }
                            })

                            }


                        </span>)
                    }
                })}
            </Container>
        )
    else return null
};

export default SolarSystem;