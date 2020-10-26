<template>
    <div id="back-stage-result">

        <div class="clearfix result-query-option">
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
            <div class="rank-select-slider">
                <el-slider v-model="rankRaw"   :format-tooltip="formatTooltip"></el-slider>
            </div>
            <div class="result-query-btn">
                <el-button type="primary" @click="loadResult">查询</el-button>
            </div>
        </div>
        <empty-data v-if="resultList.length === 0"/>
        <div v-else>
            <table-row-count :count="total"/>
            <div id="back-stage-result-table">
                <el-table
                        :data="resultList"
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
        name: "Result",
        data(){
            return {
                resultList: [],
                currentPage: 1,
                total: 0,
                rankRaw: 100,
                selectedDepId: null,
                selectedMajorId: null,
                depList: [],
                majorList: [],
                loading: null
            }
        },
        watch: {
            selectedDepId() {
                this.selectedMajorId = null;
                this.currentPage = 1;
                this.loadMajors();
            },
            selectedMajorId(){
                this.currentPage = 1;
            },
            rankRaw(){
                this.currentPage = 1;
            }
        },
        methods: {
            loadResult(){
                this.setLoading();
                request({
                    url: 'student/getResult',
                    params: {
                        departmentId: this.selectedDepId == null || this.selectedDepId === '' ? null : this.selectedDepId,
                        majorId: this.selectedMajorId == null || this.selectedMajorId === '' ? null : this.selectedMajorId,
                        rank: this.rankRaw === 100 ? null :this.rankRaw*500+10000,
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
            },
            formatTooltip(val){
                return val*500+10000+'名以前';
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
            }
        },
        components: {
            EmptyData,
            TableRowCount
        },
        created() {
            this.loadResult();
            this.loadDepartments();
            this.loadMajors();
        }
    }
</script>

<style scoped lang="less">

    .result-query-option{
        /*float: left;*/
        /*margin-left: 7px;*/
        height: 100px;
        width: 1190px;
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
        .rank-select-slider{
            float: left;
            width: 500px;
            margin-left: 20px;
        }
        .result-query-btn{
            float: left;
            margin-left: 50px;
        }
    }

    .page-bar{
        width: 500px;
        margin: 30px auto;
    }
</style>