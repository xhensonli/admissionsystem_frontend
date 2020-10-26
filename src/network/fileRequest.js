import axios from 'axios';
import router from "../router";
import store from "../store"
axios.defaults.withCredentials=true;
export function fileRequest(options){
    const instance = axios.create({
        baseURL: 'http://localhost:8080/',
        headers: {"content-type": "multipart/form-data"}

    });

    instance.interceptors.response.use(res => {
        if (res.data.code === '010'){
            router.push('/login');
            store.commit('doLogout');
            return;
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