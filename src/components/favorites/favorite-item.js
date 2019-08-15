import React from 'react';
import './favorites.css';

export const FavoriteItem = (props) => {

    const remove =()=>{
        props.remove(props.game.id)
    }

    return (
        <div className="favorite-item">
            <div className="left-col">
                <div className="item-image">
                    <img src={props.cover} alt="game" />
                </div>
                <div className="item-info">
                    <h4>{props.game.name}</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </div>
            </div>
            <div className="right-col">
                <div className="item-buttons">
                    <i onClick={remove} className="fas fa-trash-alt"></i>
                </div>
            </div>
        </div>
    )
}