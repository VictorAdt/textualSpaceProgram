import React from 'react';
import Menu from './Menu';
import MenuButton from './MenuButton';
import MenuItem from './MenuItem';
import { ShipContext } from './../../../contexts/ShipProvider'

export default class BurgerMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false,
            color: 'white',
            pages: null
        }
    }

    async componentDidMount() {
        this.setState({ pages: [{
            name: 'Tracking station',
            slug: ''
        },
        {
            name: 'Rocket Assembly building',
            slug: 'VAB'
        }]})
    }

    handleMenuClick() {
        this.setState({ menuOpen: !this.state.menuOpen }, () => {
            if (this.state.menuOpen === true) {
                this.setState({ color: 'black' })
                this.context.setMenuOpen(true)
            } else {
                this.setState({ color: 'white' })
                this.context.setMenuOpen(false)
            }
        })
    }

    handleLinkClick() {
        this.setState({ menuOpen: false }, () => {
            if (this.state.menuOpen === true) {
                this.setState({ color: 'black' })
                this.context.setMenuOpen(true)
            } else {
                this.setState({ color: 'white' })
                this.context.setMenuOpen(false)
            }
        })
    }

    render() {
        const pages = this.state.pages

        const styles =
        {
            container: {
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: '1000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
                width: '100%',
                color: 'white',
                fontFamily: 'Lobster',
                padding: '40px',
            },
            body: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100vw',
                height: '100vh',
                filter: this.state.menuOpen ? 'blur(2px)' : null,
                transition: 'filter 0.5s ease',
                backgroundColor: this.state.menuOpen ? '#fff' : '#000'
            },
        }

        if (pages === null) {
            return 'loading'
        }

        const menuItems = pages.map((e, i) => {
            return (
                <MenuItem
                    name={e.name}
                    pageSlug={e.slug}
                    key={i}
                    delay={`${i * 0.1}s`}
                    onClick={() => { this.handleLinkClick(); }}>{e.name}
                </MenuItem>
            )
        });


        return (
            <nav >
                <div style={styles.container}>
                    <MenuButton open={this.state.menuOpen} onClick={() => this.handleMenuClick()} color={this.state.color} />
                </div>
                <Menu open={this.state.menuOpen}>
                    {menuItems}
                </Menu>
            </nav>
        )
    }
}

BurgerMenu.contextType = ShipContext;
