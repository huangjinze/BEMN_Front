import axios from 'axios'
axios.defaults.headers.post['X-CSRF-TOKEN'] = document.querySelector('meta[name=csrf-token]').getAttribute('content')
axios.defaults.withCredentials = true
export const tifStationInfo = params => { return axios.post('http://bemnwork/tifstation/index', params) }
export const AddtifStation = params => { return axios.post('http://bemnwork/tifstation/store', params) }
export const DeletetifStation = params => { return axios.post('http://bemnwork/tifstation/destroy', params) }
export const ChangetifInfo = params => { return axios.post('http://bemnwork/tifstation/update', params) }
export const FindUserId = params => { return axios.post('http://bemnwork/tifstation/find', params) }

export const vtfStationInfo = params => { return axios.post('http://bemnwork/vtfstation/index', params) }
export const AddvtfStation = params => { return axios.post('http://bemnwork/vtfstation/store', params) }
export const DeletevtfStation = params => { return axios.post('http://bemnwork/vtfstation/destroy', params) }
export const ChangevtfInfo = params => { return axios.post('http://bemnwork/vtfstation/update', params) }
