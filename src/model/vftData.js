// 该文件用于连接BEMN_Back_VFT_BaseData中对应的后台函数，以读取“水土保持领域”的相关数据
import axios from 'axios'
import { host } from './data'

export const getVFTCounts = () => { return axios.get(host + '/station/vft/countsShow') }
export const getStation = params => { return axios.get(host + '/station/vft/getStation', {'params': params}) }
export const getClass = params => { return axios.get(host + '/station/vft/getClass', {'params': params}) }
// 文件导出
export const showExport = params => { return axios.get('http://127.0.0.1/excel/vft/showExport', {'params': params}) }
// 获取表格数据
export const getIndexTableData = params => { return axios.get('http://127.0.0.1/fluxdata/origindata/show', {'params': params}) }
// 获取表格记录数
export const getTableCounts = params => { return axios.get('http://127.0.0.1/station/vft/tableCounts', {'params': params}) }
