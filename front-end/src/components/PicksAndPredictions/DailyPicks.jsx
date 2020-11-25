import React, { Component } from 'react';
import SinglePick from './SinglePick';
//tempdata not reflective of database since not created yet
import tempData from './tempData.json';

const PICKABLE='pickable', ONGOING='ongoing', COMPLETED='completed';
class DailyPicks extends Component {
    constructor(props){
        super(props);
        this.state={state:'loading'}
    }

    //TODO: get picks from backend and show whichever picks are sent back

    //TODO: render list of daily picks as single picks
    render() { 
        const i = 0;
        return <div>
            <SinglePick pickState={tempData[i].condition}
            option1={tempData[i].option1} option2={tempData[i].option2}
            picked={tempData[i].picked} result={tempData[i].result}
            ACSChange={tempData[i].ACSChange}/>
        </div>;
    }
}
 
export default DailyPicks;