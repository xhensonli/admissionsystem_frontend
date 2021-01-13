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
        console.log(res);
        if (res.data.code === '010'){
            router.push('/login');
            store.commit('doLogout');
        }
        // console.log(res.headers.contentType)
        if (res.headers['content-type'].indexOf('application/vnd.ms-excel')!==-1){
            console.log(456)
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            if(res.config.url === "file/exportExit")
                link.setAttribute('download', '退档结果.xlsx');
            else {
                link.setAttribute('download', '录取结果.xlsx');
            }
            document.body.appendChild(link);

            link.click();
            return {
                code: '000',
            }
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