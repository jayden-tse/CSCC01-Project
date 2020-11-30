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

    pickOption(event, id){
        console.log(`${id} ${event.target.value}`);
        //change picked option for user here
        let newDailies = this.state.dailies;
        const pos = newDailies.map(function(e) { return e._id; }).indexOf(id);
        newDailies[pos].picked=event.target.value;
        this.setState({dailies:[...newDailies]});
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