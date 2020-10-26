<template>
    <div id="back-stage-student-info">
        <empty-data v-if="studentInfo == null || studentInfo.length === 0"/>
        <div id="student-plan-info" v-else>
            <table-row-count :count="total"></table-row-count>
            <el-table
                    :data="studentInfo"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="candidate"
                        label="准考证号"
                        width="110"
                >
                </el-table-column>
                <el-table-column
                        prop="studentName"
                        label="姓名"
                >
                </el-table-column>
                <el-table-column
                        prop="totalGrade"
                        label="总分"
                >
                </el-table-column>
                <el-table-column
                        prop="rank"
                        label="排名">
                </el-table-column>
                <el-table-column
                        prop="will1"
                        label="志愿1">
                </el-table-column>
                <el-table-column
                        prop="will2"
                        label="志愿2">
                </el-table-column>
                <el-table-column
                        prop="will3"
                        label="志愿3">
                </el-table-column>
                <el-table-column
                        prop="will4"
                        label="志愿4">
                </el-table-column>
                <el-table-column
                        prop="will5"
                        label="志愿5">
                </el-table-column>
                <el-table-column
                        prop="will6"
                        label="志愿6">
                </el-table-column>
                <el-table-column
                        prop="province"
                        label="省份">
                </el-table-column>
                <el-table-column
                        prop="city"
                        label="城市">
                </el-table-column>
                <el-table-column
                        prop="subjectType"
                        label="科类">
                </el-table-column>
            </el-table>
            <div class="page-bar" >
                <el-pagination

                        layout="prev, pager, next, jumper"
                        @current-change="changePage"
                        :page-size="50"
                        :current-page.sync="currentPage"
                        hide-on-single-page
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {request} from "../../network/request";
    import EmptyData from "./EmptyData"
    import TableRowCount from './TableRowCount'
    export default {
        name: "StudentInfo",
        data() {
            return {
                studentInfo: null,
                currentPage: 1,
                total: 0,
                loading: null
            }
        },
        methods: {

           changePage(){
               this.loadStudentInfo();
           },

            loadStudentInfo(){
               this.setLoading();
                request({
                    url: 'student/getStudentRaw',
                    params: {
                        currentPage: this.currentPage
                    }
                }) .then( res => {
                    if (res.code === '000'){
                        this.studentInfo = res.data.list;
                        this.total = res.data.total;
                    } else {
                        this.$message.error(res.message)
                    }
                }).catch( err => {
                    this.$message.error('系统错误')
                }).finally( () => {this.setUnloading();})
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
        created(){
            this.loadStudentInfo();
        },
        components: {
            EmptyData,
            TableRowCount
        }
    }
</script>

<style scoped lang="less">

    .page-bar{
        width: 500px;
        margin: 30px auto;
    }
</style>