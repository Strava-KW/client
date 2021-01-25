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

export function fetchCommunity (access_token) {
  axios({
    url: '/community/community',
    method: 'GET',
    headers: {
      access_token
    }
  })
    .then(res => {
      dispatch(setCommunities(res.data))
      console.log(res.data, '<== dari actions')
    })
    .catch(err => {
      console.log(err.response.data.message, '<== error')
      dispatch(setError(err.response.data.message))
    })
}

export function acceptMember (id, access_token) {
  axios({
    url: `/community/approval/${id}`,
    method: 'PUT',
    headers: {
      access_token
    }
  })
    .then(res => {
      console.log(res.data)
      dispatch(fetchCommunity(access_token))
    })
    .catch(err => {
      console.log(err.response.data.message)
      dispatch(setError(err.response.data.message))
    })
}

export function rejectMember (id, access_token) {
  axios({
    url: `/community/approval/${id}`,
    method: 'PUT',
    headers: {
      access_token
    }
  })
    .then(res => {
      console.log(res.data)
      dispatch(fetchCommunity(access_token))
    })
    .catch(err => {
      console.log(err.response.data.message)
      dispatch(setError(err.response.data.message))
    })
}

export function joinCommunity (id, access_token) {
  axios({
    url: `/community/${id}`,
    method: 'PATCH',
    headers: {
      access_token
    }
  })
    .then(res => {
      console.log(res.data)
      dispatch(fetchCommunity(access_token))
    })
    .catch(err => {
      console.log(err.response.data.message)
      dispatch(setError(err.response.data.message))
    })
}