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
export const Info = params => { return axios.post(host + '/users/info', params) }
export const ChangePersonalInfo = params => { return axios.post(host + '/users/changepersonalinfo', params) }
export const ResetPwd = params => { return axios.post(host + '/users/resetpwd', params) }
export const logoutUser = () => { return axios.post(host + '/logout') }
export const currentUser = () => { return axios.get(host + '/users/currentuser') }
export const currentInfo = params => { return axios.post(host + '/users/currentinfo', params) }
