<template>
  <div class="cloudcontent" id="cloud_department">
    <div class="topmain">
      <div class="seacher_box">
        <span>部门名称：</span>
        <el-input class="search" placeholder="请输入部门名称" style="vertical-align: top"  v-model="filterDepartment">
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <!--<div class="handBtn">-->
          <!--<el-button type="primary" @click="search">查询</el-button>-->
          <!--<el-button @click="reset">重置</el-button>-->
        <!--</div>-->
      </div>
    </div>
    <div class="main">
      <div class="organ_conleft_tree">
        <tree @handleNodeClick="clickDeparment" :filterText="filterDepartment"></tree>
      </div>
      <div class="organ_conright_tablebox">
        <div class="organ_conright_tablebottom">
          <el-table
            :data="users"
            border
            v-loading="userLoading"
            style="width: 100%" header-cell-class-name="tableheader">
            <el-table-column
              type="index"
              label="序号"
              width="60px"
              :index="computedIndex"
              align="center">
            </el-table-column>
            <el-table-column
              prop="account"
              :formatter="simpleFormatData"
              label="用户名"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="name"
              :formatter="simpleFormatData"
              label="姓名"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="cellPhone"
              :formatter="simpleFormatData"
              label="联系电话"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="departmentListNames"
              :formatter="simpleFormatData"
              label="所属部门"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </div>
        <!--分页-->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page.total"
          :page-size='page.pageSize'
          :current-page.sync="page.currentPage"
          @current-change="handlePage"
          @next-click="handlePage">
        </el-pagination>
        <!--分页-->
      </div>
    </div>
  </div>
</template>
<script>
import tree from './tree/edit_tree'
import {extend} from '../../../assets/js/common'
import {user} from '@/api/system'
export default {
  components: {
    tree
  },
  data () {
    return {
      userLoading: false,
      page: {
        pageSize: 10,
        pageNo: 1,
        total: 0, // 总条数
        currentPage: 1
      },
      // 表格数据
      users: [],
      departmentId: null,
      filterDepartment: ''
    }
  },
  methods: {
    // 右侧用户表格数据
    queryUserList (params) {
      this.userLoading = true
      let queryModel = {
        enterpriseId: this.$store.getters.authUser.enterpriseId,
        isDelete: 0,
        pageNum: this.page.pageNo,
        pageSize: this.page.pageSize,
        departmentId: this.departmentId,
        type: 2,
        treeMode: 1
      }
      extend(queryModel, params)
      user.queryListWithDptList(queryModel).then((res) => {
        this.userLoading = false
        this.users = res.data.data
        this.page.total = res.data.page.totalRows
      })
    },
    clickDeparment (id) {
      this.departmentId = id
    },
    // 普通格式化数据，空的时候展示"---"
    simpleFormatData (row, col, cellValue) {
      return cellValue || '---'
    },
    // 序号计算
    computedIndex (index) {
      return index + (this.page.currentPage - 1) * this.page.pageSize + 1
    },
    // 表单分页
    handlePage (nowNum) {
      this.page.currentPage = nowNum
      this.page.pageNo = nowNum
      this.queryUserList()
    }
  },
  watch: {
    departmentId () {
      this.queryUserList()
    }
  },
  mounted () {
    this.queryUserList()
  }
}
</script>
<style lang="less">
  #cloud_department {
    .organ_conleft_tree{
      width: 30%;
      float: left;
      overflow: hidden;
      margin: 0px 2% 0 0px;
    }
    .organ_conright_tablebox{
      width: 68%;
      overflow: hidden;
      float: left;
      margin: 10px 0 0 0;
    }
  }
</style>
