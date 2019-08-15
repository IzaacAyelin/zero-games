import React, { Component } from 'react';
import './rating.css';

class Rating extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
      
        let rating =[];
        for(let i = 0; i < this.props.rating; i++) {
            rating.push(<i key={i+10} className="fas fa-star checked"></i>) 
        }
        for(let i = 0; i < 5 - this.props.rating; i++) {
            rating.push(<i key={i} className="fas fa-star"></i>) 
        }
     
        return (
            <div>
                <div className="rating">
                    {rating.map(x=>x)}
                </div>
            </div>
        );
    }
}

export default Rating;