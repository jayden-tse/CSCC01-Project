import React, { Component } from 'react';
import './SinglePick.css';
import images from './../../resources/teamLogos';

//states for daily pick
const PICKABLE='pickable', ONGOING='ongoing', COMPLETED='completed';

class SinglePick extends Component {
    //will have buttons to select pick
    renderPickable(){
        return (<span className='pickRender'>
                    Make Your Pick!
                    <br/>
                    <label className="PRLabel1" 
                    value={this.props.option1}>
                        <input
                        className="PickRadio"
                        type="radio"
                        value={this.props.option1}
                        onChange={this.props.handleSelect1}
                        checked={this.props.picked === this.props.option1}
                        />
                        {this.props.option1}
                    </label>
                    <label className="PRLabel2"
                    value={this.props.option2}>
                    <input
                        className="PickRadio"
                        type="radio"
                        value={this.props.option2}
                        onChange={this.props.handleSelect2}
                        checked={this.props.picked === this.props.option2}
                        />
                        {this.props.option2}
                    </label>
                </span>);
    }

    //will have your pick and an 'ongoing' message
    renderOngoing(){
        return (<span className='pickRender'>
                Currently Ongoing<br/>
                Your Pick: {this.props.picked}
                </span>);
    }

    //show result of the pick, and any acs gained/lost
    renderCompleted(){
        return (<span className='pickRender'>
            Result: {this.props.result}<br/>
            Your Pick: {this.props.picked}<br/>
            {this.props.ACSChange < 0? `${-this.props.ACSChange} ACS Lost`: `${this.props.ACSChange} ACS Gained`}
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

    getImage(team){
        if(team in images){
            return images[team];
        }else{
            return null;
        }
    }

    render() { 
        return(
            <div className='PickContainer'>
                <div className='PickImages'>
                    <img
                        className='PickImage1'
                        src={this.getImage(this.props.option1)}
                        alt={this.props.option1}
                        onClick={this.props.handleSelect1}
                    />
                    <span className='PickLabel1'>{this.props.option1}</span>
                    <span className='PickVS'>VS</span>
                    <img
                        className='PickImage2'
                        src={this.getImage(this.props.option2)}
                        alt={this.props.option2}
                        onClick={this.props.handleSelect2}
                    />
                    <span className='PickLabel2'>{this.props.option2}</span>
                </div>
                <span className='PickTime'>{this.props.matchDate} {this.props.matchTime}</span>
                <div className='PickSideOption'>
                    {this.selectRender()}
                </div>
            </div>
        );
    }
}
 
export default SinglePick;