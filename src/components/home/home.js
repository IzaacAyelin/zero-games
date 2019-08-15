import React, { Component } from 'react';
import './home.css';
import logo from '../../images/logo3.png';
import GameCard from '../game-card/gameCard';
import Carousel from '../carousel/carousel';
import { Link } from "react-router-dom";
import { query } from '../../api/apiActions';
import noImage from '../../images/no-image.jpg';
import {MiniLoader} from '../search/mini-loader'


class Home extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.loading = true;
        this.state = {
            popularGames: [],
            recentGames: []
        }
    }

    componentDidMount() {
        this._isMounted = true;
        let promis1 = query({
            query: `where platforms = [6,48,49]`,
            offset: 0,
            sort: 'sort popularity desc',
            limit:'8'
        });
        let promis2 = query({
            query: `where platforms = [6,48,49]`,
            offset: 0,
            sort: 'sort first_release_dates desc',
            limit:'8'
        });
        
        Promise.all([promis1,promis2])
        .then((result)=>{
           
            this.loading=false;
            if (this._isMounted) {
                this.setState({
                    popularGames:result[0].data,
                    recentGames:result[1].data
                }) 
            }
            
            
        })
    
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            // <h1>Home</h1>
            <div>
                <Carousel />
                <div className="home-header">
                    <div className="layover">
                        <div className="home-logo text-center">
                            <img src={logo} alt="logo" />
                            {/* <h4>Scroll Down <i className="fas fa-arrow-down"></i></h4> */}
                        </div>
                    </div>
                </div>
                <div className="recent-games">
                    <h2 className="">Popular Games</h2>
                    <div className="row">
                    {this.loading ? <MiniLoader/> :
                    (this.state.popularGames.map((game) => {
                        let cover;
                        if (game.cover && game.cover.url) {
                            cover = `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`;
                        }
                        else {
                            cover = noImage;
                        }
                        return (<div key={game.id} className="col-md-3">
                            <Link to={`/game/${game.id}`}>
                                <GameCard game={game} img={cover} />
                            </Link>
                        </div>)
                    }))
                    }
                        
                    </div>
                </div>
                <div className="recent-games">
                    <div>
                        <h2 className="">Recent Games</h2>
                        <div className="row">
                        {this.loading ? <MiniLoader/> :
                    (this.state.recentGames.map((game) => {
                        let cover;
                        if (game.cover && game.cover.url) {
                            cover = `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`;
                        }
                        else {
                            cover = noImage;
                        }
                        return (<div key={game.id} className="col-md-3">
                            <Link to={`/game/${game.id}`}>
                                <GameCard game={game} img={cover} />
                            </Link>
                        </div>)
                    }))
                    }
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

export default Home;