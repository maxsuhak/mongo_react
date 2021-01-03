const BASE_PATH = '/api/v1'

export const handleStatus = (res) => {
  switch (res.status) {
    case 204: return {}
    case 500: return { errors: [{ title: 'Something went wrong' }] }
    default: return res.json()
  }
}

export const makeRequest = ({ path, method, params, onSuccess, onFailure }) => {
  let baseParams = {
    method: method,
    headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }
  }

  if (params) { baseParams = {...baseParams, body: JSON.stringify(params || {})} }

  fetch(`${BASE_PATH}${path}`, baseParams)
  .then((res) => handleStatus(res))
  .then((res) => onSuccess(res))
  .catch((error) => { console.log(error) })
}

export const get = (path, onSuccess, onFailure) => {
  makeRequest({ method: 'GET', path: path, onSuccess: onSuccess, onFailure: onFailure })
}

export const post = (path, data = {}, onSuccess, onFailure) => {
  makeRequest({ method: 'POST', path: path, params: data, onSuccess: onSuccess, onFailure: onFailure })
}

export const destroy = (path, data = {}, onSuccess, onFailure) => {
  makeRequest({ method: 'DELETE', path: path, params: data, onSuccess: onSuccess, onFailure: onFailure })
}
