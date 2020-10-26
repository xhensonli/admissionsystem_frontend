<template>
    <div id="back-stage-count-distribute">
        <empty-data v-if="!isMajor && chartDataDep.rows.length === 0 || isMajor &&chartDataMajor.rows.length === 0"/>
        <div v-else>
            <div id="count-distribute-column">
                <ve-histogram :data="isMajor?chartDataMajor: chartDataDep" :settings="lineSettings" height="600px" width="600px"></ve-histogram>
            </div>
            <div id="count-distribute-type" class="clearfix">

                <div class="type-selector">
                    <el-radio v-model="isMajor" :label="false">按学院查看</el-radio>
                    <el-radio v-model="isMajor" :label="true">按专业查看</el-radio>
                </div>

            </div>
            <div id="count-distribute-ring">
                <ve-ring :data="isMajor?chartDataMajor: chartDataDep" :settings="ringSettings"></ve-ring>
            </div>
        </div>
    </div>

</template>

<script>
    import {request} from "../../network/request";
    import EmptyData from "./EmptyData"
    export default {
        name: "CountDistribute",
        data(){
            return {
                loading: null,
                chartDataDep: {
                    columns: ['学院', '人数'],
                    rows: []
                },
                chartDataMajor: {
                    columns: ['专业', '人数'],
                    rows: []
                },
                lineSettings: {
                    itemStyle:{
                        color: '#0984D9'
                    }
                },
                ringSettings: {
                    roseType: 'radius',
                    legendLimit: 10
                },
                isMajor: false
            }
        },
        methods: {
            loadData(){
                let url = this.isMajor? 'student/getCountDistributeInMajor':'student/getCountDistributeInDepartment';
                this.setLoading();
                request({
                    url
                }).then( res => {
                    if (res.code === '000'){
                        this.chartDataMajor.rows = [];
                        this.chartDataDep.rows = [];
                        if(this.isMajor){
                            res.data.forEach( item => {
                                this.chartDataMajor.rows.push({'专业': item.major_name, '人数': item.count})
                            } );
                        } else {
                            res.data.forEach( item => {
                                this.chartDataDep.rows.push({'学院': item.department_name, '人数': item.count})
                            } );
                        }
                    } else {
                        this.$message.error(res.message)
                    }
                }).catch( err => {
                    this.$message.error('系统错误')
                    console.log(err);
                }).finally(() => {this.setUnloading();})
            },
            setLoading(){
                this.loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
            },
            setUnloading(){
                this.loading.close();
            }
        },
        components: {
            EmptyData
        },
        created() {
            this.loadData();
        },
        watch: {
            isMajor(){
                this.loadData();
            }
        }
    }
</script>

<style scoped lang="less">

    #count-distribute-column{
        background-color: #fff;
        float: left;
        padding: 20px;
    }
    #count-distribute-type{
        float: left;
        margin-left: 15px;
        height: 100px;
        width: 500px;
        padding: 30px 15px;
        background-color: #fff;
        border-radius: 5px;
        margin-bottom: 10px;

        .type-selector{
            float: left;
            margin-left: 120px;
            margin-top: 15px;
        }
    }
    #count-distribute-ring{
        background-color: #fff;
        float: left;
        width: 500px;
        padding: 70px 20px;
        height: 530px;
        margin-left: 15px;
    }

</style>