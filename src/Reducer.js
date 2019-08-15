import { saveUserDate, removeUserFromLocalStorage } from './authActions';


const mainReducer = (state = {
    user: {
        loggedIn: false,
        userInfo: {},
        token: ''
    }
}, actionData) => {
    switch (actionData.type) {
        case 'SET_USER_STATE':
            saveUserDate(actionData.data)
            return {
                user: {
                    userInfo: actionData.data.user,
                    token: actionData.data.token,
                    loggedIn: true
                }
            }

        case 'LOGOUT':
            removeUserFromLocalStorage()
            return {
                user: {
                    userInfo: {},
                    token: '',
                    loggedIn: false
                }
            }

        default: {
            return state;
        }

    }
}

export default mainReducer