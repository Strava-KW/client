import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

let initialState = {
  access_token: null,
  error: null,
  communities: [],
  profile: {}
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case 'SET_ACCESS_TOKEN':
      return {...state, access_token: action.access_token}
    case 'SET_ERROR':
      return {...state, error: action.error}
    case 'SET_COMMUNITIES':
      return {...state, communities: action.communities}
    case 'SET_PROFILE':
      return {...state, profile: action.profile}
    default:
      return initialState
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store