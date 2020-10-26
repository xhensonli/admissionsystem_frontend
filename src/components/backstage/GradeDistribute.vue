<template>
    <div id="back-stage-grade-distribute" >
        <empty-data  v-if="chartData.rows.length === 0"></empty-data>
        <div v-else>
            <div id="grade-distribute-column">
                <ve-histogram :data="chartData" :settings="lineSettings" height="600px" width="600px"></ve-histogram>
            </div>
            <div id="grade-distribute-type" class="clearfix">
                <div class="dep-selector">
                    <el-select v-model="selectedDepId" clearable placeholder="选择学院">
                        <el-option
                                v-for="item in depList"
                                :key="item.departmentId"
                                :label="item.departmentName"
                                :value="item.departmentId">
                        </el-option>
                    </el-select>
                </div>

                <div class="major-selector">
                    <el-select v-model="selectedMajorId" clearable placeholder="选择专业">
                        <el-option
                                v-for="item in majorList"
                                :key="item.majorId"
                                :label="item.majorName"
                                :value="item.majorId">
                        </el-option>
                    </el-select>
                </div>

            </div>
            <div id="grade-distribute-ring">
                <ve-ring :data="chartData" :settings="ringSettings"></ve-ring>
            </div>
        </div>

    </div>
</template>

<script>
    import {request} from "../../network/request";
    import EmptyData from "./EmptyData"
    export default {
        name: "GradeDistribute",
        data(){
            return {
                loading: null,
                chartData: {
                    columns: ['区间', '人数'],
                    rows: []
                },
                ringSettings: {
                    roseType: 'radius'
                },
                lineSettings: {
                    itemStyle:{
                        color: '#0984D9'
                    }
                },
                depList: [],
                majorList: [],
                selectedDepId: null,
                selectedMajorId: null
            }
        },
        watch: {
            selectedDepId(){
                this.selectedMajorId = null;
                this.loadMajors();
                this.getGradeDistribute();
            },
            selectedMajorId(){
                this.getGradeDistribute();
            }
        },
        methods: {
            getGradeDistribute(){
                if(this.selectedDepId != null)
                console.log( this.selectedDepId.length);
                let url = 'student/getGradeDistribute';
                if(this.selectedDepId != null && this.selectedDepId !== ''){
                    url = 'student/getGradeDistributeByDepartment'
                }
                if(this.selectedMajorId != null && this.selectedMajorId !== ''){
                    url = 'student/getGradeDistributeByMajor'
                }
                this.setLoading();
                request({
                    url,
                    params: {
                        departmentId: this.selectedDepId,
                        majorId: this.selectedMajorId
                    }
                }).then( res => {
                    if (res.code === '000'){
                        this.chartData.rows = [];
                        res.data.forEach( item => {
                            this.chartData.rows.push({'区间': item.region, '人数': item.count})
                        } );
                    } else {
                        this.$message.error(res.message)
                    }
                }).catch( err => {
                    this.$message.error('系统错误')
                }).finally(() => {this.setUnloading();})
            },
            loadDepartments(){
                request({
                    url: 'department/getDepartments'
                }).then( res => {
                    if (res.code === '000'){
                        this.depList = res.data;
                    }
                })
            },
            loadMajors(){
                let url = this.selectedDepId == null ? 'major/getMajors': 'major/getMajorsByDepartment'
                request({
                    url,
                    params: {
                        departmentId: this.selectedDepId
                    }
                }).then( res => {
                    if(res.code === '000'){
                        this.majorList = res.data;
                    }
                })
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
        created() {
            this.getGradeDistribute();
            this.loadDepartments();
            this.loadMajors();
        },
        components: {
            EmptyData
        }
    }
</script>

<style scoped lang="less">
    #back-stage-grade-distribute{

        #grade-distribute-column{
            background-color: #fff;
            float: left;
            padding: 20px;
        }
        #grade-distribute-type{
            float: left;
            margin-left: 15px;
            height: 100px;
            width: 500px;
            padding: 30px 15px;
            background-color: #fff;
            border-radius: 5px;
            margin-bottom: 10px;

            .dep-selector{
                float: left;
                margin-left: 15px;
            }

            .major-selector{
                float: left;
                margin-left: 25px;
            }
        }
        #grade-distribute-ring{
            background-color: #fff;
            float: left;
            width: 500px;
            padding: 70px 20px;
            height: 530px;
            margin-left: 15px;
        }

    }
</style>