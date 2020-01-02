<template>
  <div>
    <el-table
      :data="recordList"
      border
      style="width: 100%" header-cell-class-name="tableheader">
      <el-table-column
        width="50"
        type="index"
        :index='dataIndex'
        align="center"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="borrowerDepartmentName"
        label="部门"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="borrowerName"
        label="人员"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="borrowingDate"
        label="借出时间"
        align="center"
        :formatter="simpleFormatData"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="returnDate"
        label="归还时间"
        align="center"
        :formatter="simpleFormatData"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size='pageSize'
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>
<script>
import {borrowRecord} from '@/api/archives'

export default {
  components: {
  },
  props: {
    info: Object
  },
  data () {
    return {
      recordList: [
      ],
      currentPage: 1,
      pageNo: 0,
      total: null,
      pageSize: 10
    }
  },
  watch: {
    info () {
      this.getRecord()
    }
  },
  methods: {
    // 普通格式化数据，空的时候展示"---"
    simpleFormatData (row, col, cellValue) {
      return cellValue || '---'
    },
    dataIndex (index) {
      return index + (this.currentPage - 1) * this.pageSize + 1
    },
    handleCurrentChange (nowNum) {
      this.currentPage = nowNum
      this.pageNo = (nowNum - 1) * this.pageSize
      this.getRecord()
    },
    // 获取查阅记录
    getRecord () {
      if (!this.info) {
        return
      }
      borrowRecord.getRecordList({
        relatedCode: this.info.code,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }).then((res) => {
        if (res.data.resCode === '0000') {
          this.recordList = res.data.recordOfBorrowingList.list
          this.total = res.data.recordOfBorrowingList.total
        }
      })
    }
  },
  mounted () {
    this.getRecord()
  }
}
</script>
<style lang="less">
  .bidSectionName{
    line-height: 44px;
  }
</style>
