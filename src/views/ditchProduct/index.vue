<template>
  <div class="app-container">
    <el-divider content-position="left"><span class="title">查询</span></el-divider>
    <div class="query">
       <div class="input_box">
          <el-input
          v-model="queryList.name"
          placeholder="请输入产品名称"
          class="input fl"
          @keyup.enter.native="handleFilter"/>
          <el-select v-model="queryList.isPay" @change="getData" class="input fl" placeholder="是否需要支付">
            <el-option
              v-for="item in statusList"
              :label="item.name"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
       </div> 
       <div class="btn_box">
         <div>
           <el-button type="primary" icon="el-icon-search" @click="getData">搜索</el-button>
           <el-button type="primary" @click="reset">重置</el-button>
         </div>
         <div>
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
      <el-table-column label="用户id" prop="uid" fixed align="center" width="80PX">
        <template slot-scope="scope">
          <span>{{ scope.row.uid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品名称" prop="name" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品简介" prop="desc" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.desc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" prop="price" align="center" width="80PX">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否需要支付" prop="isPay" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.isPay == 0? '需支付' : '不需支付' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="dateline" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dateline }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" prop="updatetime" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updatetime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="置顶时间" prop="topdateline" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.topdateline }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right" prop="audit_status" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="compile(scope.row)">查询</el-button>

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
    <!-- 查看 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="editDialog"
      width="50%"
      @close="close"
      center>
      <el-form label-position="right" ref="ruleForm" :rules="rules" label-width="150px" :model="itemObj" class="clearFix">
           <!-- <span class="title">账号信息</span> -->
           <el-form-item label="订单编号:" prop="orderNo" style="width:50%">
              <el-input v-model="itemObj.orderNo" style="width:80%" disabled></el-input>
           </el-form-item>
           <el-form-item label="车行名称:" prop="dotName" style="width:50%">
              <el-input v-model="itemObj.dotName" style="width:80%" disabled></el-input>
           </el-form-item>
           <el-form-item label="车行联系人:" prop="shopowner" style="width:50%">
              <el-input v-model="itemObj.shopowner" style="width:80%" disabled></el-input>
           </el-form-item>
           <el-form-item label="车行联系人电话:" prop="phone" style="width:50%">
              <el-input v-model="itemObj.phone" style="width:80%" disabled></el-input>
           </el-form-item>
           <el-form-item label="车行地址:" prop="address" style="width:50%">
              <el-input v-model="itemObj.address" style="width:80%" disabled></el-input>
           </el-form-item>
           <!-- <el-form-item label="品牌车系:" prop="brandCar" style="width:50%">
              <el-input v-model="itemObj.brandCar" style="width:80%" disabled></el-input>
           </el-form-item> -->
           <el-form-item label="车牌号:" prop="licensePlate" style="width:50%">
              <el-input v-model="itemObj.licensePlate" style="width:80%" disabled></el-input>
           </el-form-item>
           <el-form-item label=" 手机号:" prop="phone" style="width:50%">
              <el-input v-model="itemObj.phone" style="width:80%" disabled></el-input>
           </el-form-item>
           <el-form-item label=" 订单状态:" prop="orderStatusCopy" style="width:50%">
              <el-input v-model="itemObj.orderStatusCopy" style="width:80%" disabled></el-input>
           </el-form-item>
           <el-form-item label=" 订单来源:" prop="orderSource" style="width:50%">
              <el-input v-model="itemObj.orderSource" style="width:80%" disabled></el-input>
           </el-form-item>
           <el-form-item label=" 项目名称:" prop="projectName" style="width:50%">
              <el-input v-model="itemObj.projectName" style="width:80%" disabled></el-input>
           </el-form-item>
           <el-form-item label=" 应收金额:" prop="money" style="width:50%">
              <el-input v-model="itemObj.money" style="width:80%" disabled></el-input>
           </el-form-item>
           <el-form-item label=" 预约时间:" prop="appointmentTime" style="width:50%">
              <el-input v-model="itemObj.appointmentTime" style="width:80%" disabled></el-input>
           </el-form-item>
           <el-form-item label=" 下单时间:" prop="placeTime" style="width:50%">
              <el-input v-model="itemObj.placeTime" style="width:80%" disabled></el-input>
           </el-form-item>
           <el-form-item label=" 是否对账:" prop="reconciliationCopy" style="width:50%">
              <el-input v-model="itemObj.reconciliationCopy" style="width:80%" disabled></el-input>
           </el-form-item>
       </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" :loading="loadingBootm" @click="editDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { findYuyueProductInfo } from '@/api/guest/ditchProduct'
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
            callback();
          } 
        }
    };
    return {
      dotCode: "",
      dialogTitle: "",
      thishostName: '',
      loadingBootm: false,
      urlBl: false,
      alterDisabled: false,
      inputDisabled: false,
      passRadio: null,
      loading: false,
      passDialog: false,
      editDialog: false,
      itemObj: {},
      rules: {
          username: [
            { required: true, message: '不能为空', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
          ],
          dotType: [
            { required: true, message: '请选择类型', trigger: 'change' }
          ],
          dotName: [
            { required: true, message: '不能为空', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { validator: storePhone, trigger: 'blur' }
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
      queryList: {
        name: null,
        isPay: null
      },
      statusList: [
        {
          name: '需支付',
          value: 0
        },
        {
          name: '不需支付',
          value: 1
        }
      ]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    reconciliation(item){
       this.open(item.orderNo)
    },
    open(orderNo) {
        this.$confirm('确定对账?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateReconciliationByOrderNo({orderNo}).then(res=>{
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
      if (queryList.name) {
        data.name = queryList.name
      }
      if(!(queryList.isPay == null)){
        data.isPay = queryList.isPay
      }
      if (filter && this.data.current_page > 1) {
        data.page = this.data.current_page;
      } else {
        this.data.current_page = 1;
      }
      // data.username = this.$store.state.user.name
      data.pageNum = this.data.current_page
      data.pageSize = this.data.per_page
      findYuyueProductInfo(data).then(res=>{
        // this.data = res;
        this.loading = false;
        if (!res.data || res.data.length <= 0) {
          this.$message("暂无数据~")
          this.data.data = []
        }
        if( res.data && res.data.length > 0){
          console.log(res);
          this.data = res;
          this.data.current_page = res.pageNum
          this.data.per_page = res.pageSize
          this.data.total = res.total
          this.data.data.forEach(v=>{
            if(v.orderStatus == 0){
              v.orderStatusCopy = '未支付'
            }else{
              v.orderStatusCopy = '已支付'
            }
            if(v.reconciliation == 0){
              v.reconciliationCopy = '未对账'
            }else if(v.reconciliation == 1){
              v.reconciliationCopy = '已对账'
            }
          })
        }
      })
    },
    compile(item){
      this.dialogTitle = "查看"
      this.itemObj = item
      this.editDialog = true
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
        isPay: null
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
</style>
