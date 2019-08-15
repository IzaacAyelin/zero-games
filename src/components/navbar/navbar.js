import React, { Component } from 'react';
import { Link } from "react-router-dom";
import userImg from '../../images/user.png';
import { connect } from 'react-redux';
import './navbar.css';

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggled: false,
            classToggle: 'navbar',
            toggleBtnClass: 'nav-toggle',
            isTop: true,
            isLoggedIn: false,
            ulClass: '',
            navToggleBg: '',
            user: {}
        }
    }

    componentDidMount() {

        document.addEventListener('scroll', () => {
            const isTop = window.scrollY < 50;
            let ulClass;
            let toggleBg;

            if (isTop) {
                ulClass = '';
                toggleBg = 'bg-transparent'
            }
            else {
                ulClass = 'nav-scrolled-down';
                toggleBg = 'bg-yellow'
            }

            this.setState({
                ulClass: ulClass,
                navToggleBg: toggleBg
            })
        });


        document.querySelectorAll('.navbar-link').forEach((link) => {
            link.addEventListener('click', () => {
                this.toggleNavbar()
            })
        })
     }

    logout = () => {
        this.props.dispatch({ type: 'LOGOUT' });
    }

    toggleNavbar = () => {
        let classToggle = this.state.toggled ? 'navbar' : 'navbar navbar-toggled';
        let toggleBtn = this.state.toggled ? 'nav-toggle' : 'nav-toggle nav-toggle-isOpen'
        this.setState({
            toggled: !this.state.toggled,
            toggleBtnClass: toggleBtn,
            classToggle: classToggle,
        })
    }



    render() {
       
        return (
            <div>
                <div className={this.state.toggleBtnClass + ' ' + this.state.navToggleBg}>
                    <i onClick={this.toggleNavbar} className="fas fa-bars"></i>
                </div>
                <div className={this.state.classToggle}>

                    <ul className={this.state.ulClass}>
                        <li><Link className="navbar-link nav-brand" to="/">HOME</Link></li>
                        <li className="dropdown">
                            <Link to="#" className="dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ><i className="fas fa-list"></i><span>Categories</span>
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link to="/search/genre/Sport" className="navbar-link dropdown-item">Sports</Link>
                                <Link to="/search/genre/Adventure" className="navbar-link dropdown-item">Adventure</Link>
                                <Link to="/search/genre/Shooter" className="navbar-link dropdown-item">Shooters</Link>
                                <Link to="/search/genre/Racing" className="navbar-link dropdown-item">Racing</Link>
                                <Link to="/search/genre/Strategy" className="navbar-link dropdown-item">Strategy</Link>
                            </div>
                        </li>
                        <li className="dropdown">
                            <Link to="#" className="dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-gamepad"></i><span>Consoles</span>
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link to="/search/console/6" className="navbar-link dropdown-item"><i className="fas fa-desktop"></i><span>PC</span></Link>
                                <Link to="/search/console/48" className="navbar-link dropdown-item"><i className="fab fa-playstation"></i><span>Playstation 4</span></Link>
                                <Link to="/search/console/49" className="navbar-link dropdown-item"><i className="fab fa-xbox"></i><span>Xbox One</span></Link>
                                <Link to="/search/console/130" className="navbar-link dropdown-item"><i className="fas fa-gamepad"></i><span>Nintendo Switch</span></Link>
                            </div>
                        </li>
                        <li><Link to="#" className="navbar-link"><i className="fas fa-calendar-alt"></i><span>Coming soon</span></Link></li>
                        <li><Link to="/about" className="navbar-link"><i className="fas fa-id-card"></i><span>About</span></Link></li>
                        {this.props.data.user.loggedIn &&
                            <li className="login-link dropdown">
                                <Link to="#" style={{ padding: 10 }} className="dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img width="40" src={userImg} alt="User"/><span>{this.props.data.user.userInfo.userName}</span>
                                </Link>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link to="/favorites" className="navbar-link dropdown-item"><i className="fas fa-heart"></i><span>My wish list</span></Link>
                                    {/* <a className="navbar-link dropdown-item"><i className="fas fa-user"></i><span>Profile</span></a>
                                    <a className="navbar-link dropdown-item"><i className="fas fa-cog"></i><span>Settings</span></a> */}
                                    <div className="dropdown-divider"></div>
                                    <Link to="#" onClick={this.logout} className="navbar-link dropdown-item"><i className="fas fa-sign-out-alt"></i><span>Logout</span></Link>
                                </div>
                            </li>
                        }
                        {
                            !this.props.data.user.loggedIn &&
                            <li className="login-link"><Link className="navbar-link" to="/account/login"><i className="fas fa-sign-in-alt"></i><span>Login</span></Link></li>
                        }
                    </ul>
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

export default connect(mapStateToProps)(Navbar);