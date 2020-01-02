<template>
  <div class="cloudcontent" id="deposit">
    <!--搜索按钮-->
    <div class="topmain">
      <div class="seacher_box advancedsearch_box">
        <span>项目名称：</span>
        <el-input class="search" placeholder="请输入项目名称关键字" style="vertical-align: top"  v-model="searchForm.messageLike"></el-input>
        <span>投标人名称：</span>
        <el-input class="search" placeholder="请输入投标人名称" style="vertical-align: top"  v-model="searchForm.bidderNameLike"></el-input>
        <div class="handBtn" v-if="!showselect">
          <el-button  type="primary" class="search" @click="search">查询</el-button>
          <el-button  @click="reset">重置</el-button>
          <span @click="showselect = true" class="more">展开搜索条件</span>
        </div>
        <div class="advancedsearch" v-if="showselect">
          <el-form :model="searchForm" ref="searchForm" label-width="90px" :validate-on-rule-change="true">
            <el-row>
              <span>标段名称：</span>
              <el-input placeholder="请输入标段名称" v-model="searchForm.bidSectionNameLike" clearable></el-input>
              <span>&nbsp;&nbsp;&nbsp;项目编号：</span>
              <el-input placeholder="请输入项目编号" v-model="searchForm.projectCodeLike" clearable></el-input>
            </el-row>
          </el-form >
          <div class="handBtn">
            <el-button  type="primary" class="search" @click="search">查询</el-button>
            <el-button  @click="reset">重置</el-button>
            <span @click="showselect = false" class="more">收起搜索条件</span>
          </div>
        </div>
      </div>
    </div>
    <!--搜索按钮-->
    <div class="main">
      <el-table
        :data="tableData"
        border
        header-cell-class-name="tableheader">
        <el-table-column
          type="index"
          label="序号"
          align="center"
          :index="indexMethod"
          width="80">
        </el-table-column>
        <el-table-column
          prop="tenderProjectName"
          label="项目名称"
          width="300"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="tenderProjectCode"
          label="项目编号"
          width="300"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="bidSectionName"
          label="标段名称"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="投标人名称"
          class-name="merge_cell"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <p class="lineitem" v-for="(item, index) in scope.row.settlementItemList" :key="index">
              {{item.bidderName}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="待退还金额(元)"
          class-name="merge_cell"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <p class="lineitem" v-for="(item, index) in scope.row.settlementItemList" :key="index">
              {{item.returnAmount}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="操作" align="center" width="100"
          class-name="merge_cell">
          <template slot-scope="scope">
            <p class="lineitem" v-for="(item, index) in scope.row.settlementItemList" :key="index">
              <el-button type="text" size="small" @click="handleDetail(item.objectId)">查看</el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size='pageSize'
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange">
      </el-pagination>
      <!--分页-->
    </div>
  </div>
</template>
<script>
import {settlementGroup} from '@/api/project'

export default {
  name: '',
  data () {
    return {
      // 搜索form
      searchForm: {
        openingTimeType: 0
      },
      showselect: false, // 高级搜索显示隐藏
      // 当前页
      currentPage: 1,
      pageNo: 0,
      total: 0, // 总条数
      pageSize: 10, // 每页展示条数
      tableData: []
    }
  },
  methods: {
    // 序号
    indexMethod (index) {
      return index + (this.currentPage - 1) * this.pageSize + 1
    },
    // 重置
    reset () {
      this.searchForm = {}
      this.searchForm.openingTimeType = 0
      this.currentPage = 1
      this.pageNo = 0
      this.getData()
    },
    // 搜索
    search () {
      this.currentPage = 1
      this.pageNo = 0
      this.getData()
    },
    // 分页
    handleCurrentChange (nowNum) {
      this.currentPage = nowNum
      this.pageNo = (nowNum - 1) * this.pageSize
    },
    handleDetail (id) {
      this.$router.push({path: `/project/proSettlement/customDetails/depositReturn/${id}`, query: {text: '保证金'}})
    },
    getData () {
      settlementGroup.getUnReturnListByBidSection({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        messageLike: this.searchForm.messageLike,
        bidderNameLike: this.searchForm.bidderNameLike,
        bidSectionNameLike: this.searchForm.bidSectionNameLike,
        projectCodeLike: this.searchForm.projectCodeLike
      }).then((res) => {
        this.tableData = res.data.bidSectionList.list
        this.total = res.data.bidSectionList.total
      })
    }
  },
  mounted () {
    this.getData()
  },
  destroyed () {
  }
}
</script>

<style lang="less">
  #deposit{
    .merge_cell .cell{
      padding: 0;
    }
    .lineitem{
      width: 100%;
      border-bottom: 1px solid #EBEEF5;
      line-height: 32px;
      padding: 0 4px;
    }
    .lineitem:last-child{
      border-bottom: 0;
    }
  }
</style>
