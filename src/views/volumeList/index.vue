<template>
  <div class="app-container">
    <el-divider content-position="left"><span class="title">查询</span></el-divider>
    <div class="query">
       <div class="input_box">
          <el-input
          v-model="queryList.couponName"
          placeholder="请输入券码名称"
          class="input fl"
          @keyup.enter.native="handleFilter"/>
          <el-input
          v-model="queryList.alias"
          placeholder="请输入别名"
          class="input fl"
          @keyup.enter.native="handleFilter"/>
          <el-input
          v-model="queryList.name"
          placeholder="请输入用户名"
          class="input fl"
          @keyup.enter.native="handleFilter"/>
          <!-- <el-select v-model="queryList.status" @change="getList" class="input fl" placeholder="状态">
            <el-option
              v-for="item in statusList"
              :label="item.name"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select> -->
          <el-date-picker
            class="input fl"
            style="width:360px"
            v-model="queryList.time"
            type="daterange"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="getData"
          ></el-date-picker>
       </div> 
       <div class="btn_box">
         <div>
           <el-button type="primary" icon="el-icon-search" @click="getData">搜索</el-button>
           <el-button type="primary" @click="reset">重置</el-button>
           <el-button type="primary" @click="importExcel">导入</el-button>
           <el-button type="primary" @click="exportData">导出</el-button>
         </div>
         <div>
           <el-button type="primary" @click="newlyIncreased">新增</el-button>
           <el-button type="primary" icon="el-icon-refresh" @click="resetGetData"></el-button>
         </div>
       </div>
    </div>
    <el-table
      v-loading="loading"
      :data="data.data"
      border
      stripe
      fit
      style="width: 100%;">
      <!-- fit highlight-current-row -->
      <el-table-column label="券码名称" prop="couponName" fixed align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.couponName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="别名" prop="alias" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.alias }}</span>
        </template>
      </el-table-column>
      <el-table-column label="金额" prop="couponMoney" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.couponMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column label="券码类型" prop="dotType" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dotType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务类型" prop="dotsType" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dotsType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" prop="name" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="type" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type? "未过期": "已过期" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="使用说明" prop="content" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="有效时间" prop="failureTime" align="center" width="340px">
        <template slot-scope="scope">
          <span>{{ scope.row.effectTime }}</span> &nbsp;&nbsp; ~ &nbsp;&nbsp; <span>{{ scope.row.failureTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" align="center" width="170px">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right" prop="audit_status" align="center">
        <template slot-scope="scope">
          <div style="width: 50%;padding:0 0 7px 7px; float: left;"><el-button size="mini" type="primary" @click="compile(scope.row)" v-if="scope.row.type">编辑</el-button></div>
          <div style="width: 50%;padding:0 0 7px 0; float: left;"><el-button size="mini" type="danger" @click="remove(scope.row)">删除</el-button></div>
          <div style="width: 50%;padding:0 0 7px 7px; float: left;"><el-button size="mini" type="success" @click="audit(scope.row)" v-if="scope.row.type">生成券码</el-button></div>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="data.total>0"
      :total="data.total"
      :page.sync="data.current_page"
      :limit.sync="data.per_page"
      @pagination="getPageData"
    />

    <!-- 新增编辑 -->
    <el-dialog
      :title="dialogTitle"
      :close-on-click-modal="false"
      :visible.sync="editDialog"
      width="50%"
      @close="close"
      center>
        <el-divider content-position="left"><span class="title">基本信息</span></el-divider>
        <div class="query clearFix" style="padding-top:30px;margin-bottom:30px;">
          <el-form label-position="right" ref="ruleForm" :rules="rules" label-width="150px" :model="itemObj" class="clearFix">
              <el-form-item label="优惠劵名称：" prop="couponName" style="width: 100%">
                  <el-input v-model="itemObj.couponName" style="width:50%" placeholder="请输入优惠劵名称"></el-input>
              </el-form-item>
              <el-form-item label="优惠劵金额：" prop="couponMoney" style="width: 100%">
                  <el-input v-model="itemObj.couponMoney" style="width:50%" placeholder="请输入优惠劵金额" :disabled="disabledPrice" ></el-input>
              </el-form-item>
              <el-form-item :label="itemPicker" prop="failureTime" style="width: 100%" v-show="!period">
                 <el-date-picker
                    style="width:50%"
                    v-model="itemObj.time"
                    type="daterange"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                    range-separator="至"
                    start-placeholder="有效期开始"
                    end-placeholder="有效期结束"
                    :picker-options="pickerOptions"
                    @blur="changePicker"
                  ></el-date-picker>
              </el-form-item>
              <el-form-item :label="itemPicker" prop="failureTime" style="width: 100%" v-show="period">
                  <el-date-picker
                    v-model="itemObj.failureTime"
                    type="datetime"
                    default-time="23:59:59"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :picker-options="pickerOptions2"
                    placeholder="有效期结束">
                  </el-date-picker>
                  <!-- <div class="color_period">可以延长有效期，严禁缩短有效期!</div> -->
              </el-form-item>
              <el-form-item label="使用说明：" prop="content" style="width: 100%">
                  <el-input type="textarea" v-model="itemObj.content" autosize maxlength="300" show-word-limit style="width:50%" placeholder="请输入使用说明"></el-input>
              </el-form-item>
          </el-form>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
       <el-button type="primary" :loading="loadingBootm" @click="itemEditDialog">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 生成券码 -->
    <el-dialog
      title="确定生成券码?"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <div class="clearFix">
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
          <el-form-item prop="carwashId" label="一级分类" :rules="[{ required: true, message: '请选择一级分类', trigger: 'blur' }]">
            <el-select v-model="dynamicValidateForm.carwashId" @change="menuTwoList" class="input fl" placeholder="请选择一级分类">
              <el-option
                v-for="item in menuList"
                :label="item.dotType"
                :value="item.id"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="carwashsId" label="二级分类" :rules="[{ required: true, message: '请选择二级分类', trigger: 'blur' }]">
            <el-select v-model="dynamicValidateForm.carwashsId" class="input fl" placeholder="请选择二级分类">
              <el-option
                v-for="item in menu2List"
                :label="item.dotType"
                :value="item.id"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="numberCode" label="券码数量" :rules="[{ required: true, message: '请输入生成券码数量', trigger: 'blur' },{ pattern: /^[1-9]\d*|0$/, trigger: 'blur' , message: '请输入正整数'}]">
            <el-input
              type="number"
              placeholder="请输入生成券码数量"
              v-model.number="dynamicValidateForm.numberCode"
              :max="100"
              :min="0"
              class="inputNumber"
              @mousewheel.native.prevent
            >
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getCouponCode">确 定</el-button>
      </span>
    </el-dialog>
    <!--上传文件的弹窗-->
    <el-dialog :visible.sync="uploaddialogVisible" :close-on-click-modal="false" title="导入数据">
      <el-select v-model="facilitatorId" class="input fl" placeholder="导入请选择服务商">
            <el-option
              v-for="item in statusInfoList"
              :label="item.name"
              :value="item.id"
              :key="item.value"
            ></el-option>
      </el-select>

      <el-upload ref="upload" :auto-upload="false" :multiple="false" :on-change="handleChange" :on-remove="removeFile"
        :limit="1" action="" drag class="upload-demo">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadgoBack">返 回</el-button>
        <el-button type="primary" @click="submitImportExcel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { findGeneralCoupon , batchCouponImport , findCompanyInfos , delGeneralCouponById , saveGeneralCoupon , modifyGeneralCouponById , findCarwashType , generateGeneralCouponcode } from '@/api/volumeList'
import Pagination from "@/components/Pagination"
export default {
  components: {
    Pagination
  },
  data() {
    var storePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('不能为空！'));
        } else {
          let reg = /^1[0-9]{10}$/
          if (!reg.test(value)) {
            callback(new Error('请输入正确的手机号！'));
          }else{
            callback()
          } 
        }
    };
    const dar = this
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      pickerOptions2: {
         // disabledDate是一个函数,参数是当前选中的日期值,这个函数需要返回一个Boolean值,
        disabledDate(time) {
          return time.getTime() < new Date(dar.failureTime).getTime();
        }
      },
      itemPicker: "有效期：",
      facilitatorId: null,
      failureTime: "",
      dotCode: "",
      dialogTitle: "",
      thishostName: '',
      fileList: "",
      itemId: null,
      dynamicValidateForm: {},
      centerDialogVisible: false,
      disabledPrice: true,
      period: false,
      uploaddialogVisible: false,
      loadingBootm: false,
      urlBl: false,
      alterDisabled: false,
      inputDisabled: false,
      passRadio: null,
      loading: false,
      passDialog: false,
      editDialog: false,
      itemObj: {
        openingBank: false,
        time:[]
      },
      rules: {
          username: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ]
      },
      data: {
        current_page: 1,
        data: [],
        last_page: 1,
        per_page: 15,
        total: 0,
        link: ""
      },
      queryList: {
        couponName: null,
        couponCode: null,
        name: null,
        alias: null,
        status: null,
        time: ["", ""],
      },
      statusList: [
        {
          name: '已过期',
          value: 0
        },
        {
          name: '未使用',
          value: 1
        },
        {
          name: '已使用',
          value: 2
        },
      ],
      statusInfoList: [],
      menuList: [],
      menu2List: []
    }
  },
  created() {
    this.selectInfo()
    this.getData()
    this.thishostName = `${location.protocol}//${location.hostname}`
  },
  methods: {
    getCouponCode(){
      this.$refs['dynamicValidateForm'].validate((valid) => {
          if (valid){
            var data = this.dynamicValidateForm
            data.generalId = this.itemId
            generateGeneralCouponcode(data).then(res=>{
              console.log(res);  // 数据待接口
            })
          }
      })
    },
    menuTwoList(){
      findCarwashType({carwashId: this.carwashId}).then(res=>{
        // console.log(res); 数据出错，后台修改中
      })
    },
    audit(item){
      this.itemId = item.id
      this.centerDialogVisible = true
      findCarwashType().then(res=>{
        if(res.code == 200){
          this.menuList = res.data
        }else{
          this.$message("服务器数据格出了小问题哦！")
        }
      })
    },
    newlyIncreased(){
      this.itemPicker = "有效期："
      this.editDialog = true
      this.period = false
      this.disabledPrice = false
    },
    changePicker(){
      this.$forceUpdate()
    },
    remove(item){
      this.open('确定删除？' , item.id)
    },
    open(text,id) {
        this.$confirm( text , '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          delGeneralCouponById({id: id}).then(res=>{
            if(res.code == 200){
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.getData()
            }else{
              this.$message({
                type: 'info',
                message: res.msg
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    },
    compile(item){
      this.itemPicker = "有效期结束："
      this.editDialog = true
      this.disabledPrice = true
      this.period = true
      this.itemObj = item
      this.itemObj.time = [item.effectTime , item.failureTime]
      this.failureTime = item.failureTime
    },
    itemEditDialog(){
       var data = {}
        data.couponName = this.itemObj.couponName
        data.couponMoney = this.itemObj.couponMoney
        data.content = this.itemObj.content
      if(this.itemObj.id){
        data.effectTime = this.itemObj.effectTime
        data.failureTime = this.itemObj.failureTime
        data.id = this.itemObj.id
        // console.log(data);
        modifyGeneralCouponById(data).then(res=>{
          if(res.code == 200){
            this.$message({
                type: 'success',
                message: '操作成功!'
            })
            this.editDialog = false
          }else{
            this.$message({
                type: 'info',
                message: res.msg
            })
          }
        })
      }else{
        if(this.itemObj.time[0] && this.itemObj.time[1]) {
          data.effectTime = this.itemObj.time[0]
          data.failureTime = this.itemObj.time[1]
        }
        saveGeneralCoupon(data).then(res=>{
          if(res.code == 200){
            this.$message({
                type: 'success',
                message: '操作成功!'
            })
            this.editDialog = false
          }else{
            this.$message({
                type: 'info',
                message: res.msg
            })
          }
        })
      }
    },
    close(){
      this.itemObj = {}
      this.getData()
      this.failureTime = ""
    },
    async selectInfo(){
      var res = await findCompanyInfos()
      this.statusInfoList = res.data
    },
    exportData(){
      if(this.data.data.length <= 0){
        this.$message({
            message: '暂无数据可导出~',
            type: 'warning'
          })
      }else{
          var {couponName,couponCode,name,alias,status,time} = this.queryList
          var startTime = time[0]
          var endTime = time[1]
          window.location.href = `http://mp.yuyuetrip.com.cn/wash/generalCouponExport?pageNum=${this.data.current_page}&pageSize=${this.data.per_page}
          &couponName=${couponName}&couponCode=${couponCode}&name=${name}&alias=${alias}&status=${status}&startTime=${startTime}&endTime=${endTime}`
      }
    },
    submitImportExcel() {
      if(!this.facilitatorId){
        this.$message({
          type: "warning",
          message: "请选择服务商"
        })
      }else{
        if (this.fileList) {
          this.uploaddialogVisible = false
          var formData = new FormData()
          formData.append('file', this.fileList[0].raw)
          formData.append('id', this.facilitatorId)
          batchCouponImport(formData).then(res => {
            // console.log(res);
            this.getData()
            this.$message({
              type: 'success',
              message: `上传成功!`
            })
          })
        } else {
          this.$message({
            message: '请选择Excle文件!'
          })
        }
      }
    },
    importExcel() {
        this.fileList = null
        this.uploaddialogVisible = true
        this.$nextTick((i) => {
          this.$refs.upload.clearFiles()
        })
    },
    uploadgoBack() {
        this.uploaddialogVisible = false
    },
    removeFile(file, fileList) {
        this.fileList = null
    },
    handleChange(file, fileList) {
        this.fileList = fileList
    },
    getList(data){
      this.getData()
    },
    // 比较是否超过当前时间，后台懒得做，严格上讲时间戳在后台生成是比较好的
    isThreeHourAgo(time) {
      const now = Date.now()
      const d = new Date(time)
      const secDiff = (now - d) / 1000
      return secDiff > 3 * 60 * 60
    },
    getData(filter){
      this.loading = true
      let data = {}
      var queryList = this.queryList
      if (queryList.couponName) {
        data.couponName = queryList.couponName
      }
      if (queryList.couponCode) {
        data.couponCode = queryList.couponCode   
      }
      if (queryList.name) {
        data.name = queryList.name   
      }
      if (queryList.alias) {
        data.alias = queryList.alias   
      }
      // console.log(queryList.status);
      if(!(queryList.status == null)){
        data.status = queryList.status
      }
      if (queryList.time && queryList.time[0] && queryList.time[1]) {
        data.startTime = queryList.time[0]
        data.endTime = queryList.time[1]
      }
      if (filter && this.data.current_page > 1) {
        data.page = this.data.current_page;
      } else {
        this.data.current_page = 1;
      }
      // data.username = this.$store.state.user.name
      data.pageNum = this.data.current_page
      data.pageSize = this.data.per_page
      findGeneralCoupon(data).then(res=>{
        this.data = res;
        this.loading = false;
        if (res.msg == "暂无数据") {
          this.$message("暂无数据~")
          this.data = {
              current_page: 1,
              data: [],
              last_page: 1,
              per_page: 10,
              total: 0,
              link: ""
            }
        }
        if(res.data && res.data.length > 0){
          this.data.current_page = res.pageNum
          this.data.per_page = res.pageSize
          this.data.total = res.total
          this.data.data.forEach(v=>{
            var blDate = this.isThreeHourAgo(v.failureTime)
            if(!blDate){
              v.type = true
            }else{
              v.type = false
            }
          })
        }
      })
    },
    handleFilter(){
      this.getData()
    },
    getPageData(e) {
      this.getData("page");
    },
    reset(){
      this.queryList = {
        couponName: null,
        couponCode: null,
        name: null,
        alias: null,
        status: null,
        time: ["", ""],
      }
    },
    resetGetData(){
      this.reset()
      this.getData()
    },
  }
}
</script>

<style lang="less" scoped>
/* element样式重置 start */
 // 处理input type = number的上下箭头
 @import "../../styles/cascader.css";
.inputNumber{
  width: 200px;
  margin-left: 20px;
}
/deep/.el-date-editor .el-range-input{
  width: auto;
}
.title{
  font-size: 18px;
  font-weight: 600;
}
/deep/.el-dialog__header{
  background: #f8f8f8;
}
/deep/.el-divider--horizontal{
  margin: 0;
}
.query{
  width: 100%;
  border: 1px solid #DCDFE6;
  border-top: none;
  padding-top: 10px;
  padding-bottom: 20px;
}
.input{
  width: 200px;
  margin-left:20px;
  margin-top: 10px;
}
.picker{
  width: 250px;
  margin-left:20px;
  margin-top: 10px;
}
.btn_box{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 0;
}
/deep/.el-table .warning-row {
    background: oldlace;
  }

/deep/.el-table .success-row {
    background: #f0f9eb;
}
.center{
  display: block;
  align-items: center;
  display: flex;
  justify-content: center;
}
// .fl{
//   float: left;
//   }
// .fr{
//   float: right;
//   }
/deep/.el-form-item{
  float: left;
}
.clearFix::before,
.clearFix::after{
      content: "";
      display: block;
      visibility: hidden;
      height: 0;
      line-height: 0;
      clear: both;
}
.boxUpload{   
    .textUp{
      position: relative;
      float: left;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 4.5%;
      margin-top: 3%;
      margin-left: 3%;
      .uploadTransparency{
          display: block;
          width: 150px;
          height: 100px;
          opacity: 0;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 999;
        }
      .text{
        margin-top: 5px;
      }
      .btn{
        margin-top: 3px;
      }
    }
}
.avatar-uploader .el-upload:hover {
   border-color: #409EFF;
 }
 .avatar-uploader-icon {
   border: 1px dashed #DFDFDF;
   border-radius: 6px;
   cursor: pointer;
   position: relative;
   overflow: hidden;
   font-size: 12px;
   color: #8c939d;
   width: 150px;
   height: 100px;
   line-height: 100px;
   text-align: center;
 }
 .avatar {
   width: 150px;
   height: 100px;
   display: block;
 }
  .upload-demo {
    text-align: center;
    padding: 0 100px;
  }
  .info{
    width: 300px;
    .infoItem{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: .5rem;
      .left,.right{
        flex-shrink: 0;
        max-width: 50%
      }
      .left{
        font-weight: bold
      }
    }
  }
</style>
