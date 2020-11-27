import React, { Component } from 'react';
//temp data not reflective of backend until ready
import PreseasonTemp from './PreseasonTemp.json'

//will render a list of picks like mvp, nba team of the year etc for user to pick
class PreseasonPicks extends Component {
    constructor(props){
        super(props);
        this.state={};
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentDidMount(){
        //get data from backend
    }

    handleSubmit(event){
        event.preventDefault();//stops redirect
        console.log('Submit Preseason Picks');
        const data = new FormData(event.target);
        console.log(...data);
    }

    render() { 
        return (<div>
                    <h1 className="PreseasonPicksHeader">Preseason Picks</h1>
                    <PreseasonAll data={PreseasonTemp} handleSubmit={this.handleSubmit}/>
                </div>
            );
    }
}

//should work with text for now, dropdown if we have more data
function PreseasonSingle(props){
    return(
    <React.Fragment>
        <label htmlFor={props.prompt}>{props.prompt}: </label>
        <input id={props.prompt} type="text" name={props.prompt} defaultValue={props.answer}/>
    </React.Fragment>
    );
}
 
function PreseasonAll(props){
    const pickables = props.data.map((pick)=>
    <React.Fragment key={pick.prompt}>
        <PreseasonSingle prompt={pick.prompt} answer={pick.answer}/>
        <br/>
    </React.Fragment>
    );

    return(
        <form onSubmit={props.handleSubmit}>
            {pickables}
            <button className='PreseasonSubmit'>Submit</button>
        </form>
    );
}
export default PreseasonPicks;