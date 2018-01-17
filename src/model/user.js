import axios from 'axios'
axios.defaults.headers.post['X-CSRF-TOKEN'] = document.querySelector('meta[name=csrf-token]').getAttribute('content')
axios.defaults.withCredentials = true
export const loginUser = params => { return axios.post('http://bemnwork/login', params) }
export const UserInfo = params => { return axios.post('http://bemnwork/users/index', params) }
export const AddUser = params => { return axios.post('http://bemnwork/users/store', params) }
export const DeleteUser = params => { return axios.post('http://bemnwork/users/destroy', params) }
export const ChangeUser = params => { return axios.post('http://bemnwork/users/update', params) }
export const FindRoleId = params => { return axios.post('http://bemnwork/users/findroleid', params) }
export const logoutUser = () => { return axios.post('') }
