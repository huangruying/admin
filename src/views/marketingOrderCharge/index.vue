<template>
  <div class="app-container">
    <el-divider content-position="left"><span class="title">查询</span></el-divider>
    <div class="query">
       <div class="input_box">
          <el-input
          v-model="queryList.channelName"
          placeholder="请输入渠道名称"
          class="input fl"
          @keyup.enter.native="handleFilter"/>
          <el-input
          v-model="queryList.customerId"
          placeholder="请输入客户ID"
          class="input fl"
          @keyup.enter.native="handleFilter"/>
          <el-input
          v-model="queryList.belongOrg"
          placeholder="请输入发放机构ID"
          class="input fl"
          @keyup.enter.native="handleFilter"/>
          <el-input
          v-model="queryList.bindMemName"
          placeholder="请输入姓名"
          class="input fl"
          @keyup.enter.native="handleFilter"/>
          <el-input
          v-model="queryList.bindMemPhone"
          placeholder="请输入手机号"
          class="input fl"
          @keyup.enter.native="handleFilter"/>
       </div> 
       <div class="btn_box">
         <div>
           <el-button type="danger" @click="remove(2)">批量删除</el-button>
           <el-button type="primary" icon="el-icon-search" @click="getData">搜索</el-button>
           <el-button type="primary" @click="reset">重置</el-button>
         </div>
         <div class="btn_top">
            <div class="btn" :class="btnss == 1? 'click' : ''" @click="btn(1)">收费</div>
            <div class="btns" :class="btnss == 2? 'click' : ''" @click="btn(2)">不收费</div>
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
      @selection-change="handleSelectionChange"
      style="width: 100%;">
      <!-- fit highlight-current-row -->
      <el-table-column
        align="center"
        type="selection"
        width="50">
     </el-table-column>
      <el-table-column width="80" label="ID" prop="id" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户ID" prop="customerId" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.customerId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单ID" prop="orderId" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.orderId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="渠道商" prop="channelName" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.channelName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="goodsname" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.goodsname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发放机构ID" prop="belongOrg" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.belongOrg }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发放系统" prop="belongSys" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.belongSys }}</span>
        </template>
      </el-table-column>
      <el-table-column label="真实姓名" prop="bindMemName" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bindMemName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话号码" prop="bindMemPhone" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bindMemPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" prop="status" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right" prop="audit_status" align="center">
        <template slot-scope="scope">
           <el-button size="mini" type="primary" @click="lookOver(scope.row)">查看</el-button>
          <el-button size="mini" type="danger" @click="remove(scope.row)">删除</el-button>
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
      width="60%"
      @close="close"
      center>
        <el-divider content-position="left"><span class="title">基本信息</span></el-divider>
        <div class="query clearFix" style="padding-top:30px;margin-bottom:30px;">
          <el-form label-position="right" ref="ruleForm" label-width="150px" :model="itemObj" class="clearFix">
              <el-form-item label="客户ID：" prop="customerId" style="width: 100%">
                  <el-input v-model="itemObj.customerId" style="width:50%" disabled></el-input>
              </el-form-item>
              <el-form-item label="订单ID：" prop="orderId" style="width: 100%">
                  <el-input v-model="itemObj.orderId" style="width:50%" disabled></el-input>
              </el-form-item>
              <el-form-item label="发放机构ID：" prop="belongOrg" style="width: 100%">
                  <el-input v-model="itemObj.belongOrg" style="width:50%" disabled></el-input>
              </el-form-item>
              <el-form-item label="渠道商：" prop="channelName" style="width: 100%">
                  <el-input v-model="itemObj.channelName" style="width:50%" disabled></el-input>
              </el-form-item>
              <el-form-item label="真实姓名：" prop="bindMemName" style="width: 100%">
                  <el-input v-model="itemObj.bindMemName" style="width:50%" disabled></el-input>
              </el-form-item>
              <el-form-item label="发放系统：" prop="belongSys" style="width: 100%">
                  <el-input v-model="itemObj.belongSys" style="width:50%" disabled></el-input>
              </el-form-item>
          </el-form>
        </div>
        <el-divider content-position="left"><span class="title">商品详情</span></el-divider>
        <div class="query clearFix" style="padding-top:30px;margin-bottom:30px;">
            <el-table
              :data="[itemObj]"
              border
              stripe
              fit
              :row-class-name="tableRowClassName"
              style="width: 100%;">
              <el-table-column label="商品名称" prop="goodsname" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.goodsname }}</span>
                </template>
              </el-table-column>
              <el-table-column label="电话号码" prop="bindMemPhone" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.bindMemPhone }}</span>
                </template>
              </el-table-column>
              <el-table-column label="发放系统" prop="belongSys" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.belongSys }}</span>
                </template>
              </el-table-column>
              <el-table-column label="订单状态" prop="status" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.status }}</span>
                </template>
              </el-table-column>
            </el-table>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editDialog = false">返 回</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { findYyExchangelogInfos , delYyExchangelog } from '@/api/guest/marketingOrderCharge'
