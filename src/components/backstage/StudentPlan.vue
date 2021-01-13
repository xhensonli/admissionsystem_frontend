<template>
    <div id="back-stage-student-plan">
        <!--<div id="student-plan-import-btn-wrap" class="clearfix">-->
            <!--&lt;!&ndash;<div id="student-plan-import-btn">&ndash;&gt;-->
                <!--&lt;!&ndash;<el-button type="primary">&ndash;&gt;-->
                    <!--&lt;!&ndash;<i class="el-icon-upload2"></i>&ndash;&gt;-->
                    <!--&lt;!&ndash;导入&ndash;&gt;-->
                <!--&lt;!&ndash;</el-button>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--</div>-->

        <!--<el-divider/>-->

        <empty-data v-if="planInfo == null || planInfo.length === 0"/>
        <div id="student-plan-info" v-else>
            <table-row-count :count="planInfo.length"/>
            <el-table
                    :data="planInfo"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="majorId"
                        label="专业代号"
                        width="100"
                        >
                </el-table-column>
                <el-table-column
                        prop="majorCode"
                        label="专业代码"
                        >
                </el-table-column>
                <el-table-column
                        prop="departmentName"
                        label="学院">
                </el-table-column>
                <el-table-column
                        prop="majorName"
                        label="专业名称">
                </el-table-column>
                <el-table-column
                        prop="comment"
                        label="备注">
                </el-table-column>
                <el-table-column
                        prop="period"
                        label="学制年限">
                </el-table-column>
                <el-table-column
                        prop="planStudentCount"
                        label="计划招生">
                </el-table-column>

                <el-table-column
                        prop="realisticStudentCount"
                        label="招生数目">
                </el-table-column>
                <el-table-column
                        v-if="$store.state.status === 1 || $store.state.status === 2 "
                        fixed="right"
                        label="操作"
                        >
                    <template slot-scope="scope">
                        <el-link type="primary" :underline="false" @click="updataPlan(scope.row.majorId)">修改计划</el-link>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {request} from "../../network/request";
    import EmptyData from "./EmptyData"
    import TableRowCount from "./TableRowCount"
    export default {
        name: "StudentPlan",
        data(){
            return {
                planInfo: null,
                loading: null
            }
        },
        methods: {
            loadData(){
                this.setLoading();
                request({
                    url: 'major/getMajorPlan'
                }).then( res => {
                    if (res.code === '000'){
                        this.planInfo = res.data;
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
            },
            updataPlan(id){
                this.$prompt('请输入计划人数', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    request({
                        url: 'major/updateMajorPlan',
                        params: {
                            majorId: id,
                            count: value
                        }
                    }).then(res => {
                        if (res.code === '000') {
                           this.$message.success('修改成功');
                           this.loadData();
                        } else {
                            this.$message.error(res.message)
                        }
                    }).catch(err => {
                        this.$message.error('系统错误')
                    })
                }).catch(() => {

                });
            }
        },
        created(){
            this.loadData();
        },
        components: {
            EmptyData,
            TableRowCount
        }
    }
</script>

<style scoped lang="less">

    #student-plan-import-btn{
        float: right;
    }

    .student-plan-text{
        display: inline-block;
        margin-top: 5px;
    }
    .plan-edit-btn{
        float: right;
        margin-right: 60px;
    }

</style>