<template>
  <div class="app-container">
    <el-divider content-position="left"><span class="title">查询</span></el-divider>
    <div class="query">
       <div class="input_box">
          <el-input
          v-model="queryList.title"
          placeholder="请输入优惠券名称"
          class="input fl"
          @keyup.enter.native="handleFilter"/>
          <!-- <el-date-picker
          class="picker fl"
            v-model="queryList.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="getData"
          ></el-date-picker> -->
       </div> 
       <div class="btn_box">
         <div>
           <el-button type="danger" @click="remove(2)">批量删除</el-button>
           <el-button type="primary" icon="el-icon-search" @click="getData">搜索</el-button>
           <el-button type="primary" @click="reset">重置</el-button>
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
      @selection-change="handleSelectionChange"
      style="width: 100%;">
      <!-- fit highlight-current-row -->
      <el-table-column
        align="center"
        type="selection"
        width="50">
     </el-table-column>
      <el-table-column label="劵码ID" prop="couponsId" fixed align="center" width="90px">
        <template slot-scope="scope">
          <span>{{ scope.row.couponsId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="优惠券名称" prop="title" fixed align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="优惠金额" prop="money" fixed align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.money }}</span>
        </template>
      </el-table-column>
      <el-table-column label="领取人数" prop="number" fixed align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="有效时间" prop="startdate" fixed align="center" width="340px">
        <template slot-scope="scope">
          <span>{{ scope.row.startdate + "~" + scope.row.enddate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="劵码量" prop="couponsNum" fixed align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.couponsNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" prop="audit_status" align="center">
        <template slot-scope="scope">
          <div style="width: 100%;margin-bottom: 7px;" v-if="scope.row.examine == 0"><el-button size="mini" type="success" @click="audit(scope.row)">审核通过</el-button></div>
          <div style="width: 100%;margin-bottom: 7px;"><el-button size="mini" type="primary" @click="compile(scope.row)">编辑</el-button></div>
         <div style="width: 100%;"><el-button size="mini" type="danger" @click="remove(scope.row)">删除</el-button></div>
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
                  <el-input v-model="itemObj.couponMoney" style="width:50%" placeholder="请输入优惠劵金额"></el-input>
              </el-form-item>
              <el-form-item label="有效期：" prop="couponMoney" style="width: 100%">
                 <el-date-picker
                    style="width:50%"
                    v-model="itemObj.time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="有效期开始"
                    end-placeholder="有效期结束"
                  ></el-date-picker>
              </el-form-item>
              <el-form-item label="使用说明：" prop="instructions" style="width: 100%">
                  <el-input type="textarea" v-model="itemObj.instructions" autosize maxlength="300" show-word-limit style="width:50%" placeholder="请输入使用说明"></el-input>
              </el-form-item>
          </el-form>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
       <el-button type="primary" :loading="loadingBootm" @click="itemEditDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { findYuyueCoupons , deleteYuyueCouponsById } from '@/api/guest/marketingList'
import Pagination from "@/components/Pagination"
export default {
  components: {
    Pagination
  },
  data() {
    return {
      dialogTitle: "",
      loadingBootm: false,
      editDialog: false,
      loading: false,
      itemArr: [],
      itemObj: {},
      rules: {
          username: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ]
      },
      data: {
        current_page: 1,
        data: [],
        last_page: 1,
        per_page: 10,
        total: 0,
        link: ""
      },
      auditList: [
        {
          name: '已审核',
          value: 1
        },
        {
          name: '未审核',
          value: 0
        }
      ],
      queryList: {
        title: null ,
        // time: ["" , ""]
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    audit(item){
      this.open2('确定审核通过？' , item.id)
    },
    open2(text,id) {
        this.$confirm(text, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateExamine({id}).then(res=>{
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
      this.editDialog = true
      this.itemObj = item
    },
    newlyIncreased(){
      this.editDialog = true
    },
    itemEditDialog(){
        var data = {}
      if(this.itemObj.id){
        data.id = this.itemObj.id
        data.name = this.itemObj.name
        data.alias = this.itemObj.alias
        updateYyChannel(data).then(res=>{
          if(res.code == 200){
            this.$message({
                type: 'success',
                message: '操作成功!'
            })
            this.getData()
            this.editDialog = false
          }else{
            this.$message({
                type: 'info',
                message: res.msg
            })
          }
        })
      }else{
        data.name = this.itemObj.name
        data.alias = this.itemObj.alias
        saveYyChannel(data).then(res=>{
          if(res.code == 200){
            this.$message({
                type: 'success',
                message: '操作成功!'
            })
            this.getData()
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
    handleSelectionChange(val) {
        this.itemArr = val
    },
    remove(item){
      if(item === 2){
        if(this.itemArr.length == 0){
          this.$message({
            type: 'info',
            message: '请选择数据！'
          })
          return
        }
        var arr = []
        this.itemArr.forEach(v=>{
          arr.push(v.couponsId)
        })
        this.open('确定批量删除？' , arr)
      }else{
        this.open('确定删除？' , [item.couponsId])
      }
    },
    open(text,id) {
        this.$confirm( text , '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          deleteYuyueCouponsById({ids: id}).then(res=>{
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
    getData(filter){
      this.loading = true
      let data = {}
      var queryList = this.queryList
      if (queryList.title) {
        data.title = queryList.title
      }
      // if (queryList.time[0] && queryList.time[1]) {
      //   data.startTime = queryList.time[0]
      //   data.endTime = queryList.time[1]
      // }
      if (filter && this.data.current_page > 1) {
        data.page = this.data.current_page;
      } else {
        this.data.current_page = 1;
      }
      data.pageNum = this.data.current_page
      data.pageSize = this.data.per_page
      findYuyueCoupons(data).then(res=>{
        // this.data = res;
        this.loading = false;
        if (!res.data || res.data.length <= 0) {
          this.$message("暂无数据~")
          this.data.data = []
        }
        if( res.data && res.data.length > 0){
          // console.log(res);
          this.data = res;
          this.data.current_page = res.pageNum
          this.data.per_page = res.pageSize
          this.data.total = res.total
          this.data.data.forEach(v=>{
            
          })
        }
      })
    },
    close(){
      this.itemObj = {}
    },
    handleFilter(){
      this.getData()
    },
    getPageData(e) {
      this.getData("page");
    },
    reset(){
      this.queryList = {
        name: null,
        time: ["" , ""]
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
