import axios from 'axios'
axios.defaults.headers.post['X-CSRF-TOKEN'] = document.querySelector('meta[name=csrf-token]').getAttribute('content')
axios.defaults.withCredentials = true
export const RoleInfo = params => { return axios.post('http://bemnwork/roles', params) }
export const AddRole = params => { return axios.post('http://bemnwork/roles/store', params) }
export const DeleteRole = params => { return axios.post('http://bemnwork/roles/destroy', params) }
export const FindRolePermission = params => { return axios.post('http://bemnwork/roles/find', params) }
export const ChangeRole = params => { return axios.post('http://bemnwork/roles/update', params) }
export const FindRolePermissionName = params => { return axios.post('http://bemnwork/roles/findname', params) }
export const logoutUser = () => { return axios.post('') }
