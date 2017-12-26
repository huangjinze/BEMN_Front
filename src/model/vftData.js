// 该文件用于连接BEMN_Back_VFT_BaseData中对应的后台函数，以读取“水土保持领域”的相关数据
import axios from 'axios'

export const getVFTCounts = () => { return axios.get('http://172.19.32.116/vftCountsShow') }
export const getStation = () => { return axios.get('http://172.19.32.116/station/vft/getStation') }
export const getClass = params => { return axios.get('http://172.19.32.116/station/vft/getClass', {'params': params}) }
