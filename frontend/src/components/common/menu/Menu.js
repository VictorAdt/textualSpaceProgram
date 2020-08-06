import React from 'react';

export default class Menu extends React.Component {
    constructor(props){
      super(props);
      this.state={
        open: this.props.open ? this.props.open:false,
      }
    }
      
    componentWillReceiveProps(nextProps){
      if(nextProps.open !== this.state.open){
        this.setState({open:nextProps.open});
      }
    }
    

    render(){
      const styles={
        container: {
          position: 'absolute',
          top: 0,
          left: 0,
          height: this.state.open? '100%': 0,
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fff',
          color: '#fafafa',
          transition: 'height 0.3s ease',
          zIndex: '1',
          mixBlendMode: 'exclusion',
          zIndex: 200,
        },
        menuList: {
          paddingTop: '150px',
        }
      }
      return(
        <div style={styles.container}>
          {
            this.state.open?
              <div style={styles.menuList}>
                {this.props.children}
              </div>:null
          }
        </div>
      )
    }
  }
  