import axios from 'axios';

export function saveUserDate(user) {
    if (user) {
        localStorage.setItem('user', JSON.stringify(user))
    }
}

export function removeUserFromLocalStorage() {
    localStorage.removeItem('user')
}

export function userIsLoggedIn() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token && user.user) {
        return true;
    }
    return false;
}

export function getUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem('user'));
}

export function verifyToken(token) {
    return axios({
        url: "https://zero-games-server.herokuapp.com/users/verify-token",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'bearer ' + token,
        }
    })
}

