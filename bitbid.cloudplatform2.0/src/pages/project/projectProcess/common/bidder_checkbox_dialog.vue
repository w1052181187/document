<template>
  <div>
    <el-dialog title="选择投标人" width="600px" :before-close="cancel" :visible.sync="showVisible">
      <div class="selectbox">
        <el-form :model="queryModel"  label-width="100px" :validate-on-rule-change="true">
          <el-row>
            <el-col :span="20">
              <el-form-item label="投标人名称：">
                <el-input class="search" v-model="queryModel.messageLike" placeholder="请输入投标人名称关键字">
                  <el-button slot="append" icon="el-icon-search" @click="handlePage(1)"></el-button>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%" header-cell-class-name="tableheader"
        v-loading="loading"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="60"
          :index="computedIndex"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="投标人名称"
          :formatter="simpleFormatData"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="contactName"
          label="联系人"
          v-if="isFromWinbid"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="contactNumber"
          label="联系电话"
          v-if="!isFromWinbid"
          :formatter="simpleFormatData"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="contactNumber"
          label="联系方式"
          v-if="isFromWinbid"
          :formatter="simpleFormatData"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="contactEmail"
          label="电子邮箱"
          v-if="!isFromWinbid"
          :formatter="simpleFormatData"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
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
      <div class="submit-radio text-center" style="text-align: center">
        <el-button type="primary" @click="submit('addForm')">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {bulletinInfo, winBiddingConfirmationLetter} from '@/api/project/index'
export default {
  data () {
    return {
      loading: false,
      page: {
        pageSize: 5,
        pageNo: 0,
        total: null, // 总条数
        currentPage: 1
      },
      queryModel: {
        tenderSystemCode: this.tenderSystemCode,
        isDelete: 0,
        messageLike: ''
      },
      tableData: [],
      selectedData: []
    }
  },
  // isFromWinbid: true表示只选择中标候选人
  props: ['showVisible', 'selectedCode', 'tenderSystemCode', 'excludeNames', 'isFromWinbid', 'sectionSystemCode'],
  watch: {
    showVisible: function (newV, oldV) {
      if (newV) {
        this.handlePage(1)
      }
    }
  },
  methods: {
    // 获取列表数据,稍作延迟
    getTableData () {
      this.tableData = []
      this.queryModel.pageNo = this.page.currentPage
      this.queryModel.pageSize = this.page.pageSize
      this.loading = true
      if (this.excludeNames) {
        this.queryModel.excludeNames = this.excludeNames
      }
      if (this.isFromWinbid) {
        this.queryModel.tenderSystemCode = this.tenderSystemCode
        this.queryModel.sectionSystemCode = this.sectionSystemCode
        winBiddingConfirmationLetter.getWinCandidateList(this.queryModel).then((res) => {
          this.page.total = res.data.winCandidateList.total
          if (res.data.winCandidateList && res.data.winCandidateList.list) {
            res.data.winCandidateList.list.forEach(item => {
              item.name = item.bidderName
            })
            this.tableData = res.data.winCandidateList.list
          }
          this.loading = false
        })
      } else {
        bulletinInfo.getSupplierList(this.queryModel).then((res) => {
          this.page.total = res.data.total
          if (res.data.supplierBaseList && res.data.supplierBaseList.length > 0) {
            res.data.supplierBaseList.forEach(item => {
              item.name = item.supplierName
            })
            this.tableData = res.data.supplierBaseList
          }
          this.loading = false
        })
      }
    },
    // 序号计算
    computedIndex (index) {
      return index + (this.page.currentPage - 1) * this.page.pageSize + 1
    },
    // 普通格式化数据，空的时候展示"---"
    simpleFormatData (row, col, cellValue) {
      return cellValue || '---'
    },
    // 表单分页
    handlePage (nowNum) {
      this.page.currentPage = nowNum
      this.page.pageNo = (nowNum - 1) * this.page.pageSize
      this.getTableData()
    },
    // 选择
    handleSelectionChange (val) {
      this.selectedData = val
    },
    // 取消
    cancel () {
      this.$set(this.queryModel, 'messageLike', '')
      // this.queryModel.messageLike = ''
      this.$emit('showDialog')
    },
    // 确认
    submit () {
      this.$emit('selected', this.selectedData)
      this.cancel()
    }
  }
}
</script>
<style scoped>
  .selectbox{
    background: #f7f8f9;
    padding: 10px 0;
    margin-bottom: 0px;
  }
</style>
