import React, { Component } from 'react';
import './gameCard.css';
import Rating from '../rating/rating';

class GameCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return (

            <div style={{ backgroundImage: this.props.img }} className="card">
                {/* <div className="card-head">
                    <h4>God Of War</h4>
                </div> */}
                <div className="card-img">
                    <img src={this.props.img} alt="cover" />
                </div>
                <div className="card-info">
                    <div className="align">
                        <h4>God Of War</h4>
                        <div className="genres">
                            {/* <span className="text-black">Geners:</span>
                            <br /> */}
                            <span className="badge badge-warning">Genre</span>
                            <span className="badge badge-warning">Genre</span>
                        </div>

                        <div className="desc">
                            <p>
                                Lorem ipsum dolor...
                        </p>
                        </div>
                        <Rating />
                        
                    </div>
                </div>
            </div>

        );
    }
}

export default GameCard;