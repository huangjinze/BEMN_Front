import axios from 'axios'

export const getVFTIndex = params => { return axios.get('http://172.19.32.116/station/vft/getIndexes', {'params': params}) }
export const getVTFData = params => { return axios.get('http://172.19.32.116/fluxdata/statsdata/show', {'params': params}) }
