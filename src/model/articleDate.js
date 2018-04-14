// 该文件用于连接newsPublic中对应的后台函数，以读取“新闻”的相关数据
import axios from 'axios'
import { host } from './data'
axios.defaults.headers.post['X-CSRF-TOKEN'] = document.querySelector('meta[name=csrf-token]').getAttribute('content')
axios.defaults.withCredentials = true
//  获取新闻标题
export const getNewsTitle = params => { return axios.get(host + '/getAllNewsTitle', {'params': params}) }
export const deleteNews = params => { return axios.get(host + '/deleteNews', {'params': params}) }
export const getNews = params => { return axios.get(host + '/getNews', {'params': params}) }
export const addNews = params => { return axios.post(host + '/addNews', params) }
export const editNews = params => { return axios.post(host + '/editNews', params) }
