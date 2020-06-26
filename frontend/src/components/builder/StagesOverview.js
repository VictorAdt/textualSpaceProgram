import React, { Component } from 'react';
import PartList from './../lists/PartList'

export default class StagesOverview extends Component {
    render() {
        if(this.props.stage === undefined){
            return 'loading'    
        } else
        return (
            <div className="stagesOverview">
                <h3> StagesOverview </h3>
                <button onClick={() => this.props.addStage()}> add stage </button>

                {this.props.stage.map((e, i) => (
                    <button key={i} onClick={() => this.props.setCurrentStage(i)}> 
                        <h4> Stage {i + 1}  </h4> 
                        {this.props.deltaVByStage &&
                            <h6> delta V: {this.props.deltaVByStage[i] }</h6>
                        }
                        {this.props.stage[i].engine.map((e,i) => (
                            <p className="engine__name" key={i}>
                                {e.name}
                            </p>
                        ))}
                        {this.props.stage[i].tank.map((e,i) => (
                            <p className="tank__name" key={i}>
                                {e.name}
                            </p>
                        ))}
                        {this.props.stage[i].commandModule.map((e,i) => (
                            <p key={i} className="commandModule__name">
                                {e.name}
                            </p>
                        ))}
                    </button>
                ))}
                <PartList addPart={this.props.addPart}/>
            </div>
        );
    }
}