import React from 'react';
import { Link } from 'react-router-dom';

export default class MenuItem extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        hover:false,
      }
    }

    
    handleHover(){
      this.setState({hover:!this.state.hover});
    }
    
    render(){
      const styles={
        container: {
          opacity: 0,
          animation: '1s appear forwards',
          animationDelay:this.props.delay,
        },
        menuItem:{
          fontSize: '3.2rem',
          padding: '1rem 0',
          margin: '0 5%',
          cursor: 'pointer',
          color: this.state.hover? 'gray':'#111',
          transition: 'color 0.2s ease-in-out',
          animation: '0.5s slideIn forwards',
          animationDelay:this.props.delay,
        },
        line: {
          width: '90%',
          height: '1px',
          background: 'gray',
          margin: '0 auto',
          animation: '0.5s shrink forwards',
          animationDelay:this.props.delay,
          
        }
      }
      
      return(
        <div style={styles.container}>
            <Link 
              style={styles.menuItem} 
              onMouseEnter={()=>{this.handleHover();}} 
              onMouseLeave={()=>{this.handleHover();}}
              onClick={this.props.onClick}
              to={`/${this.props.pageSlug}` }
            >
              {this.props.name}  
            </Link>
        <div style={styles.line}/>

      </div>  
      )
    }
  }