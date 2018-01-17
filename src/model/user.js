import axios from 'axios'
import { host } from './data'
axios.defaults.headers.post['X-CSRF-TOKEN'] = document.querySelector('meta[name=csrf-token]').getAttribute('content')
axios.defaults.withCredentials = true
export const loginUser = params => { return axios.post(host + '/login', params) }
export const UserInfo = params => { return axios.post(host + '/users/index', params) }
export const AddUser = params => { return axios.post(host + '/users/store', params) }
export const DeleteUser = params => { return axios.post(host + '/users/destroy', params) }
export const ChangeUser = params => { return axios.post(host + '/users/update', params) }
export const FindRoleId = params => { return axios.post(host + '/users/findroleid', params) }
export const logoutUser = () => { return axios.post('') }
