<template>
    <div id="back-stage-controller" class="clearfix">
        <div id="back-stage-controller-header">
            <div id="back-stage-header-text">
                <div id="back-stage-header-title">
                    志愿录取系统
                </div>
                <div id="back-stage-header-title-eng">
                    ADMISSION SYSTEM
                </div>
            </div>
            <el-popover
                    placement="top-start"
                    width="200"
                    trigger="hover"
                    >
                <div id="logout-link">
                    <el-link @click="logout">注销登录</el-link>
                </div>
                <div id="back-stage-controller-header-avatar"  slot="reference"></div>
            </el-popover>
        </div>
        <div id="back-stage-controller-menu">
            <el-menu
                    :router="true"
                    :default-active="$route.path.substr(11) || 'situation'"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#fff"
                    text-color="#999"
                    active-text-color="#8DC4F9">

                <el-menu-item index="situation">
                    <i class="el-icon-s-home"></i>
                    <span slot="title">概况</span>
                </el-menu-item>
                <el-menu-item index="studentPlan">
                    <i class="el-icon-reading"></i>
                    <span slot="title">招生计划</span>
                </el-menu-item>
                <el-menu-item index="studentInfo">
                    <i class="el-icon-info"></i>
                    <span slot="title">学生信息</span>
                </el-menu-item>
                <el-submenu index="4" >
                    <template slot="title">
                        <i class="el-icon-document"></i>
                        <span >录取结果</span>
                    </template>
                    <el-menu-item index="result">全部结果</el-menu-item>
                    <el-menu-item index="searchResult">搜索查询</el-menu-item>
                    <el-menu-item index="adjustQueue">调剂队列</el-menu-item>
                    <el-menu-item index="exitQueue">退档队列</el-menu-item>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-s-data"></i>
                        <span>数据分析</span>
                    </template>
                    <el-menu-item index="gradeAnalyze">成绩分析</el-menu-item>
                    <el-menu-item index="countDistribute">人数分布</el-menu-item>
                    <el-menu-item index="gradeDistribute">成绩区间分布</el-menu-item>
                    <el-menu-item index="geoDistribute">生源地分布</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <div id="back-stage-controller-main">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import {request} from "../../network/request";

    export default {
        name: "BackStageController",
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            logout(){
                request({
                    url: 'login/logout'
                }).then( res => {
                    if (res.code === '000'){
                        this.$message.success('注销成功');
                    } else {
                        this.$message.error(res.message);
                    }
                    this.$router.push('/login');
                })
            }
        }
    }
</script>

<style scoped lang="less">
    #back-stage-controller{
        min-height: 100%;

        background-color: rgba(9, 132, 217, .15);

        #back-stage-controller-header{
            height: 70px;
            background-color: rgb(9, 132, 217);
            position: fixed;
            z-index: 2000;
            width: 100%;

            #back-stage-header-text{
                text-align: center;
                width: 400px;
                padding-top: 10px;
                #back-stage-header-title{
                    color: #eee;
                    font-weight: bold;
                    font-size: 24px;
                    margin-bottom: 10px;
                }
                #back-stage-header-title-eng{
                    color: #eee;
                    font-weight: bold;
                }
            }



            #back-stage-controller-header-avatar{
                background: url("../../assets/img/avatar.png") center;
                -webkit-background-size: cover;
                background-size: cover;
                cursor: pointer;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                position: absolute;
                right: 30px;
                top: 10px;
            }
        }
    }

        #back-stage-controller-main{
            width: 83%;
            padding: 20px;
            /*position: fixed;*/
            top: 80px;
            margin-top: 70px;
            float: right;
            right: 0;
        }
    #back-stage-controller-menu{
        width: 17%;
        min-height: 100%;
        float: left;
        background-color: #fff;
        border-right: 1px solid #c3e7ff;
        position: fixed;
        top: 70px;
    }

    #logout-link{
        text-align: center;
    }
</style>