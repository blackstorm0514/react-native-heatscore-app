import React from 'react';
import GameSoccerEventsComponent from './GameSoccerEventsComponent';

const GameEventsComponent = ({ sport, home, away, events }) => {
    if (sport.name == 'Soccer') {
        return (
            <GameSoccerEventsComponent home={home}
                away={away}
                events={events}
                sport={sport} />
        );
    }
    return null;
}

export default GameEventsComponent;