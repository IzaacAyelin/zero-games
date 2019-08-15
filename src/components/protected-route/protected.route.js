import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


 const ProtectedRoute =({ component: Component, ...rest }) =>{
 
     

    return <Route
        {...rest}
        render={props => {
            if ( rest.data.user.loggedIn) {
                return <Component {...props} />
            }
            else {
                return <Redirect to={
                    {
                        pathname: '/account/login',
                        state: {
                            from: props.location
                        }
                    }
                }
                />
            }
        }}
    />
}

const mapStateToProps = (state) => {
    return {
        data: state
    }
}

export const ConnectedProROute = connect(mapStateToProps)(ProtectedRoute)
