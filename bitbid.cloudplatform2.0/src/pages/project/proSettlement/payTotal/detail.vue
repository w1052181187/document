<template>
  <div class="cloudcontent" id="cloud_customer_detail" :loading="loading">
    <div class="main">
      <div class="tit">
        <span>{{tenderProjectName}}<i>（项目编号：{{projectCode}}）</i></span>
      </div>
      <el-table
        :data="feeTableData"
        border
        style="width: 100%; margin-top: 20px;"
        :row-key="getRowKeys"
        :expand-row-keys="expendRowKeys"
        @expand-change="expandSelect"
        header-cell-class-name="tableheader">
        <el-table-column
          prop="name"
          label=""
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="income"
          label="收入（元）"
          align="right"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="spending"
          label="支出（元）"
          align="right"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="netIncome"
          label="净利润（元）"
          align="right"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import {tenderProject, settlementStatistical} from '@/api/project'
export default {
  data () {
    return {
      expendRowKeys: [],
      loading: false,
      // 费用
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      feeTableData: [],
      // 当前页
      currentPage: 1,
      pageNo: 0,
      total: null, // 总条数
      pageSize: 10, // 每页展示条数
      tenderSystemCode: this.$route.query.tenderSystemCode,
      tenderProjectName: '',
      projectCode: '',
      // 获取row的key值
      getRowKeys (row) {
        return row.code
      }
    }
  },
  created () {
    this.getTenderProjectName()
    this.getTableData()
  },
  methods: {
    /** 查询项目名称 */
    getTenderProjectName () {
      this.loading = true
      tenderProject.getOne(this.tenderSystemCode).then((res) => {
        if (res.data.tenderProject) {
          this.tenderProjectName = res.data.tenderProject.tenderProjectName
          this.projectCode = res.data.tenderProject.projectCode
        }
      })
    },
    /** 获取列表数据 */
    getTableData () {
      settlementStatistical.getList(this.tenderSystemCode).then((res) => {
        this.feeTableData = []
        this.feeTableData = res.data.settlementStatisticalModels
        if (this.feeTableData && this.feeTableData.length > 0) {
          this.expendRowKeys.push(this.feeTableData[0].code)
        }
      })
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
    /** 选中某行的信息 */
    expandSelect (row, expandedRows) {
      // expandedRows(true: 打开； false:关闭)
      if (expandedRows) {
        this.expendRowKeys.push(row.code)
      } else {
        this.expendRowKeys = []
      }
    },
    dataIndex (index) {
      return 1
    }
  }
}
</script>
<style lang="less">
  #cloud_customer_detail {
  }
</style>
