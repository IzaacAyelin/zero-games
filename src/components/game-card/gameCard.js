import React, { Component } from 'react';
import './gameCard.css';
import Rating from '../rating/rating';

class GameCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
            game: this.props.game
        }
    }

    calculateRating = () => {
        let rating = 0;;
        if (this.state.game && this.state.game.total_rating) {
            rating = parseInt((this.state.game.total_rating / 2) / 10);
        }
        this.setState({ rating: rating })
    }
    componentDidMount() {
        console.log(this.state.game);

        this.calculateRating();
    }


    render() {
        return (

            <div style={{ backgroundImage: this.props.img }} className="card">
                <div className="card-img">
                    <img src={this.props.img} alt="cover" />
                </div>
                <div className="card-info">
                    <div className="align">
                        
                        <h4>{this.state.game && this.state.game.name}</h4>
                        <div className="genres">
                        <Rating rating={this.state.rating} />
                            {/* {this.props.genres && this.props.genres.map((genre,index) => {
                                return <span key={index} className="badge badge-warning">{genre.name}</span>
                            })} */}
                        </div>

                        <div className="desc">
                            {/* <p>
                                Lorem ipsum dolor...
                        </p> */}
                        </div>
                        <Rating />
                    </div>
                </div>
            </div>

        );
    }
}

export default GameCard;