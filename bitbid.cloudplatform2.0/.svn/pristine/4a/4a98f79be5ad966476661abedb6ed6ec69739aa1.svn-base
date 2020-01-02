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
        prop="inventoryStatus"
        label="档案状态"
        align="center"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="scope.row.inventoryStatus === 0">正常</span>
          <span v-if="scope.row.inventoryStatus === 2">部分缺失</span>
          <span v-if="scope.row.inventoryStatus === 1">缺失</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createName"
        label="清点人"
        align="center"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="备注"
        align="center"
        :formatter="simpleFormatData"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="清点时间"
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
import {inventoryRecord} from '@/api/archives'

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
      inventoryRecord.getRecordList({
        relatedCode: this.info.code,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }).then((res) => {
        if (res.data.resCode === '0000') {
          this.recordList = res.data.recordOfInventoryList.list
          this.total = res.data.recordOfInventoryList.total
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
