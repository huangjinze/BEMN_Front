import axios from 'axios'
axios.defaults.headers.post['X-CSRF-TOKEN'] = document.querySelector('meta[name=csrf-token]').getAttribute('content')
axios.defaults.withCredentials = true
export const loginUser = params => { return axios.post('http://172.19.32.116/login', params) }
export const logoutUser = () => { return axios.post('') }
