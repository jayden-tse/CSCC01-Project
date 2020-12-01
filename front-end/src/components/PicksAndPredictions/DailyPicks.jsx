import React, { Component } from 'react';
import SinglePick from './SinglePick';
import {getDaily, updateUserDaily} from '../../api/PicksCalls';

//states for daily pick
const PICKABLE='pickable', ONGOING='ongoing', COMPLETED='completed', NA='N/A';

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
            this.setState({state:'ready',dailies: res.list.sort(compareDates)})

        }).catch((error) => {
            console.log(error);
        });
    }

    pickOption(id, option){
        console.log(`${id} ${option}`);
        //check if match over first
        const dailies = this.state.dailies.filter(element => {return element._id===id} );
        if(dailies===[] || this.pickStateForMatch(dailies[0].date, dailies[0].start, dailies[0].end) != PICKABLE){
            console.log('MATCH CANNOT BE UPDATED!');
            return;
        }

        //change picked option for user here
        updateUserDaily(id, this.props.currentUser, option).then((res)=>{
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

    pickStateForMatch(date,startTime, endTime){
        const currentDate = new Date();
        //set date
        var matchStart = formatDate(date,startTime);
        var matchEnd = formatDate(date,endTime);

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
        return NA;
    }

    getUserACSChange(picks, result){
        const pick = this.getUserPickSingle(picks);
        if(pick === NA){
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
            matchDate={`${formatDate(data.date,data.start).toDateString()}`}
            matchTime={`${data.start}-${data.end} EST`}
            //change later
            result={data.team1}
            ACSChange={this.getUserACSChange(data.picks, data.team1)}
            handleSelect1={()=>this.pickOption(data._id,data.team1)}
            handleSelect2={()=>this.pickOption(data._id,data.team2)}
            />
        );
        return dailies;
    }

    render() { 
        return <div className="DailyList">
           {this.formatList()}
        </div>;
    }
}

function formatDate(date,time){
    const mdy = date.split("/"); //month day year formate
    //time in hh:mm format, assume startTime<endTime
    return new Date(`${mdy[2]}-${mdy[0]}-${mdy[1]}T${time}:00`);
}

function compareDates(a, b){
    let aform = formatDate(a.date,a.start);
    let bform = formatDate(b.date,b.start);
    if ( aform > bform ){
        return -1;
      }
    if ( aform > bform ){
        return 1;
    }
    return 0;
}
 
export default DailyPicks;