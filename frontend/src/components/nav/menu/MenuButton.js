import React from 'react';

export default class MenuButton extends React.Component {
    constructor(props){
      super(props);
      this.state={
        open: this.props.open ? this.props.open:false,
      }
    }
  
    componentDidUpdate(nextProps){
      if(nextProps.open !== this.state.open){
        this.setState({open:nextProps.open});
      }
    }
    
    handleClick(){
    this.setState({open: !this.state.open});
    }
    
    render(){
      const styles = {
        line: {
          height: '4px',
          width: '40px',
          background: this.props.color,
          transition: 'all 0.2s ease',
        },
        lineTop: {
          transform: this.state.open ? 'rotate(45deg)':'none',
          transformOrigin: 'top left',
          marginBottom: '10px',
        },
        lineMiddle: {
          opacity: this.state.open ? 0: 1,
          transform: this.state.open ? 'translateX(-32px)':'none',
        },
        lineBottom: {
          transform: this.state.open ? 'translateX(-2px) rotate(-45deg)':'none',
          transformOrigin: 'top left',
          marginTop: '10px',
        },       
      }
      return(
        <div style={{
          height: '64px',
          width: '64px',
          display:'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }} 
          onClick={this.props.onClick ? this.props.onClick: 
            ()=> {this.handleClick();}}>
          <div style={{...styles.line,...styles.lineTop}}/>
          <div style={{...styles.line,...styles.lineMiddle}}/>
          <div style={{...styles.line,...styles.lineBottom}}/>
        </div>
      )
    }
  }