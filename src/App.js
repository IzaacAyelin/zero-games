import React from 'react';
import { verifyToken, getUserFromLocalStorage } from './authActions';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import './App.css';
import Home from './components/home/home';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Account from './components/account/account';
import GamePage from './components/game-page/game-page';
import ScrollTop from './components/scrollTop/scrollTop';
import Search from './components/search/search';
import Favorites from './components/favorites/favorites';
import { ConnectedProROute } from './components/protected-route/protected.route';
import { About } from './components/about/about';
import { Loader } from './components/loader/loader';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:true
    }
  }

  componentDidMount() {
    setTimeout(()=>{this.setState({loading:false})},3000)
    let user = getUserFromLocalStorage();
    if (user) {
      verifyToken(user.token)
        .then((res) => {
          if (res && res.data && res.data.success) {
            this.props.dispatch({ type: 'SET_USER_STATE', data: user })
          }
        })
    }
  }

  render() {
    if (this.state.loading) {
        return<Loader/>
    }
    return (
      
        <Router>
          <ScrollTop>
            <Navbar />
            <div className="wrapper" >
            <Route path="/" exact component={Home} />
            <Route path="/account/login" exact component={Account} />
            <Route path="/account/login/:message" exact component={Account} />
            <Route path="/account/signup" exact component={Account} />
            <Route path="/game/:id" exact component={GamePage} />
            <Route path="/search" exact component={Search} />
            <Route path="/search/genre/:genre" exact component={Search} />
            <Route path="/search/console/:consoleId" exact component={Search} />
            <Route path="/about" exact component={About} />
            <ConnectedProROute
              exact
              path="/favorites"
              component={Favorites}
            />
            <Redirect to="/" />
            </div>
            <Footer />
          </ScrollTop>
        </Router>
      
    )
  }
}



const mapStateToProps = (state) => {
  return {
    data: state
  }
}

export default connect(mapStateToProps)(App);
