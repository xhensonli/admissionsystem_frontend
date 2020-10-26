
export default {
    install(Vue, options) {
        Vue.prototype.getStandardTime = function (timestamp) {
            let date = new Date(timestamp*1000);
            let YY = date.getFullYear() + '年';
            let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
            let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + "日";
            let hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            let mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
            // let ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            return YY + MM + DD + " " + hh + mm;
        }

        Vue.prototype.simplifyCount = function (count){
            if(count<10000){
                return count;
            } else if (count <100000000){
                return (count/10000).toFixed(1)+'万';
            } else {
                return (count/100000000).toFixed(1)+'亿';
            }
        };



    }
}