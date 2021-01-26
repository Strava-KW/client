import axios from '../../config/axios'

export function setAccessToken (data) {
  return {type: 'SET_ACCESS_TOKEN', access_token: data}
}

export function setError (data) {
  return {type: 'SET_ERROR', error: data}
}

export function setCommunities (data) {
  return {type: 'SET_COMMUNITIES', communities: data}
}

export function setProfile (data) {
  return {type: 'SET_PROFILE', profile: data}
}

export function setGoogleAccessToken (data) {
  return {type: 'SET_GOOGLE_ACCESS_TOKEN', google_access_token: data}
}



export const fetchCommunity = (access_token) => (dispatch, getState) => {
  axios({
    url: '/community',
    method: 'GET',
    headers: {
      access_token
    }
  })
    .then(res => {
      console.log(res.data)
      dispatch(setCommunities(res.data))
    })
    .catch(err => {
      dispatch(setError(err))
    })
}

export const acceptMember = (id, access_token) => (dispatch, getState) => {
  axios({
    url: `/community/approval/${id}`,
    method: 'PUT',
    headers: {
      access_token
    }
  })
    .then(res => {
      dispatch(fetchCommunity(access_token))
    })
    .catch(err => {
      dispatch(setError(err.response.data.message))
    })
}

export const rejectMember = (id, access_token) => (dispatch, getState) => {
  axios({
    url: `/community/approval/${id}`,
    method: 'PUT',
    headers: {
      access_token
    }
  })
    .then(res => {
      dispatch(fetchCommunity(access_token))
    })
    .catch(err => {
      dispatch(setError(err.response.data.message))
    })
}

export const joinCommunity = (id, access_token) => (dispatch, getState) => {
  axios({
    url: `/community/${id}`,
    method: 'PATCH',
    headers: {
      access_token
    }
  })
    .then(res => {
      
      dispatch(fetchCommunity(access_token))
    })
    .catch(err => {
      dispatch(setError(err.response.data.message))
    })
}