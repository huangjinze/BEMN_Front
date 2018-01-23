import axios from 'axios'

export const host = 'http://bemnwork'
// export const host = 'http://172.19.32.116'
export const getVFTIndex = params => { return axios.get(host + '/station/vft/getIndexes', {'params': params}) }
export const getVTFData = params => { return axios.get(host + '/fluxdata/statsdata/show', {'params': params}) }
export const getDataManager = params => { return axios.get(host + '/fluxdata/origindata/show', {'params': params}) }
export const getIndexData = params => { return axios.get(host + '/fluxdata/origindata/show', {'params': params}) }

// washing

export const getWashingIndexAndRange = params => {
  return axios.get(host + '/station/vft/getIndexesRange', {'params': params})
}

export const checkWashingIndexRange = params => {
  return axios.post(host + '/dataProcess/vft/checkRange', params, {headers: {'Content-Type': 'application/json'}})
}

export const despiking = params => {
  return axios.post(host + '/dataProcess/vft/despiking', params, {headers: {'Content-Type': 'application/json'}})
}

export const CStore = params => {
  return axios.get(host + '/dataProcess/vft/Cstorge', {'params': params})
}

export const UStar = params => {
  return axios.get(host + '/dataProcess/vft/ustar', {'params': params})
}

export const Gapfill = params => {
  return axios.post(host + '/dataProcess/vft/gapfill', params, {headers: {'Content-Type': 'application/json'}})
}
