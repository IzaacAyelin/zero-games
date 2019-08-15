import React, { Component } from 'react';
import './favorites.css';
import axios from 'axios';
import { FavoriteItem } from './favorite-item';
import { connect } from 'react-redux';
import noimage from '../../images/no-image.jpg';
import { Loader } from '../loader/loader';

class Favorites extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.loading = false;
        this.state = {
            favorites: []
        }
    }

    componentWillMount() {
        this._isMounted = true;
        this.getFavorites()
    }

    removeFavorite=(gameId)=>{
        
        axios({
            url: "https://zero-games-server.herokuapp.com/games/remove-favorite",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + this.props.data.user.token,
            },
            data:{
                gameId:gameId
            }
        }).then((result)=>{
            console.log(result.data);
            
            if (result && result.data && result.data.success) {
                let index = this.state.favorites.findIndex(x => x.id === gameId)
                let newFav = this.state.favorites;
                newFav.splice(index, 1);
                this.setState({favorites:newFav});
            }
        })
    }
    
    getFavorites = () => {
        this.loading = true;
        axios({
            url: "https://zero-games-server.herokuapp.com/games/get-favorites",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + this.props.data.user.token,
            }
        }).then((result) => {
            this.loading = false;
            if (this._isMounted) {
                if (result && result.data && result.data.favorites) {
                    this.setState({ favorites: result.data.favorites })
                }
                else {
                    this.setState({ favorites: [] })
                }
            }
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {        
        if (this.loading) {
            return <Loader />
        }
        return (
            <div>
                <div className="favorites-header">
                    <div className="overlay">
                        <h1>Home > Favorites</h1>
                    </div>
                </div>
                <div className="favorites-container">
                    {this.state.favorites && this.state.favorites.map((game) => {
                        let cover;
                        if (game.cover && game.cover.url) {
                            cover = `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`;
                        }
                        else {
                            cover = noimage;
                        }
                        return <FavoriteItem key={game.id} remove={this.removeFavorite} game={game} cover={cover} />
                    })}
                    {
                        (!this.state.favorites || this.state.favorites.length === 0) &&
                        <div className="alert alert-warning">You have no favorites...</div>
                    }

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state
    }
}

export default connect(mapStateToProps)(Favorites);