import React, { Component } from 'react';
import './account.css';
import loginImg from '../../images/login1.png';
import axios from 'axios';
import validator from 'validator';



class Signup extends Component {
    constructor(props) {
        super(props);
        this._isMounted =false;
        this.state = {
            error:null,
            userName: {
                value: '',
                valid: false
            },
            email: {
                value: '',
                valid: false
            },
            password: {
                value: '',
                valid: false
            },
            confirmPassword:''
        }
    }
   
    handleInput = (event) => {
        let field = {
            value: event.target.value,
            valid: false
        }

        switch (event.target.name) {
            case 'userName':
                field.valid = field.value.length > 2
                break;
            case 'email':
                field.valid = validator.isEmail(field.value)
                break;
            case 'password':
                field.valid = field.value.length > 4
                break;

            default:
                break;
        }
        this.setState({
            [event.target.name]: field
        })
    }

    register = () => {
        const user = {
            userName:this.state.userName.value,
            email: this.state.email.value,
            password: this.state.password.value
        }
        axios.post('https://zero-games-server.herokuapp.com/users/register', user)
            .then((result) => {
                if (result && result.data && result.data.success && this._isMounted) {
                    this.props.history.push({pathname:`/account/login`,message:result.data.success});
                }
                else if(result && result.data && result.data.error && this._isMounted){
                    this.setState({error:result.data.error})
                }
                
            }).catch(err => console.log(err));
    }

    isFormValid = () => {
        return (
            this.state.email.valid &&
            this.state.userName.valid &&
            this.state.password.valid && 
            this.state.password.value === this.state.confirmPassword.value
        )
    }
    componentDidMount(){
        this._isMounted = true;
    }
    componentWillUnmount(){
        this._isMounted = false;
    }

    render() {

        return (
            <div className="signup-container">
                <div className="form-header">
                    <h4>Sign Up</h4>
                </div>
                <form>
                    <div className="login-img">
                        <img src={loginImg} alt="Login" />
                    </div>
                    {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
                    <div className="input-container">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-user"></i></span>
                            </div>
                            <input autoComplete="off" onChange={this.handleInput} name="userName" type="text" className="form-control" placeholder="User Name" />
                        </div>
                        {!this.state.userName.valid && this.state.userName.value !== '' &&
                            <div className="error-msg alert alert-danger">*Username: atleast 2 characters</div>
                        }
                    </div>
                    <div className="input-container">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-envelope-square"></i></span>
                            </div>
                            <input onChange={this.handleInput} name="email" type="text" className="form-control" placeholder="Email" />
                        </div>
                        {!this.state.email.valid && this.state.email.value !== '' &&
                            <div className="error-msg alert alert-danger">*Email: must be a valid format</div>
                        }
                    </div>
                    <div className="input-container">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-unlock-alt"></i></span>
                            </div>
                            <input autoComplete="off" onChange={this.handleInput} name="password" type="text" className="form-control" placeholder="Password" />
                        </div>
                        {!this.state.password.valid && this.state.password.value !== '' &&
                            <div className="error-msg alert alert-danger">Passwod: atleast 5 characters</div>
                        }
                    </div>
                    <div className="input-container">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-unlock-alt"></i></span>
                            </div>
                            <input autoComplete="off" onChange={this.handleInput} name="confirmPassword" type="text" className="form-control" placeholder="Confirm Password" />
                        </div>
                        {this.state.password.value !== this.state.confirmPassword.value && this.state.password.value !== '' &&
                            <div className="error-msg alert alert-danger">Confirm Password: must match password</div>
                        }
                    </div>
                    <button disabled={!this.isFormValid()} onClick={this.register} className="btn-login" type="button">Sign Up</button>
                </form>
            </div>
        );
    }
}

export default Signup;