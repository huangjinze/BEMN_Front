import axios from 'axios'

export const getVTFData = params => { return axios.get('http://172.19.32.116/test', params) }
