<template>
    <div id="back-stage-situation">
        <div id="operation-history-btn-bar" class="clearfix">
            <div id="operation-history-btn">
                <el-button type="primary" @click="drawer = true" icon="el-icon-date">查看操作历史</el-button>
            </div>
            <div id="reset-info-btn">
                <el-button type="primary" @click="reset()" icon="el-icon-refresh-right" :loading="resetting">重置所有信息</el-button>
            </div>
        </div>
        <el-divider/>
        <div id="back-stage-situation-operation" class="clearfix">
            <div class="operation-wrap" :class="{forbidden: !statePermissionTable.uploadFile.includes(state)}">
                <div class="operation-modal" v-if="!statePermissionTable.uploadFile.includes(state)"></div>
                <div class="operation-title">
                    导入文件
                </div>
                <el-divider/>
                <div class="operation-content">
                    <div class="operation-content-tip">
                        在开始阶段和完成预录取时可以导入文件，如果文件已存在，重新导入会覆盖原来的内容。
                    </div>
                    <div class="operation-content-major">
                        <div id="major-file">
                            <i class="el-icon-close" v-if="state === 0 || state === 1">
                            </i>
                            <i class="el-icon-check" v-else>
                            </i>
                            专业录取计划文件
                            <el-upload
                                action=""
                                :http-request="uploadMajor"
                                :show-file-list="false"
                            >
                                <el-button class="el-icon-upload" type="primary">上传</el-button>
                            </el-upload>
                        </div>
                        <div id="student-file">
                            <i class="el-icon-close" v-if="state === 0 || state === 2">
                            </i>
                            <i class="el-icon-check" v-else>
                            </i>
                            学生志愿信息文件
                            <el-upload
                                    action=""
                                    :http-request="uploadStudent"
                                    :show-file-list="false"
                            >
                                <el-button class="el-icon-upload" type="primary">上传</el-button>
                            </el-upload>
                        </div>
                    </div>

                </div>
            </div>

            <div class="operation-wrap" :class="{forbidden: !statePermissionTable.preEnroll.includes(state)}">
                <div class="operation-modal" v-if="!statePermissionTable.preEnroll.includes(state)"></div>
                <div class="operation-title">
                    预录取
                </div>
                <el-divider/>
                <div class="operation-content">
                    <div class="operation-content-tip">
                        预录取之后，可以调整招生计划，正式开始后不能调整
                    </div>
                    <div class="operation-content-major">
                        <el-button type="primary" @click="doEnroll">执行预录取</el-button>
                    </div>
                </div>

            </div>

            <div class="operation-wrap" :class="{forbidden: !statePermissionTable.preAdjust.includes(state)}">
                <div class="operation-modal" v-if="!statePermissionTable.preAdjust.includes(state)"></div>
                <div class="operation-title">
                    预调剂
                </div>
                <el-divider/>
                <div class="operation-content">
                    <div class="operation-content-tip">
                        预录取的一部分
                    </div>
                    <div class="operation-content-major">
                        <el-button type="primary" @click="doAdjust">执行预调剂</el-button>
                    </div>
                </div>
            </div>

            <div class="operation-wrap " :class="{forbidden: !statePermissionTable.ready.includes(state)}">
                <div class="operation-modal" v-if="!statePermissionTable.ready.includes(state)"></div>
                <div class="operation-title">
                    预录取完成
                </div>
                <el-divider/>
                <div class="operation-content">
                    <div class="operation-content-tip">
                        预录取完成，可以重置数据并调整招生计划，也可以正式开始录取，正式开始后不能调整
                    </div>
                    <div class="operation-content-major">
                        <el-button type="primary" @click="reset">重置</el-button>
                        <el-button type="primary" @click="formalReady">正式开始</el-button>
                    </div>
                </div>

            </div>

            <div class="operation-wrap" :class="{forbidden: !statePermissionTable.enrolled.includes(state)}">
                <div class="operation-modal" v-if="!statePermissionTable.enrolled.includes(state)"></div>
                <div class="operation-title">
                    录取
                </div>
                <el-divider/>
                <div class="operation-content">
                    <div class="operation-content-tip">
                        预录取正式开始
                    </div>
                    <div class="operation-content-major">
                        <el-button type="primary" @click="doEnroll">执行录取</el-button>
                    </div>
                </div>
            </div>

            <div class="operation-wrap" :class="{forbidden: !statePermissionTable.adjusted.includes(state)}">
                <div class="operation-modal" v-if="!statePermissionTable.adjusted.includes(state)"></div>
                <div class="operation-title">
                    调剂
                </div>
                <el-divider/>
                <div class="operation-content">
                    <div class="operation-content-tip">
                        录取的一部分
                    </div>
                    <div class="operation-content-major">
                        <el-button type="primary" @click="doAdjust">执行调剂</el-button>
                    </div>
                </div>
            </div>

            <div class="operation-wrap" :class="{forbidden: !statePermissionTable.finish.includes(state)}">
                <div class="operation-modal" v-if="!statePermissionTable.finish.includes(state)"></div>
                <div class="operation-title">
                    结束
                </div>
                <el-divider/>
                <div class="operation-content">
                    <div class="operation-content-tip">
                        录取流程完成后，便可导出录取结果，可查看结果分析。
                    </div>
                    <div class="operation-content-major">
                        <el-button type="primary" class="el-icon-download"
                                   @click="downloadResult"
                                    :loading="downloadingResult">
                            导出录取结果
                        </el-button>
                      <el-button type="primary" class="el-icon-download"
                                 @click="downloadExitQueue"
                                 :loading="downloadingExitQueue">
                        导出退档结果
                      </el-button>
                    </div>
                </div>
            </div>

        </div>
        <el-drawer
                :visible.sync="drawer"
                direction="rtl"
                :show-close="false"
                :withHeader="false"
                >
            <empty-data v-if="logList.length === 0"/>
            <div id="back-stage-situation-content" v-else >
                <el-timeline >
                    <el-timeline-item :timestamp="item.logTime" color="#0984D9"
                                      v-for="item in logList" placement="top">
                        <div class="log-item">
                            <div class="log-content">
                                {{item.logContent}}
                            </div>
                        </div>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </el-drawer>

        <!--<div>-->
            <!--<el-upload-->
                    <!--class="upload-demo"-->
                    <!--drag-->
                    <!--action="http://localhost:8080/file/uploadStudent"-->
                    <!--:http-request="uploadStudent"-->
                    <!--with-credentials-->
                    <!--&gt;-->
                <!--<i class="el-icon-upload"></i>-->
                <!--<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
                <!--<div class="el-upload__tip" slot="tip">上传excel文件</div>-->
            <!--</el-upload>-->
        <!--</div>-->
    </div>
