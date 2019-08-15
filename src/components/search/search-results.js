import React, { Component } from 'react';
import './search-results.css';
import SearchItem from './search-item';
import axios from 'axios';
import noimage from '../../images/no-image.jpg';
import { MiniLoader } from './mini-loader';


class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.loading = true;
        this._isMounted = false;
        this.queryInfo = {
            offset: 0,
            query: '',
        }
        this.state = {
            games: [],
            loading: false,
            loadingNextpage: false
        }
    }

    query = (query, nextPage) => {
        this.loading = true;
        if (nextPage) {
            this.loadingNextpage = true;
            query.offset += 12;
            this.loading = false;
        }

        this.queryInfo = query;
        axios.post('https://zero-games-server.herokuapp.com/games/query', this.queryInfo)
            .then((res) => {
                this.loading = false;
                this.loadingNextpage = false;
                if (this._isMounted) {
                    if (nextPage) {
                        let newPage = [...this.state.games, ...res.data];
                        this.setState({ games: newPage, loadingNextpage: false })
                    }
                    else {
                        this.setState({ games: res.data })
                    }

                }
            })
    }

    componentWillUnmount() {
        window.removeEventListener('scroll',this.handleScroll);
        this._isMounted = false;
    }

    componentWillReceiveProps(props) {
        if (props.title && props.title.length > 0) {
            this.query({
                query: `search "${props.title}"`,
                offset: 0,
                sort: '',
                limit: 12
            }, false)
        }
        else if (props.genre) {
            this.query({
                query: `where genres.name = "${props.genre}"`,
                offset: 0,
                sort: "sort popularity desc",
                limit: 12
            }, false)
        }
    }

    handleScroll = () => {
        
        let element = document.querySelector(".footer");
        var rect = element.getBoundingClientRect();
        var elemTop = rect.top;
        var elemBottom = rect.bottom;

        // Only completely visible elements return true:
        var isVisible = elemTop < window.innerHeight && elemBottom >= 0
        if (isVisible && !this.loadingNextpage && !this.loading) {
            this.setState({loadingNextpage:true},this.query(this.queryInfo, true))
        } 
    }

    componentDidMount() {
        this._isMounted = true;
        window.addEventListener('scroll',this.handleScroll);
        if (this.props.genre) {
            this.query({
                query: `where genres.name = "${this.props.genre}"`,
                offset: 0,
                sort: "sort popularity desc",
                limit: 12
            }, false)
        }
        else if (this.props.consoleId) {
            this.query({
                query: `where platforms = ${this.props.consoleId}`,
                offset: 0,
                sort: "sort popularity desc",
                limit: 12
            }, false)
        }
    }

    render() {

        return (
            <div>
                <div className="search-results">
                    {this.loading ? <MiniLoader /> :
                        (this.state.games && this.state.games.map((game,index) => {
                            let cover;
                            if (game.cover && game.cover.url) {
                                cover = `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`;
                            }
                            else {
                                cover = noimage;
                            }
                            return <SearchItem key={game.id+index} genres={game.genres} game={game} cover={cover} />
                        })
                        )
                    }
                    {this.state.loadingNextpage && <MiniLoader />}
                </div>
            </div>
        );
    }
}

export default SearchResults;