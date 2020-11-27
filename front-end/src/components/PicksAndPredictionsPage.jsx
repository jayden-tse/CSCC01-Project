import React from 'react';
import DailyPicks from './PicksAndPredictions/DailyPicks';
import PreseasonPicks from './PicksAndPredictions/PreseasonPicks';

class PicksAndPredictionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        screen:'default'
    }
  }

  selectScreen(){
    switch(this.state.screen){
        case 'daily':
            return <DailyPicks/>;
        case 'preseason':
            return <PreseasonPicks/>;
        default:
            return <PreseasonPicks/>;
    }
  }
  
  render() {
    return (<div>
                {this.selectScreen()}
            </div>)
  }
}

export default PicksAndPredictionsPage;