</template>

<script>
    import {fileRequest} from "../../network/fileRequest";
    import {request} from "../../network/request";
    import EmptyData from "./EmptyData"
    export default {
        name: "Situation",
        data(){
            return {
                state: 0,
                loading: null,
                drawer: false,
                downloadingResult: false,
                downloadingExitQueue: false,
                resetting: false,
                statePermissionTable: {
                    //state 0 -> system initial
                    //state 1 -> have student info but no major
                    //state 2 -> have major info but no stu
                    //state 3 -> have major info and stu info -> 可以开始录取
                    //state 4 -> finish admit （完成录取）
                    //state 5 -> finish adjust
                    uploadFile: [0, 1, 2, 3, 5],
                    preEnroll: [3],
                    preAdjust: [4],
                    ready: [5],
                    enrolled: [6],
                    adjusted: [7],
                    finish: [8]
                },
                logList: []
            }
        },
        methods: {
            getStatus(){
                // this.setLoading();
                  request({
                      url: 'status/getStatus'
                  }).then(res => {
                      if (res.code === '000') {
                          this.state = res.data === null ? 0 : res.data;
                          this.$store.commit("setStatus", this.state)
                      } else {
                          this.$message.error(res.message)
                      }
                  }).catch(err => {
                      this.$message.error('系统错误')
                  })
            },
            getLogList(){
                request({
                    url: 'status/getLogList'
                }).then(res => {
                    if (res.code === '000') {
                        this.logList = res.data;
                    } else {
                        this.$message.error(res.message)
                    }
                }).catch(err => {
                    this.$message.error('系统错误')
                })
            },
            uploadMajor(param){
                const data = new FormData();
                data.append('file', param.file);
                fileRequest({
                    url: 'file/uploadMajor',
                    method: 'POST',
                    data: data,
                }).then( res => {
                    if (res.code === '000'){
                        this.$message.success('上传成功');
                        this.getStatus();
                        this.getLogList();
                    } else {
                        this.$message.error('上传失败');
                    }
                }).catch(err => {
                    this.$message.error('系统错误')
                })
            },
            uploadStudent(param){
                const data = new FormData();
                data.append('file', param.file);
                fileRequest({
                   url: 'file/uploadStudent',
                   method: 'POST',
                   data: data,
               }).then( res => {
                   if (res.code === '000'){
                       this.$message.success('上传成功');
                       this.getStatus();
                       this.getLogList();
                   } else {
                       this.$message.error('上传失败');
                   }
               }).catch(err => {
                    this.$message.error('系统错误')
                })
            },
            reset(){
                if(confirm("确认重置所有信息吗？这将使当前结果全部清空！！")){
                  this.loading=true;
                  request({
                    url: 'status/reset'
                  }) .then( res => {
                    if (res.code === '000'){
                      this.$message.success('重置成功');
                      this.getStatus();
                      this.getLogList();
                    } else {
                      this.$message.error('重置失败');
                    }
                  }).catch(err => {
                    this.$message.error('系统错误')
                  })
                }
            },
            formalReady(){
                request({
                    url: 'student/formalReady'
                }) .then( res => {
                    if (res.code === '000'){
                        this.$message.success('成功');
                        this.getStatus();
                        this.getLogList();
                    } else {
                        this.$message.error('失败');
                    }
                }).catch(err => {
                    this.$message.error('系统错误')
                })
            },
            doEnroll(){
                this.setLoading()
                request({
                    url: 'student/doEnroll'
                }) .then( res => {
                    if (res.code === '000'){
                        this.$message.success('录取成功');
                        this.getStatus();
                        this.getLogList();
                    } else {
                        this.$message.error('录取失败');
                    }
                }).catch(err => {
                    this.$message.error('系统错误')
                }).finally( () => {this.setUnloading()})
            },
            doAdjust(){
                this.setLoading()
                request({
                    url: 'student/doAdjust'
                }) .then( res => {
                    if (res.code === '000'){
                        this.$message.success('调剂成功');
                        this.getStatus();
                        this.getLogList();
                    } else {
                        this.$message.error('调剂失败');
                    }
                }).catch(err => {
                    this.$message.error('系统错误')
                }).finally( () => {this.setUnloading()})
            },
            downloadResult(){
                this.downloadingResult = true;
                request({
                    url: 'login/checkLogin'
                }).then( res => {
                    if (res.code === '010'){
                        this.$router.push('/login');
                    } else if (res.code === '000') {
                         request({
                            url: 'file/exportResult',
                            responseType: 'blob'
                        }).then((res) => {
                             const url = window.URL.createObjectURL(new Blob([res]));
                             const link = document.createElement('a');
                             link.href = url;
                             link.setAttribute('download', '录取结果.xlsx');
                             document.body.appendChild(link);
                             link.click();
                             this.downloading = false;
                         });
                    }
                })
            },
            downloadExitQueue(){
            this.downloadingExitQueue = true;
            request({
              url: 'login/checkLogin'
            }).then( res => {
              if (res.code === '010'){
                this.$router.push('/login');
              } else if (res.code === '000') {
                request({
                  url: 'file/exportExit',
                  responseType: 'blob'
                }).then((res) => {
                  const url = window.URL.createObjectURL(new Blob([res]));
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute('download', '退档结果.xlsx');
                  document.body.appendChild(link);
                  link.click();
                  this.downloading = false;
                });
              }
            })
          },
            setUnloading(){
                this.loading.close();
            } ,
            setLoading(){
                this.loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
            }
        },
        components: {
            EmptyData
        },
        created() {
            this.getStatus();
            this.getLogList();
        }
    }
