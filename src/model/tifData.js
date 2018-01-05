// 该文件用于连接BEMN_Back_TIF_BaseData中对应的后台函数，以读取“森林领域”的相关数据
import axios from 'axios'
import { host } from './data'

export const getTIFCounts = () => { return axios.get(host + '/tifCountsShow') }
