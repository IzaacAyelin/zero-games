import React, { Component } from 'react';
import './footer.css';
import { Link } from "react-router-dom";

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="footer">
                <div className="overlay">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="about">
                                <h4>About Us</h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Vestibulum rutrum molestie tortor, ut dictum ipsum. Nam venenatis ligula non lectus blandit venenatis.
                                    Suspendisse justo magna, suscipit ac blandit et, condimentum eu leo. Ut sed nunc nec massa venenatis pretium quis a turpis.
                                    Morbi malesuada odio sem, eu iaculis nibh porttitor vel. Praesent pretium tortor in nibh dapibus, vitae semper erat semper.
                        </p>
                            </div>
                        </div>
                        <div className="col-sm-3">
                        <div className="links">
                                <h4>Quick Links</h4>
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/search">Search</Link></li>
                                    <li><Link to="/about">About</Link></li>
                                    <li><Link to="/account/">Login</Link></li>
                                </ul>

                            </div>
                        </div>
                        <div className="col-sm-3">
                        <div className="connect">
                                <h4>Connect With Us</h4>
                                <ul>
                                    <li><a href="https://www.linkedin.com/in/izaac-ayelin/" rel="noopener noreferrer" target="_blank"><i className="fab fa-linkedin"></i> linkedin</a></li>
                                    <li><a href="https://www.facebook.com" rel="noopener noreferrer" target="_blank"><i className="fab fa-facebook-square"></i> Facebook</a></li>
                                    <li><a href="https://github.com/IzaacAyelin" rel="noopener noreferrer" target="_blank"><i className="fab fa-github-square"></i> Github</a></li>
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                   
                </div>
                <div className="bottom-footer text-center">
                        &copy; 2019 Zero Games. All Rights Reserved.
                </div>
            </div>
        );
    }
}

export default Footer;