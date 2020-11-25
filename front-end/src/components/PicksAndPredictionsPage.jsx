import React from 'react';
import DailyPicks from './PicksAndPredictions/DailyPicks';

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
        default:
            return <DailyPicks/>;
    }
  }
  
  render() {
    return (<div>
                {this.selectScreen()}
            </div>)
  }
}

export default PicksAndPredictionsPage;
