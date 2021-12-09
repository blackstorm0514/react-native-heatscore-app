import React, { Component } from 'react';
import GameSoccerEventsComponent from './GameSoccerEventsComponent';

export default class GameEventsComponent extends Component {
    render() {
        const { sport } = this.props;
        if (sport.name == 'Soccer') {
            return (
                <GameSoccerEventsComponent {...this.props} />
            );
        }
        return null;
    }
}
