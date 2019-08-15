import React, { Component } from 'react';
import './game-page.css';
import axios from 'axios';
import preloader from '../../images/preloader.gif';

class GamePage extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            game: {},
            platforms: {
                "6": "PC",
                "48": "Playstation 4",
                "49": "Xbox One",
                "130": "Switch"
            }
        }
    }

    getGameById = () => {
        axios.post('https://zero-games-server.herokuapp.com/get-games-by-id', { gameId: this.props.match.params.id })
            .then((result) => {
                if (this._isMounted) {
                    this.setState({ game: result.data[0] })
                }
            })
    }

    componentDidMount() {
        this._isMounted = true;
        this.getGameById()
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        console.log(this.state.game);
        if (!this.state.game || !this.state.game.id) {
            return (<div className="loader">
                <img src={preloader} alt="Preloader" />
            </div>)
        }
        return (
            <div className="game-page-container">
                <div style={{ backgroundImage: `url(https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${this.state.game.cover.image_id}.jpg)` }} className="game-banner">
                    <div className="game-page-layover">
                    </div>
                </div>
                <div className="game-page-flex">
                    <div className="game-info">
                        <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${this.state.game.cover.image_id}.jpg`} alt="cover" />
                        <div className="details">
                            <p>
                                <span>Platforms:</span><br /> {this.state.game.platforms.map(id => this.state.platforms[id] + ', ')}
                            </p>
                            <p>
                                <span>Released:</span> {new Date(this.state.game.first_release_date * 1000).toDateString()}
                            </p>
                            <p>
                                <a href={this.state.game.url}>Official Website</a>
                            </p>

                        </div>
                    </div>
                    <div className="game-summary">
                        <div className="title">
                            <h1>{this.state.game.name}</h1>
                            {this.state.game.genres && this.state.game.genres.map((genre, index) => {
                                return <span key={index} className="badge badge-warning">{genre.name}</span>
                            })}
                        </div>
                        <span>Summary</span><br />
                        <p>
                            {this.state.game.summary}
                        </p>
                        <div className="screenshots">
                            <span>Screenshots:</span><br />
                            {
                                this.state.game.screenshots.map((image, index) => {
                                    return <img key={index} src={`https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${image.image_id}.jpg`} alt="Screenshot" />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GamePage;