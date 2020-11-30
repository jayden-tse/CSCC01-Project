import React, { Component } from 'react';
import SinglePick from './SinglePick';
import {getDaily, updateUserDaily} from '../../api/PicksCalls';

//will have to shape implementation to backend when thats ready
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