</script>

<style scoped lang="less">
    #operation-history-btn{
        float: right;
        margin-right: 30px;
    }
    #reset-info-btn{
       float: right;
       margin-right: 10px;
    }
    
    .operation-wrap{
        padding: 20px;
        border-radius: 5px;
        background-color: #fff;
        width: 400px;
        float: left;
        margin: 5px;
        position: relative;
        &.forbidden{
            cursor: not-allowed;
        }
        .operation-modal{
            width: 100%;
            height: 100%;
            position: absolute;
            border-radius: 5px;
            top: 0;
            left: 0;
            z-index: 5;
            background-color: rgba(0,0,0,.4);
        }
        .operation-title{
            font-size: 36px;
            font-weight: bold;
            text-align: center;
            height: 50px;
            color: dodgerblue;
        }

        .operation-content{
            height: 157px;
            .operation-content-tip{
                font-size: 15px;
                line-height: 20px;
                color: #aaa;
            }
            .operation-content-major{
                min-width: 200px;
                min-height: 100px;
                margin-top: 20px;
                /*margin: auto;*/
                text-align: center;
                line-height: 48px;

                #major-file, #student-file{
                    width: 150px;
                    float: left;
                    margin-left: 15px;
                }
            }
        }
    }


    
    
    #back-stage-situation-content{

        width: 400px;
        margin-left: 70px;
        margin-top: 50px;
        .log-item{
            text-align: center;
            width: 300px;
            /*height: 70px;*/
            padding: 15px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 10px #999;
            .log-content{
                font-size: 18px;
                font-weight: bold;
                line-height: 30px;
                color: #777;
            }
        }
    }

    .el-icon-check{
        font-weight: bold;
        color: #00bd24;
    }

    .el-icon-close{
        font-weight: bold;
        color: #ff0c00;
    }
</style>