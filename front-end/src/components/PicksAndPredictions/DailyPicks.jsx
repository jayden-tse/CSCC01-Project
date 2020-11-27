import React, { Component } from 'react';
import SinglePick from './SinglePick';
//tempdata not reflective of database since not created yet
import tempData from './tempData.json';

//will have to shape implementation to backend when thats ready
class DailyPicks extends Component {
    constructor(props){
        super(props);
        this.state={state:'loading', dailies:[]}
    }

    pickOption(id, option){
        console.log(`${id} ${option}`);
        //change picked option for user here
    }

    //TODO: get picks from backend and show whichever picks are sent back
    componentDidMount(){
        this.setState({state: 'ready', dailies: tempData});
    }

    formatList(){
        const dailies = this.state.dailies.map((data)=>
            <SinglePick key={data._id}
            pickState={data.condition}
            option1={data.option1}
            option2={data.option2}
            picked={data.picked}
            result={data.result}
            ACSChange={data.ACSChange}
            handleSelectOption1={()=>this.pickOption(data._id, data.option1)}
            handleSelectOption2={()=>this.pickOption(data._id, data.option2)}
            />
        );
        return dailies;
    }

    render() { 
        return <div>
            <h1 className="DailyPicksHeader">Daily Picks</h1>
           {this.formatList()}
        </div>;
    }
}
 
export default DailyPicks;