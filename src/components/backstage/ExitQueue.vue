<template>
    <div id="back-stage-exit-queue">
        <empty-data v-if="exitQueue.length === 0"/>
        <div v-else>
            <table-row-count :count="total"/>
            <el-table
                    :data="exitQueue"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="candidate"
                        label="准考证号"
                >
                </el-table-column>
                <el-table-column
                        prop="studentName"
                        label="姓名">
                </el-table-column>
                <el-table-column
                        prop="totalGrade"
                        label="总分"
                >
                </el-table-column>
                <el-table-column
                        prop="rank"
                        label="排名"
                >
                </el-table-column>
                <el-table-column
                        prop="province"
                        label="省份">
                </el-table-column>
                <el-table-column
                        prop="city"
                        label="城市">
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
    import TableRowCount from "./TableRowCount"
    export default {
        name: "ExitQueue",
        data(){
            return {
                exitQueue: [],
                currentPage: 1,
                total: 0,
                loading: null
            }
        },
        methods: {
            loadData(){
                this.setLoading();
                request({
                    url: 'student/getExitStudentRaw'
                }).then(res => {
                    if (res.code === '000') {
                        this.exitQueue = res.data.list;
                        this.total = res.data.total;
                    } else {
                        this.$message.error(res.message)
                    }
                }).catch(err => {
                    this.$message.error('系统错误')
                }).finally( () => {this.setUnloading();})
            } ,
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
            },
            changePage(){
                this.loadData();
            }
        },
        components: {
            EmptyData,
            TableRowCount
        },
        created() {
            this.loadData();
        }
    }
</script>

<style scoped lang="less">

    .page-bar{
        width: 500px;
        margin: 30px auto;
    }
</style>