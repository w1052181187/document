<template>
  <div>
    <el-dialog title="选择投标人" width="600px" :before-close="cancel" :visible.sync="showVisible">
      <el-tabs v-model="activeName">
        <el-tab-pane label="选择投标人" name="first">
          <div class="selectbox">
            <el-form :model="queryModel"  label-width="100px" :validate-on-rule-change="true">
              <el-row>
                <el-col :span="20">
                  <el-form-item label="投标人：">
                    <el-input class="search" v-model="queryModel.bidderNameLike" placeholder="请输入投标人名称关键字">
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
            style="width: 100%" header-cell-class-name="tableheader">
            <el-table-column
              type="index"
              label="序号"
              width="60"
              :index="computedIndex"
              align="center">
            </el-table-column>
            <el-table-column
              prop="bidderName"
              label="投标人名称"
              :formatter="simpleFormatData"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="contactName"
              label="联系人"
              :formatter="simpleFormatData"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="contactNumber"
              label="联系方式"
              :formatter="simpleFormatData"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="radio"
              label="操作"
              align="center"
              width="90">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="selected(scope.row)">选择</el-button>
              </template>
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
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
import {signUpInfo, resultInfo, costInfo} from '@/api/project'

export default {
  data () {
    return {
      activeName: 'first',
      page: {
        pageSize: 5,
        pageNo: 0,
        total: null, // 总条数
        currentPage: 1
      },
      queryModel: {
        isDelete: 0,
        bidderNameLike: ''
      },
      tableData: [],
      addForm: {}
    }
  },
  props: ['showVisible', 'selectedCode', 'tenderSystemCode', 'excludeNames', 'includeNames', 'flowStatus', 'flag', 'sectionSystemCode'],
  watch: {
    showVisible: function (newV, oldV) {
      if (newV) {
        this.handlePage(1)
      }
    },
    sectionSystemCode () {
      this.getTableData()
    }
  },
  methods: {
    // 获取列表数据,稍作延迟
    getTableData () {
      if (!this.sectionSystemCode) {
        return
      }
      this.tableData = []
      this.queryModel.pageNo = this.page.pageNo
      this.queryModel.pageSize = this.page.pageSize
      this.queryModel.enterpriseId = this.$store.getters.authUser.enterpriseId
      this.queryModel.sectionSystemCode = this.sectionSystemCode
      if (this.excludeNames) {
        this.queryModel.excludeNames = this.excludeNames
      }
      if (this.includeNames) {
        this.queryModel.includeNames = this.includeNames
      }
      if ((this.flowStatus === 9 || this.flowStatus === 10 || (this.flowStatus === 12 && this.flag === 1) ||
        this.flowStatus === 13 || this.flowStatus === 15 || this.flowStatus === 19 ||
        (this.flowStatus === 20 && this.flag === 1)) && this.includeNames.length === 0) {
        // 开标记录（投标人代表）、中标通知书、招标结果通知书(中标人)：若包含的名称组includeNames无值，则不查询数据
        return
      }
      this.queryModel.auditStatus = 8
      signUpInfo.getList(this.queryModel).then(res => {
        let bidderList = res.data.signUpInfoList
        if (bidderList.list.length > 0) {
          this.tableData = bidderList.list
          this.page.total = bidderList.total
        } else {
          this.queryModel.auditStatus = null
          // 没有投标报名信息时查询文件发售记录
          costInfo.bidderList(this.queryModel).then((res) => {
            let bidderList = res.data.costInfoList
            if (bidderList.list.length > 0) {
              this.tableData = bidderList.list
              this.page.total = bidderList.total
            } else {
              this.queryModel.auditStatus = null
              // 没有文件发售记录时查询1.资格预审文件递交信息；2.投标文件递交信息
              resultInfo.bidderList(this.queryModel).then((res) => {
                let bidderList = res.data.bidderList
                if (bidderList) {
                  this.tableData = bidderList.list
                  this.page.total = bidderList.total
                }
              })
            }
          })
        }
      })
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
    selected (obj) {
      obj.objectId = obj.bidderId
      obj.name = obj.bidderName
      this.$emit('selected', obj)
      this.cancel()
    },
    // 取消
    cancel () {
      this.$set(this.queryModel, 'bidderNameLike', '')
      this.activeName = 'first'
      this.$emit('showDialog')
    }
  },
  mounted () {
    // 列表初始化
    this.getTableData()
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
