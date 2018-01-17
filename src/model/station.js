import axios from 'axios'
import { host } from './data'
axios.defaults.headers.post['X-CSRF-TOKEN'] = document.querySelector('meta[name=csrf-token]').getAttribute('content')
axios.defaults.withCredentials = true
export const tifStationInfo = params => { return axios.post(host + '/tifstation/index', params) }
export const AddtifStation = params => { return axios.post(host + '/tifstation/store', params) }
export const DeletetifStation = params => { return axios.post(host + '/tifstation/destroy', params) }
export const ChangetifInfo = params => { return axios.post(host + '/tifstation/update', params) }
export const FindUserId = params => { return axios.post(host + '/tifstation/find', params) }

export const vtfStationInfo = params => { return axios.post(host + '/vtfstation/index', params) }
export const AddvtfStation = params => { return axios.post(host + '/vtfstation/store', params) }
export const DeletevtfStation = params => { return axios.post(host + '/vtfstation/destroy', params) }
export const ChangevtfInfo = params => { return axios.post(host + '/vtfstation/update', params) }
