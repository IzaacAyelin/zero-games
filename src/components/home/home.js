import React, { Component } from 'react';
import './home.css';
import logo from '../../images/logo3.png';
import GameCard from '../game-card/gameCard';
import Carousel from '../carousel/carousel';
import { Link } from "react-router-dom";
import { query } from '../../api/apiActions';
import noImage from '../../images/no-image.jpg';


class Home extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            games: []
        }
    }

    componentDidMount() {
        this._isMounted = true;
        query({
            query: `limit 4;sort popularity desc; `,
            offset: 0,
            sort: ''
        })
            .then((result) => {
                console.log(result.data);

                this.setState({
                    games: result.data
                })
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
                        {this.state.games.map((game) => {
                            console.log(game);
                            
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
                        })}
                        {/* <div className="col-md-3">
                            <Link to="/game/12345">
                                <GameCard img="https://www.oxpal.com/wp-content/uploads/2014/08/gears_of_war_judgement_-_cover.jpg" />
                            </Link>
                        </div>
                        <div className="col-md-3">
                            <Link to="/game">
                                <GameCard img="http://images2.fanpop.com/image/photos/13900000/Video-Game-Cover-video-games-13975906-640-907.jpg" />
                            </Link>
                        </div>
                        <div className="col-md-3">
                            <Link to="/game">
                                <GameCard img='https://m.media-amazon.com/images/M/MV5BNWYxMmI4MTQtMTQyNi00MGQ5LTkwMGUtOGM1YTgwZTViOTgwL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg' />
                            </Link>
                        </div>
                        <div className="col-md-3">
                            <Link to="/game">
                                <GameCard img="https://nerdiertides.files.wordpress.com/2016/07/watch-dogs-ubisoft-cover-art.jpg" />
                            </Link>
                        </div> */}
                    </div>
                </div>
                <div className="recent-games">
                    <div>
                        <h2 className="">Recent Games</h2>
                        <div className="row">
                            <div className="col-md-3">
                                <Link to="/game">
                                    <GameCard img="https://www.oxpal.com/wp-content/uploads/2014/08/far_cry_3_-_cover.jpg" />
                                </Link>
                            </div>
                            <div className="col-md-3">
                                <Link to="/game">
                                    <GameCard img="https://cdn.tutsplus.com/psd/uploads/legacy/psdtutsarticles/linkb_60vgamecovers/1.jpg" />
                                </Link>
                            </div>
                            <div className="col-md-3">
                                <Link to="/game">
                                    <GameCard img="https://4.bp.blogspot.com/-yIU7QNheoxk/Vwf0JSrROWI/AAAAAAACAH4/g88-ZiQEY5w3LTh0MFZjiJvXZEA2U9hFg/s1600/CoD3CoverArt.png" />
                                </Link>
                            </div>
                            <div className="col-md-3">
                                <Link to="/game">
                                    <GameCard img="https://i.pinimg.com/originals/e9/c1/15/e9c115afc536d9db0738023ee168fd02.jpg" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

export default Home;