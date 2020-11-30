import React, { Component } from 'react';

//states for daily pick
const PICKABLE='pickable', ONGOING='ongoing', COMPLETED='completed';

class SinglePick extends Component {
    //will have buttons to select pick
    renderPickable(){
        return (<div>
                    <input
                        className="PickRadio"
                        type="radio"
                        value={this.props.option1}
                        onChange={this.props.handleSelect}
                        checked={this.props.picked === this.props.option1}
                        />
                    {this.props.option1}
                    <input
                        className="PickRadio"
                        type="radio"
                        value={this.props.option2}
                        onChange={this.props.handleSelect}
                        checked={this.props.picked === this.props.option2}
                        />
                    {this.props.option2}
                </div>);
    }

    //will have your pick and an 'ongoing' message
    renderOngoing(){
        return (<span>
                Currently Ongoing<br/>
                Your Pick: {this.props.picked}
                </span>);
    }

    //show result of the pick, and any acs gained/lost
    renderCompleted(){
        return (<span>
            Result: {this.props.result}<br/>
            Your Pick: {this.props.picked}<br/>
            {this.props.ACSChange} ACS Gained
            </span>);
    }

    //will select the correct renderable
    selectRender(){
        switch(this.props.pickState){
            case PICKABLE:
                return this.renderPickable();
            case ONGOING:
                return this.renderOngoing();
            case COMPLETED:
                return this.renderCompleted();
            default:
                return null;
        }
    }

    render() { 
        return(
            <div>
                <div>
                    <img alt={this.props.option1}/>
                    VS
                    <img alt={this.props.option2}/>
                </div>
                {this.props.matchTime}
                <br/>
            {this.selectRender()}
            </div>
        );
    }
}
 
export default SinglePick;