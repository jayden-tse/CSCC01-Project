import React, { Component } from 'react';

//states for daily pick
const PICKABLE='pickable', ONGOING='ongoing', COMPLETED='completed';

class SinglePick extends Component {
    constructor(props){
        super(props);
        this.state={
            state:'loading'
        };
    }

    //will have buttons to select pick
    renderPickable(){
        return null;
    }

    //will have your pick and an 'ongoing' message
    renderOngoing(){
        return null;
    }

    //show result of the pick, and any acs gained/lost
    renderCompleted(){
        return null;
    }

    //will select the correct renderable
    selectRender(){
        switch(this.state.state){
            case PICKABLE:
                return this.renderPickable();
            case ONGOING:
                return this.renderOngoing();
            case COMPLETED:
                return this.renderCompleted();
            default:
                return null;
        }
    }

    render() { 
        return(
            <div>
                <div>
                    <img/>
                    VS
                    <img/>
                </div>
            {this.selectRender()}
            </div>
        );
    }
}
 
export default SinglePick;