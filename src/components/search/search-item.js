import React, { Component } from 'react';
import './search-item.css';
import Rating from '../rating/rating';
import { Link } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class SearchItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0
        }
    }

    notifySuccess = (massage) => {
        toast.success(massage, {
            position: toast.POSITION.TOP_CENTER
        });
    }
    notifyError = (massage) => {
        toast.error(massage, {
            position: toast.POSITION.TOP_CENTER,
        });
    }


    addToFavorites = () => {
        let token = this.props.data.user.token;
        if (this.props.data.user.loggedIn) {
            axios({
                url: "https://zero-games-server.herokuapp.com/games/add-favorite",
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'bearer ' + token,
                },
                data: {
                    gameId: this.props.game.id
                }
            }).then((result) => {
                if (result && result.data && result.data.success) {
                    this.notifySuccess(result.data.success)
                }
                else if (result && result.data && result.data.error) {
                    this.notifyError(result.data.error)
                }
            });
        }
        else {
            this.notifyError('You need to log in in order to add a game to wishlist!')
            console.log('You are not logged in');

        }
    }
    calculateRating=()=>{
        let rating = 0;;
        if (this.props.game.total_rating) {
            rating = parseInt((this.props.game.total_rating / 2) / 10);
        }
        this.setState({rating:rating})
    }

    componentDidMount(){
        this.calculateRating();
    }

    render() {
        return (
            <div className="search-item">
                <div className="item-header">
                    <Rating rating={this.state.rating}/>
                </div>
                <div className="item-content">
                    <div className="item-img">
                        <img src={this.props.cover} alt="cover" />
                    </div>
                    <div className="item-info">
                        <h4>{this.props.game.name}</h4>
                        <Link to={`/game/${this.props.game.id}`}>Read More...</Link>
                    </div>
                    <div className="btn-container">
                        <button onClick={this.addToFavorites}>Add to Wishlist</button>
                    </div>

                </div>
                <ToastContainer autoClose={5000} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state
    }
}

export default connect(mapStateToProps)(SearchItem);