// 该文件用于连接BEMN_Back_VFT_BaseData中对应的后台函数，以读取“通量数据”的相关数据
import axios from 'axios'
import { host } from './data'

export const getVFTCounts = () => { return axios.get(host + '/station/vft/countsShow') }
export const getStation = params => { return axios.get(host + '/station/vft/getStation', {'params': params}) }
export const getClass = params => { return axios.get(host + '/station/vft/getClass', {'params': params}) }
// 文件导出_展示_导出表格
export const showExport = params => { return axios.get('http://127.0.0.1/excel/vft/showExport', {'params': params}) }
// 文件导出_展示_导出统计值
export const showStatistics = params => { return axios.get('http://127.0.0.1/excel/vft/showStatistics', {'params': params}) }
// 文件导出_比较_导出表格
export const compareExport = params => { return axios.get('http://127.0.0.1/excel/vft/compareExport', {'params': params}) }
// 文件导出_比较_导出统计值
export const compareStatistics = params => { return axios.get('http://127.0.0.1/excel/vft/compareStatistics', {'params': params}) }
// download Url
export const downloadUrl = url => {
  let iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  iframe.onload = function () {
    document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
}
// 获取表格数据
export const getIndexTableData = params => { return axios.get(host + '/fluxdata/origindata/show', {'params': params}) }
// 获取表格记录数
export const getTableCounts = params => { return axios.get(host + '/station/vft/tableCounts', {'params': params}) }
// 上传文件
export const submitTwoSelect = params => { return axios.get(host + '/excel/vft/submit', {'params': params}, {headers: {'Content-Type': 'application/json'}}) }
// 获取设备信息
export const getDevice = params => { return axios.get(host + '/device/getDevice', {'params': params}) }
// 根据设备获取指标
export const getIndexByDevice = params => { return axios.get('http://127.0.0.1/device/getIndexByDevice', {'params': params}) }
// 添加设备操作
export const addDeviceInfo = params => { return axios.post('http://127.0.0.1/device/addDeviceInfo', params, {headers: {'Content-Type': 'application/json'}}) }
// 获取设备故障信息
export const getDeviceErrorInfo = params => { return axios.get('http://127.0.0.1/device/getErrorInfo', {'params': params}) }
// 根据时间获取设备故障信息
export const getDeviceErrorInfoByTime = params => { return axios.get('http://127.0.0.1/device/getErrorInfoByTime', {'params': params}) }
// 修改设备信息
export const updateDeviceInfo = params => { return axios.post('http://127.0.0.1/device/updateInfo', params, {headers: {'Content-Type': 'application/json'}}) }
// 删除指标
export const deleteFactor = params => { return axios.get('http://127.0.0.1/device/deleteFactor', {'params': params}) }
