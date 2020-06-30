import { combineReducers } from 'redux'

function userReducer(user = null, action) {
    if(action.type === 'AUTHENTICATED_USER') {
        return 
    }
    return userReducer
}


export default combineReducers({
    user: userReducer
})
