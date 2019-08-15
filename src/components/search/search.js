import React, { Component } from 'react';
import './search.css';
import SearchResults from './search-results';
import axios from 'axios';

class Search extends Component {
    constructor(props) {
        super(props);
        this.timeout = 0;
        this.titleValue='';
        this.loading= false;
        this.genre = this.props.match.params.genre;
        this.consoleId = parseInt(this.props.match.params.consoleId);
        this.state = {
            suggestions: [],
            title: '',
            genre: this.props.match.params.genre
        }
    }

    autoComplete = () => {
        const name = this.state.title;
        if (!name || name.length < 3 ||name === '') {
            this.setState({ suggestions: [] });

        }
        else {
            axios.get('https://gist.githubusercontent.com/Tarek1337/8958a71ca5d9cdd1c3bc280fdfac50d7/raw/6ef78adc34ad2ce50b68f927091f09b5648d13d6/games.json')
                .then((res) => {
                    let result = res.data.filter(x => x.name.toLowerCase().includes(name.toLowerCase()))
                    console.log(result);
                    this.setState({ suggestions: result });
                })
        }
    }

    

    delayApiReq = (e) => {
        let name = e.target.value;
        this.titleValue=name;
    }

    

    componentDidMount(){
    }

    render() {
        return (
            <div>
                <div className="search-banner">
                    <div className="game-page-layover">
                        <h1>Search Page</h1>
                    </div>
                </div>
                <div className="search-container">
                    <div className="search-inputs">
                        <div className="input-box">
                            <input onChange={this.delayApiReq} placeholder="Title" type="text" />
                            {this.state.suggestions.length > 0 &&
                                <div className="suggestions">
                                    <ul>
                                        {this.state.suggestions.map((x) => {
                                            return <li key={x.id} name={x.name} onClick={this.selectSuggestion}>{x.name}</li>
                                        })}
                                    </ul>
                                </div>
                            }
                        </div>
                        <div className="input-box">
                            <select value="Choose Category" onChange={(e)=>this.setState({genre:e.target.value,title:null})}>
                                <option defaultValue disabled>Choose Category</option>
                                <option value="Sport">Sports</option>
                                <option value="Adventure">Adventures</option>
                                <option value="Strategy">Strategy</option>
                                <option value="Shooter">Shooters</option>
                                <option value="Racing">Racing</option>
                            </select>
                        </div>
                        <button onClick={()=>this.setState({title:this.titleValue})}>Search</button>
                    </div>
                    <SearchResults genreInput={this.genreInput} genre={this.state.genre} consoleId={this.consoleId} title={this.state.title}/>
                </div>
            </div>
        );
    }
}

export default Search;