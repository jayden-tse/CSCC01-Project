import React, { Component } from 'react';
import SinglePick from './SinglePick';

const PICKABLE='pickable', ONGOING='ongoing', COMPLETED='completed';
class DailyPicks extends Component {
    constructor(props){
        super(props);
        this.state={state:'loading'}
    }

    //TODO: get picks from backend and show whichever picks are sent back

    //TODO: render list of daily picks as single picks
    render() { 
        return <div>
            <SinglePick pickState={COMPLETED} option1='tom' option2='jerry' picked='tom' result='tom' ACSChange={5}/>
        </div>;
    }
}
 
export default DailyPicks;