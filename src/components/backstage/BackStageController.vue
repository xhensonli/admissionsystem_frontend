<script src="../../../babel.config.js"></script>
   <template>

       <div id="back-stage-controller" class="clearfix">

           <div id="back-stage-controller-header">
             <div id="back-stage-header-text">
               <div id="back-stage-header-title">
                 志愿录取系统
<!--                 {{$store.state.status}}-->
               </div>
               <div id="back-stage-header-title-eng">
                 ADMISSION SYSTEM
               </div>
             </div>
          <el-container>
            <el-header>
              <el-menu class="el-menu-demo" mode="horizontal"
                       background-color="#0984d9"
                       @select="handleSelect"
                       text-color="#ffff"
                       active-text-color=""
              >
                <el-submenu index="1">
                  <template slot="title">导入文档</template>
                  <el-upload
                      action=""
                      :http-request="uploadMajor"
                      :show-file-list="false"
                      :disabled="!statePermissionTable.uploadMajorInfo.includes($store.state.status)"

                  >
                    <el-menu-item index="1-1"  :disabled="!statePermissionTable.uploadMajorInfo.includes($store.state.status)" width=100%>导入专业录取计划文件</el-menu-item>

                  </el-upload>
                  <el-upload
                      action=""
                      :http-request="uploadStudent "
                      :show-file-list="false"
                      :disabled="!statePermissionTable.uploadStuInfo.includes($store.state.status)"
                  >
                    <el-menu-item index="1-2"  :disabled="!statePermissionTable.uploadStuInfo.includes($store.state.status)">导入学生志愿信息文件</el-menu-item>
                  </el-upload>
                </el-submenu>
                <!--                <el-submenu index="2">-->
                <!--                  <template slot="title">预录取操作</template>-->
                <!--                  <el-menu-item index="2-1" @click="doEnroll">开始预录取</el-menu-item>-->
                <!--                  <el-menu-item index="2-2" @click="doAdjust">开始预调剂</el-menu-item>-->
                <!--                </el-submenu>-->
                <el-submenu index="2">
                  <template slot="title">录取和调剂</template>
                  <el-menu-item index="2-1" @click="doEnroll" :disabled = "!statePermissionTable.enrollable.includes($store.state.status)">开始录取</el-menu-item>
                  <el-menu-item index="2-2" @click="doAdjust" :disabled="!statePermissionTable.adjustable.includes($store.state.status)">执行调剂</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">导出结果</template>
                  <el-menu-item index="3-1" @click="downloadResult" class="el-icon-download" :disabled="!statePermissionTable.downloadable.includes($store.state.status)">导出最终录取结果</el-menu-item><br>
                  <el-menu-item index="3-2" @click="downloadExitQueue" class="el-icon-download" :disabled="!statePermissionTable.downloadable.includes($store.state.status)">导出退档结果</el-menu-item>
                </el-submenu>

              </el-menu>
            </el-header>
          </el-container>

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
               <span slot="title">系统概况</span>
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
    import {fileRequest} from "../../network/fileRequest";

    export default {
        name: "BackStageController",
        data(){
            return{
              state: 0,
              statePermissionTable: {
                //state 0 -> system initial
                //state 1 -> have major info but no stu
                //state 2 -> have major info and stu info -> 可以开始录取
                //state 3 -> finish admit （完成录取）
                //state 4 -> finish adjust can download
                uploadMajorInfo: [0],
                uploadStuInfo:[1],
                enrollable: [2],
                adjustable: [3],
                downloadable:[4]
              },
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            //for nav bar
            handleSelect(key, keyPath) {
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
              },
            getStatus(){
              this.$store.dispatch('getStatus')
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
                  this.$message.error(res.message);
                }
              }).catch(err => {
                this.$message.error('系统错误')
              })
            },
            // reset(){
            //   request({
            //     url: 'status/reset'
            //   }) .then( res => {
            //     if (res.code === '000'){
            //       this.$message.success('重置成功');
            //       this.getStatus();
            //       this.getLogList();
            //     } else {
            //       this.$message.error('重置失败');
            //     }
            //   }).catch(err => {
            //     this.$message.error('系统错误')
            //   })
            // },
            // formalReady(){
            //   request({
            //     url: 'student/formalReady'
            //   }) .then( res => {
            //     if (res.code === '000'){
            //       this.$message.success('成功');
            //       this.getStatus();
            //       this.getLogList();
            //     } else {
            //       this.$message.error('失败');
            //     }
            //   }).catch(err => {
            //     this.$message.error('系统错误')
            //   })
            // },
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
                  this.$message.error(res.message);
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
                  this.$message.error(res.message);
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
                    if(res.code !== '000')
                      this.$message.error(res.message)
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
                    if(res.code !== '000')
                      this.$message.error(res.message)
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

        }
    }
</script>

<style scoped lang="less">
    .el-menu.el-menu--horizontal{
      border-bottom: 0;

    }
    #back-stage-controller{
        min-height: 100%;

        background-color: rgba(9, 132, 217, .15);

        #back-stage-controller-header{
            height: 70px;
            background-color: rgb(9, 132, 217);
            position: fixed;
            z-index: 2000;
            width: 100%;
           #option-menu {
             float: left;

             //background-color: ;
           }
            #back-stage-header-text{
                text-align: center;
                width: 400px;
                padding-top: 10px;
                float: left;
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