import axios from 'axios'
import { host } from './data'
axios.defaults.headers.post['X-CSRF-TOKEN'] = document.querySelector('meta[name=csrf-token]').getAttribute('content')
axios.defaults.withCredentials = true
export const loginUser = params => { return axios.post(host + '/login', params) }
export const logoutUser = () => { return axios.post('') }