import Pagination from "@/components/Pagination"
export default {
  components: {
    Pagination
  },
  data() {
    return {
      editDialog: false,
      dialogTitle: "查看",
      loading: false,
      btnss: 2,
      itemArr: [],
      itemObj: {},
      data: {
        current_page: 1,
        data: [],
        last_page: 1,
        per_page: 10,
        total: 0,
        link: ""
      },
      queryList: {
        channelName: null,
        customerId: null,
        belongOrg: null,
        bindMemName: null,
        bindMemPhone: null
      },
      statusList: [
        {
          name: "待支付",
          value: 1
        },
        {
          name: "已支付",
          value: 2
        }
      ]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    btn(index){
      this.btnss = index
      if(index == 2){
        this.$router.push({name: "marketingOrderCharge"})
      }else{
        this.$router.push({name: "marketingOrder"})
      }
    },
    tableRowClassName({row, rowIndex}) {
        if (rowIndex === 0) {
          return 'warning-row';
        } else if (rowIndex === 1) {
          return 'success-row';
        }
        return '';
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
          arr.push(v.id)
        })
        this.open('确定批量删除？' , arr)
      }else{
        this.open('确定删除？' , [item.id])
      }
    },
    open(text,id) {
        this.$confirm( text , '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          delYyExchangelog({ids: id}).then(res=>{
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
      if (queryList.channelName) {
        data.channelName = queryList.channelName
      }
      if (queryList.customerId) {
        data.customerId = queryList.customerId
      }
      if (queryList.belongOrg) {
        data.belongOrg = queryList.belongOrg
      }
      if (queryList.bindMemName) {
        data.bindMemName = queryList.bindMemName
      }
      if (queryList.bindMemPhone) {
        data.bindMemPhone = queryList.bindMemPhone
      }
      if (filter && this.data.current_page > 1) {
        data.page = this.data.current_page;
      } else {
        this.data.current_page = 1;
      }
      data.pageNum = this.data.current_page
      data.pageSize = this.data.per_page
      findYyExchangelogInfos(data).then(res=>{
        // this.data = res;
        this.loading = false;
        if (!res.data || res.data.length <= 0) {
          this.$message("暂无数据~")
          this.data.data = []
        }
        if( res.data && res.data.length > 0){
          this.data = res;
          this.data.current_page = res.pageNum
          this.data.per_page = res.pageSize
          this.data.total = res.total
          this.data.data.forEach(v=>{
            if(v.status == 1){
                v.status = "待使用"
            }else if(v.status == 2){
                v.status = "已使用"
            }
          })
        }
      })
    },
    lookOver(item){
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
        channelName: null,
        customerId: null,
        belongOrg: null,
        bindMemName: null,
        bindMemPhone: null
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
.el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
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
.btn_top{
  display: flex;
  margin-bottom: 30px;
  .btn,.btns{
    width: 100px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #fff;
    border: 1px solid #ccc;
    margin-left: 10px;
    border-radius: 5px;
    font-size: 17px;
    cursor: pointer;
    &.click{
      background: #409eff;
      color: #fff;
    }
  }
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
