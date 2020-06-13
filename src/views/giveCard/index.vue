<template>
  <div class="app-container giveCard">
     <el-divider content-position="left"><span class="title">导入会员</span></el-divider>
     <div class="query">
         <el-form label-position="right" ref="ruleForm" label-width="150px" :model="itemObj" class="clearFix">
            <el-form-item label="导入人数：" prop="type" style="width: 100%">
                <el-radio-group v-model="itemObj.type">
                  <el-radio :label="0">多人</el-radio>
                  <el-radio :label="1">个人</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="导入excel：" prop="orderno" style="width: 100%" v-if="itemObj.type === 0">
                <el-button type="info" @click="uploaddialogVisible = true">选择文件</el-button>
                <el-button type="info" plain @click="exportData">下载模板</el-button>
            </el-form-item>
            <el-form-item label="会员信息：" prop="bindMemName" style="width: 100%" v-if="itemObj.type === 1">
                <div class="demo-input-suffix"><span>姓名：</span><el-input style="width:200px;" placeholder="请输入姓名" v-model="itemObj.bindMemName"></el-input><span>电话号码：</span><el-input placeholder="请输入电话号码" style="width:200px;" v-model="itemObj.bindMemPhone"></el-input></div>
            </el-form-item>
            <el-form-item label="是否虚拟卡：" prop="virtualCard" style="width: 100%" v-if="false">
                <el-radio-group v-model="itemObj.virtualCard">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="会员卡：" prop="pid" style="width: 100%">
                <el-select v-model="itemObj.pid" filterable placeholder="请选择会员卡">
                    <el-option
                        v-for="item in options" 
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="截止日期：" prop="time" style="width: 100%">
                 <el-date-picker
                    v-model="itemObj.time"
                    type="daterange"
                    range-separator="至"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                ></el-date-picker>
            </el-form-item>
             <el-form-item>
                <el-button type="primary" :loading="loadingBootm" @click="submitForm('ruleForm')">确 定</el-button>
                <el-button @click="resetForm('ruleForm')">重 置</el-button>
            </el-form-item>
        </el-form>
     </div>

        <!--上传文件的弹窗-->
    <el-dialog :visible.sync="uploaddialogVisible" title="导入excel">
      <el-upload ref="upload" :auto-upload="false" :multiple="false" :on-change="handleChange" :on-remove="removeFile"
        :limit="1" :on-exceed="onExceed" action="" drag class="upload-demo">
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
import { findYyProductData, giveCard } from "@/api/guest/giveCard"
export default {
    data(){
        return{
            itemObj: {
                type: 0,
                virtualCard: 2,
                time: ["" , ""],
            },
            uploaddialogVisible: false,
            loadingBootm: false,
            fileList: null,
            options: [],
        }
    },
    mounted(){
        this.apiOptions()
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.loadingBootm = true
                var data = this.itemObj
                data.cardEffTime = data.time[0]
                data.cardInvTime = data.time[1]
                delete data.virtualCard
                if(this.fileList && data.type === 0){
                    var formData = new FormData()
                    formData.append('file', this.fileList.raw)
                    formData.append('cardEffTime', data.cardEffTime)
                    formData.append('cardInvTime', data.cardInvTime)
                    formData.append('pid', data.pid)
                    formData.append('type', data.type)
                    giveCard(formData).then(res=>{
                        this.loadingBootm = false
                        if(res.code == 200){
                            this.$message({
                                type: 'success',
                                message: `操作成功!`
                            })
                            this.itemObj = {
                                type: 0,
                                virtualCard: 2,
                                time: ["" , ""],
                                bindMemPhone: "",
                                bindMemName: "",
                                pid: null
                            }
                            this.fileList = null
                        }
                    })
                }else if(data.type === 0 && !this.fileList){
                    this.$message("导入多人请上传excel文件！")
                    this.loadingBootm = false
                }else{
                    delete data.time
                    giveCard(data).then(res=>{
                        this.loadingBootm = false
                        if(res.code == 200){
                            this.$message({
                                type: 'success',
                                message: `操作成功!`
                            })
                            this.itemObj = {
                                type: 0,
                                virtualCard: 2,
                                time: ["" , ""],
                                bindMemPhone: "",
                                bindMemName: "",
                                pid: null
                            }
                            this.fileList = null
                        }
                    })
                }
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        apiOptions(){
            findYyProductData().then(res=>{
                if(res.code == 200 && res.data){
                    this.options = res.data
                }else{
                    this.$message("会员卡资料获取失败！")
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleChange(file, fileList) {
            this.fileList = file
        },
        removeFile(file, fileList) {
            this.fileList = null
        },
        onExceed(){
            this.$message({
                message: '最多只能上传1个Excle文件!'
            })
        },
        uploadgoBack() {
            this.uploaddialogVisible = false
        },
        exportData(){
           window.location.href = `https://dot-bucket.oss-cn-shenzhen.aliyuncs.com/giveCard.xlsx`
        },
        submitImportExcel() {
            if (this.fileList) {
             this.$message({
                 type: 'success',
                 message: `文件已保存!`
             })
             this.uploaddialogVisible = false
            } else {
                this.$message({
                    message: '请选择Excle文件!'
                })
            }
        },
    }
}
</script>

<style lang="less" scoped>
 .upload-demo {
    text-align: center;
    padding: 0 100px;
  }
.demo-input-suffix{
    display: flex;
    align-items: center;
    >span{
        display: block;
        width: 80px;
        text-align: right;
    }
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
.avatar {
   width: 148px;
   height: 148px;
   border-radius: 4px;
   cursor: pointer;
 }
</style>