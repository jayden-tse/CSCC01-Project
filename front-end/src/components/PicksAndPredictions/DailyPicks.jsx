import React, { Component } from 'react';
import SinglePick from './SinglePick';
import {getDaily, updateUserDaily} from '../../api/PicksCalls';

//states for daily pick
const PICKABLE='pickable', ONGOING='ongoing', COMPLETED='completed';

class DailyPicks extends Component {
    constructor(props){
        super(props);
        this.state={state:'loading', dailies:[]}
    }

    updateStateDaily(){
        getDaily().then((res)=>{
            if(!res.success){
                throw new Error('Error with getting dailies');
            }
            this.setState({state:'ready',dailies: res.list})

        }).catch((error) => {
            console.log(error);
        });
    }

    pickOption(event, id){
        console.log(`${id} ${event.target.value}`);
        //change picked option for user here
        updateUserDaily(id, this.props.currentUser, event.target.value).then((res)=>{
            if(!res.success){
                throw new Error();
            }
            //easist way rn, not efficient
            this.updateStateDaily();
        }).catch((error) => {
            console.log(error);
        });

    }

    //TODO: get picks from backend and show whichever picks are sent back
    componentDidMount(){
        this.updateStateDaily();
    }
    
    formatDate(date,time){
        const mdy = date.split("/"); //month day year formate
        //time in hh:mm format, assume startTime<endTime
        return new Date(`${mdy[2]}-${mdy[0]}-${mdy[1]}T${time}:00`);
    }

    pickStateForMatch(date,startTime, endTime){
        const currentDate = new Date();
        //set date
        var matchStart = this.formatDate(date,startTime);
        var matchEnd = this.formatDate(date,endTime);

        if(currentDate<=matchStart){
            return PICKABLE;
        } else if(currentDate>=matchEnd){
            return COMPLETED;
        } else {
            return ONGOING;
        }
    }

    getUserPickSingle(picks){
        if(picks != undefined && picks[this.props.currentUser] != undefined){
            return picks[this.props.currentUser]
        }
        return "";
    }

    getUserACSChange(picks, result){
        const pick = this.getUserPickSingle(picks);
        if(pick === ""){
            return 0;
        }
        return pick === result? 5:-5;
    }


    formatList(){
        const dailies = this.state.dailies.map((data)=>
            <SinglePick key={data._id}
            option1={data.team1}
            option2={data.team2}
            pickState={this.pickStateForMatch(data.date, data.start, data.end)}
            picked={this.getUserPickSingle(data.picks)}
            matchTime={`${this.formatDate(data.date,data.start).toDateString()} ${data.start}-${data.end} EST`}
            //change later
            result={data.team1}
            ACSChange={this.getUserACSChange(data.picks, data.team1)}
            handleSelect={(event)=>this.pickOption(event, data._id)}
            />
        );
        return dailies;
    }

    render() { 
        return <div>
           {this.formatList()}
        </div>;
    }
}
 
export default DailyPicks;