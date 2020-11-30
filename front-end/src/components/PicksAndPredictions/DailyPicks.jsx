import React, { Component } from 'react';
import SinglePick from './SinglePick';
import {getDaily} from '../../api/PicksCalls';

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
        console.log(newDailies);
        //change this so that it goes into picks array and changes yours only
        this.setState({dailies:[...newDailies]});
    }

    //TODO: get picks from backend and show whichever picks are sent back
    componentDidMount(){
        // this.setState({state: 'ready', });
        getDaily().then((res)=>{
            if(!res.success){
                throw new Error('Error with getting dailies');
            }
            this.setState({state:'ready',dailies: res.list})

        }).catch((error) => {
            console.log(error);
        });
    }

    formatList(){
        const dailies = this.state.dailies.map((data)=>
            <SinglePick key={data._id}
            option1={data.team1}
            option2={data.team2}
            //change later
            pickState={'pickable'}
            picked={data.picked}
            result={data.team1}
            ACSChange={5}
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