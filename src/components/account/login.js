import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from "react-router-dom";
import loginImg from '../../images/login1.png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
           error:null,
        }
    }

    notifySuccess = (massage) => {
        toast.success(massage, {
            position: toast.POSITION.TOP_CENTER
        });
    }
    
    componentDidMount(){
        if (this.props.history.location.message) {
            this.notifySuccess(this.props.history.location.message);
        }
        
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    login = () => {
        axios.post('https://zero-games-server.herokuapp.com/users/login', this.state)
            .then((result) => {
                if (result.data && result.data.error) {
                    this.setState({ error: 'Invalid email or password!' })
                }            
                if (result.data && result.data.token) {
                    localStorage.removeItem('user');
                    localStorage.setItem('user', JSON.stringify(result.data));
                    this.setState({ isLoggedIn: true })
                    this.props.dispatch({ type: 'SET_USER_STATE', data: result.data })
                }

            }).catch(err => console.log(err));
    }

    render() {
        return (!this.state.isLoggedIn || !this.props.data.user.loggedIn ? (
            <div className="login-container">
                <div className="form-header">
                    <h4>Login</h4>
                </div>
                <form>
                    <div className="login-img">
                        <img src={loginImg} alt="Login" />
                    </div>
                    {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
                    <div className="form-group">
                        <input onChange={this.handleInput} name="email" type="text" className="form-control" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <input autoComplete="off" onChange={this.handleInput} name="password" type="text" className="form-control" placeholder="Password" />
                    </div>
                    <button onClick={this.login} className="btn-login" type="button">Login</button>
                    <div className="divider"><b>OR</b></div>
                    <div className="social-buttons-container">
                        <button className="btn-login facebook-btn" type="button"><i className="fab fa-facebook-square"></i> Facebook</button>
                        <button className="btn-login google-btn" type="button"><i className="fab fa-google"></i> Google</button>
                    </div>
                </form>
                <div className="form-footer">
                    New user? <Link to="/account/signup">signup</Link>
                </div>
                <ToastContainer autoClose={5000} />
            </div>
        ) : <Redirect to="/" />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state
    }
}

export default connect(mapStateToProps)(Login);