import React from 'react';
import './Track.css';

class Track extends React.Component {
    constructor(props) {
        super(props);

        this.renderAction = this.renderAction.bind(this);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    renderAction() {
        let sign;
        let onClick;
        if (this.props.isRemoval) {
            sign = '-';
            onClick = this.removeTrack;
        } else {
            sign = '+';
            onClick = this.addTrack;
        }
         
        return<button 
                className="Track-action" 
                onClick={onClick}>{sign}</button>
            
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
       this.props.onRemove(this.props.track);
    }

    render() {
        const { track } = this.props;

        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{track.name}</h3>
                    <p>{track.artist} | {track.album}</p>
                </div>
                {this.renderAction()}      
            </div>   
        );
    }
}

export default Track;