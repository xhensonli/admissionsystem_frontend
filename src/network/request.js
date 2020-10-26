import axios from 'axios';
import Qs from 'qs';
import store from "../store"
import router from "../router"

axios.defaults.withCredentials=true;
export function request(options){
    const instance = axios.create({
        baseURL: 'http://localhost:8080/',
        transformRequest:[
            data => {
                data =  Qs.stringify(data,{arrayFormat: 'indices', allowDots: true});
                return data;
            }
        ],
        headers:{'Content-Type':'application/x-www-form-urlencoded'}
    });

    instance.interceptors.response.use(res => {
        if (res.data.code === '010'){
            router.push('/login');
            store.commit('doLogout');
        }
        return res.data;
    }, err => {

    });
    //
    //
    // instance.interceptors.response.use(res => {
    //     return res.data;
    // }, err => {
    //
    // });
    return instance(options);
}