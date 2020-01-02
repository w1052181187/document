<template>
  <div class="cloudcontent">
    <div class="topmain">
      <div class="seacher_box">
        <span>投标人名称：</span>
        <el-input class="search" placeholder="请输入内容" style="vertical-align: top"  v-model="queryModel.messageLike"></el-input>
        <div class="handBtn">
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </div>
      </div>
    </div>
    <div class="main">
      <!--表格-->
      <div class="content_tablebox">
        <template>
          <el-table
            :data="list"
            border
            style="width: 100%" header-cell-class-name="tableheader">
            <el-table-column
              type="index"
              label="序号"
              width="60px"
              :index="computedIndex"
              align="center">
            </el-table-column>
            <el-table-column
              prop="name"
              :formatter="simpleFormatData"
              label="投标人名称"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="contactName"
              :formatter="simpleFormatData"
              label="联系人"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="contactNumber"
              :formatter="simpleFormatData"
              label="联系电话"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="contactEmail"
              label="电子邮箱"
              :formatter="simpleFormatData"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="joinProjectNumber"
              label="参与项目数量"
              :formatter="simpleNumFormatData"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="bidWinningNumber"
              label="中标数量"
              :formatter="simpleNumFormatData"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="操作" align="center" width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleProjectList(scope.row)">项目列表</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <!--表格-->
      <!--分页-->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="page.total"
        :page-size='page.pageSize'
        :current-page.sync="page.currentPage"
        @current-change="handlePageChange"
        @next-click="handlePageNext">
      </el-pagination>
      <!--分页-->
    </div>
  </div>
</template>
<script>
import {bidder} from '@/api/project'

export default {
  components: {
  },
  data () {
    return {
      page: {
        pageSize: 10,
        pageNo: 0,
        total: 0, // 总条数
        currentPage: 1
      },
      queryModel: {
        messageLike: ''
      },
      // 表格数据
      list: [{}]
    }
  },
  methods: {
    // 搜索
    search () {
      this.page = {
        pageSize: 10,
        pageNo: 0,
        total: 0, // 总条数
        currentPage: 1
      }
      this.queryUserList()
    },
    reset () {
      this.queryModel.messageLike = ''
      this.queryUserList()
    },
    // 列表数据
    queryUserList () {
      this.loading = true
      this.queryModel.pageNo = this.page.pageNo
      this.queryModel.pageSize = this.page.pageSize
      this.queryModel.enterpriseId = this.$store.getters.authUser.enterpriseId
      bidder.getBidderList(this.queryModel).then((res) => {
        if (res.data.resCode === '0000') {
          this.list = res.data.bidderList.list
          this.page.total = res.data.bidderList.total
        }
      })
    },
    // 分配角色成功
    // 普通格式化数据，空的时候展示"---"
    simpleFormatData (row, col, cellValue) {
      return cellValue || '---'
    },
    simpleNumFormatData (row, col, cellValue) {
      return cellValue || '0'
    },
    // 序号计算
    computedIndex (index) {
      return index + (this.page.currentPage - 1) * this.page.pageSize + 1
    },
    // 表单分页
    handlePageChange (nowNum) {
      this.page.currentPage = nowNum
      this.page.pageNo = (nowNum - 1) * this.page.pageSize
      this.queryUserList(parseInt(this.page.pageNo), parseInt(this.page.pageSize))
    },
    handlePageNext (nowNum) {
      this.page.currentPage = nowNum
      this.page.pageNo = (nowNum - 1) * this.page.pageSize
      this.queryUserList(parseInt(this.page.pageNo), parseInt(this.page.pageSize))
    },
    handleProjectList (row) {
      this.$router.push({path: `/resource/bidder/list`, query: {bidderId: row.objectId}})
    }
  },
  mounted () {
    this.queryUserList()
  }
}
</script>
<style lang="less">
  #cloud_users {
    .main .el-form-item__label{
      padding: 0 12px 0 0;
    }
  }
</style>
