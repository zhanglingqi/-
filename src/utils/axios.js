/** 
 * axios网络请求配置
 * Created by aerfa on 2018/8/9.
 */
import axios from 'axios'
import Qs from 'qs'

// 请求配置项
var instance = axios.create({
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    timeout: 8000,
	baseURL: 'http://192.168.1.160:8091' //接口地址
})

//请求拦截器
instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if(token){
        config.headers.authorization =  'bearer' + ' ' +token;
    }
    config.data = Qs.stringify(config.data);
    return config;
},error => {
    return Promise.reject(error);
})

//响应拦截器
instance.interceptors.response.use(
    res => {
        return res.data
    },
    error => {
        return Promise.reject(error);
    }
)

//封装get请求
export function get(url, data = {}) {
    return new Promise((resolve, reject) => {
        instance.get(url, {
            params: data
        })
        .then(response => {
            resolve(response);
        })
        .catch(err => {
            reject(err)
        })
    })
}

//封装post请求
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        instance.post(url, data).then(response => {
            if(response.code === 1000){
                resolve(response);
            }else{
                alert(response.message);
            }
        }).catch(err =>{
            return Promise.reject(err);
        });
    })
}