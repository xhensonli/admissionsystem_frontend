<template>
    <div id="back-stage-grade-analyze">
        <el-radio v-model="type" :label="0">按全校</el-radio>
        <el-radio v-model="type" :label="1">按学院</el-radio>
        <el-radio v-model="type" :label="2">按专业</el-radio>
        <el-divider/>
        <div id="grade-analyze-table-wrapper" class="clearfix" >
                <empty-data v-if="statisticsResult.length === 0"/>
                <div id="analyze-table-department" v-else>
                    <el-table
                            :data="statisticsResult"
                            stripe
                            style="width: 100%">
                        <el-table-column
                                prop="groupName"
                                :label="type2Str()">
                        </el-table-column>
                        <el-table-column
                                prop="maxGrade"
                                label="最高分"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="minGrade"
                                label="最低分"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="averageGrade"
                                label="平均分">
                        </el-table-column>
                        <el-table-column
                                prop="topRank"
                                label="最高排名">
                        </el-table-column>
                        <el-table-column
                                prop="bottomRank"
                                label="最低排名">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
    </div>
</template>

<script>
    import {request} from "../../network/request";
    import EmptyData from "./EmptyData"
    export default {
        name: "GradeAnalyze",
        data(){
            return {
                statisticsResult: [],
                type: 0,
                loading: null
            }
        },
        methods: {
            loadResult(){
                let url = null;
                if (this.type === 0){
                    url = 'student/getStatisticsResult'
                } else if (this.type === 1){
                    url = 'student/getStatisticsResultInDepartment'
                } else {
                    url = 'student/getStatisticsResultInMajor'
                }
                this.setLoading();
                request({
                    url,
                }).then(res => {
                    if (res.code === '000') {
                        this.statisticsResult = res.data;
                    } else {
                        this.$message.error(res.message)
                    }
                }).catch(err => {
                    this.$message.error('系统错误')
                }).finally( () => {this.setUnloading();})
            },
            type2Str(){
                if (this.type === 0){
                    return '全校';
                } else if (this.type === 1){
                    return '学院';
                } else {
                    return'专业';
                }
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
            this.loadResult();
        },
        watch: {
            type(){
                this.loadResult();
            }
        },
        components: {
            EmptyData
        }
    }
</script>

<style scoped lang="less">

    /*#grade-analyze-title{*/
        /*display: inline-block;*/
        /*margin-left: 300px;*/
        /*color: dodgerblue;*/
        /*font-size: 24px;*/
        /*font-weight: bold;*/
    /*}*/
    #grade-analyze-table-wrapper{


    }
</style>