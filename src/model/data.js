import axios from 'axios'

// export const host = 'http://222.31.175.157:10080'
export const host = 'http://bemnwork.emp:80'

export const getVFTIndex = params => { return axios.get(host + '/station/vft/getIndexes', {'params': params}) }
export const getVTFData = params => { return axios.get(host + '/fluxdata/statsdata/show', {'params': params}) }
export const getDataManager = params => { return axios.get(host + '/fluxdata/origindata/show', {'params': params}) }
export const getIndexData = params => { return axios.get(host + '/fluxdata/origindata/show', {'params': params}) }
