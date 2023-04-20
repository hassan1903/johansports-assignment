import axios from "axios"

const config = {
  baseUrl: "",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
}

const base = async param => {
  return await axios({
    method: param.method,
    baseURL: config.baseUrl,
    url: param.url,
    headers: config.headers,
    timeout: 10000
  })
    .then(res => {
      return Promise.resolve(res)
    })
    .catch(err => {
      if (err.response) {
        return Promise.reject(err.response)
      } else {
        return Promise.reject("TIMEOUT")
      }
    })
}

const callAPI = async (method, url) => {
  return await base({ method, url })
    .then(res => Promise.resolve(res))
    .catch(err => Promise.reject(err))
}

export { callAPI }
