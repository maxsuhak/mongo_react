import axios from 'axios'

export const fetchUsers = async ({ pageSize, page, sorted, filtered }) => {
  const url = '/api/v1/users'

  const { data } = await axios.get(url, { params: { page_size: pageSize, page: page, sort: sorted, filter: filtered } })

  return data
}

export const fetchUser = async (id) => {
  const url = `/api/v1/users/${id}`

  const { data } = await axios.get(url)

  return data
}

export const updateUser = async (id, params, successCallback) => {
  const url = `/api/v1/users/${id}`

  try {
    const { data } = await axios.put(url, { user: params })
    successCallback(data)
  } catch (error) {
    console.log(error)
  }

}

export const createUser = async (params, successCallback) => {
  const url = '/api/v1/users'

  try {
    const { data } = await axios.post(url, { user: params })
    successCallback(data)
  } catch (error) {
    console.log(error)
  }
}

export const deleteUser = async (id, successCallback) => {
  const url = `api/v1/users/${id}`

  try {
    await axios.delete(url)
    successCallback()
  } catch (error) {
    console.log(error)
  }
}

export const searchUsers = async ({ pageSize, page, sorted, filtered, q }) => {
  const url = '/api/v1/users/search'

  const { data } = await axios.get(url, { params: { page_size: pageSize, page: page, sort: sorted, filter: filtered, q: q } })

  return data
}
