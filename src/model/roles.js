import axios from 'axios'
import { host } from './data'
axios.defaults.headers.post['X-CSRF-TOKEN'] = document.querySelector('meta[name=csrf-token]').getAttribute('content')
axios.defaults.withCredentials = true
export const RoleInfo = params => { return axios.post(host + '/roles', params) }
export const AddRole = params => { return axios.post(host + '/roles/store', params) }
export const DeleteRole = params => { return axios.post(host + '/roles/destroy', params) }
export const FindRolePermission = params => { return axios.post(host + '/roles/find', params) }
export const ChangeRole = params => { return axios.post(host + '/roles/update', params) }
export const FindRolePermissionName = params => { return axios.post(host + '/roles/findname', params) }
export const logoutUser = () => { return axios.post('') }
