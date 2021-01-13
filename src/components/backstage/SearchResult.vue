<template>
    <div id="back-stage-search-result">
        <div id="search-result-input-wrap" class="clearfix">
            <div id="search-result-input">
                <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
                    <el-select v-model="select" slot="prepend" placeholder="请选择">
                        <el-option label="姓名" value="1"></el-option>
                        <el-option label="考号" value="2"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="loadResult"></el-button>
                </el-input>
            </div>
        </div>
        <el-divider/>
        <empty-data v-if="resultList.length === 0"/>
        <div v-else>
            <table-row-count :count="total"/>
            <div id="back-stage-search-result-table">
                <el-table
                        :data="resultList"
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
                    <el-table-column
                            prop="departmentName"
                            label="学院">
                    </el-table-column>
                    <el-table-column
                            prop="majorName"
                            label="专业">
                    </el-table-column>
                    <el-table-column
                            prop="acceptedType"
                            label="录取类型" :formatter="type2Str">
                    </el-table-column>
                </el-table>
            </div>
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
        name: "SearchResult",
        components: {EmptyData, TableRowCount},
        data(){
            return {
                select: '1',
                input: '',
                resultList: [],
                currentPage: 1,
                total: 0
            }
        },
        watch: {
            input(){
                this.currentPage = 1;
            },
            select(){
                this.currentPage = 1;
            }
        },
        methods: {
            loadResult(){
                if (this.input === null || this.input.length === 0){
                    return;
                }

                let url = this.select === '1' ? 'student/searchStudent':'student/searchStudent' +
                    'yCandidate';
                this.setLoading();
                request({
                    url,
                    params: {
                        keyword: this.input,
                        currentPage: this.currentPage
                    }
                }).then(res => {
                this.resultList = [];
                    if (res.code === '000') {
                        this.resultList = res.data.list;
                        this.total = res.data.total;
                    } else {
                        this.$message.error(res.message)
                    }
                }).catch(err => {
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
            type2Str(r, c, t){
                switch (t) {
                    case 1:
                        return '第一志愿';
                    case 2:
                        return '第二志愿';
                    case 3:
                        return '第三志愿';
                    case 4:
                        return '第四志愿';
                    case 5:
                        return '第五志愿';
                    case 6:
                        return '第六志愿';
                    case 7:
                        return '调剂';
                    default: return null;
                }
            },
            changePage(){
                this.loadResult();
            }
        }
    }
</script>

<style scoped lang="less">
    #search-result-input{
        float: right;
        width: 300px;

        .el-select{
            width: 100px;
        }
    }

    .page-bar{
        width: 500px;
        margin: 30px auto;
    }

</style>