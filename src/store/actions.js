export function setAccessToken (data) {
  return {type: 'SET_ACCESS_TOKEN', access_token: data}
}

export function setError (data) {
  return {type: 'SET_ERROR', error: data}
}

export function setCommunities (data) {
  return {type: 'SET_COMMUNITIES', communities: data}
}