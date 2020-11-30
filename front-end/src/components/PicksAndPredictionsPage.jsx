import React from 'react';
import DailyPicks from './PicksAndPredictions/DailyPicks';
import PreseasonPicks from './PicksAndPredictions/PreseasonPicks';

const DAILY='Daily Picks',
    PRESEASON='Preseason Picks';

class PicksAndPredictionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        screen:DAILY
    }
    this.handleScreenChange=this.handleScreenChange.bind(this);
  }

  handleScreenChange(event){
    this.setState({screen:event.target.value});
  }

  selectScreen(){
    switch(this.state.screen){
        case DAILY:
            return <DailyPicks currentUser={this.props.currentUser}/>;
        case PRESEASON:
            return <PreseasonPicks/>;
        default:
            return null;
    }
  }
  
  render() {
    return (<div>
                <ScreenChanger value={this.state.screen} handleChange={this.handleScreenChange}/>
                <h1 className="PicksHeader">{this.state.screen}</h1>
                {this.selectScreen()}
            </div>)
  }
}

function ScreenChanger(props){
    return (
        <select value={props.screen} onChange={props.handleChange}>
            <option value={DAILY}>{DAILY}</option>
            <option value={PRESEASON}>{PRESEASON}</option>
        </select>
    );
}

export default PicksAndPredictionsPage;
