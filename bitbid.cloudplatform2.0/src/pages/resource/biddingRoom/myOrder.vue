<template>
  <div class="cloudcontent">
    <div class="main">
      <div class="selectbox">
        <el-form label-width="85px"  style="width: 100%">
          <el-row>
            <div class="selectlist">
              <el-form-item label="开评标室：">
                <el-input
                  v-model="roomNameLike"
                  placeholder="请输入开评标室名称">
                </el-input>
              </el-form-item>
            </div>
            <div class="selectlist">
              <el-form-item label="项目名称：">
                <el-input
                  v-model="messageLike"
                  placeholder="请输入关键字">
                </el-input>
              </el-form-item>
            </div>
            <div class="selectlist">
              <el-form-item label="状态：" label-width="50px">
                <el-select v-model="status" placeholder="全部">
                  <el-option label="全部" value="2"></el-option>
                  <el-option label="已预约" value="1"></el-option>
                  <el-option label="取消预约" value="0"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="selectlist">
              <el-button type="primary" class="search_btn"  @click="search">查询</el-button>
              <el-button class="search_btn" @click="reset">重置</el-button>
            </div>
          </el-row>
        </el-form>
      </div>
      <el-table
        :data="projectData"
        border
        style="width: 100%" header-cell-class-name="tableheader">
        <el-table-column
          type="index"
          label="序号"
          width="60"
          fixed="left"
          align="center"
          :index="indexMethod">
        </el-table-column>
        <el-table-column
          prop="bidOpeningRoom.name"
          label="开评标室"
          width="120"
          align="center"
          fixed="left"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="使用时间"
          width="150"
          align="center"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-row class="use-date">{{ scope.row.startTime | formatUseDate }}至</el-row>
            <el-row class="use-date">{{ scope.row.endTime | formatUseDate }}</el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="tenderProjectName"
          label="项目名称"
          align="left"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="businessType"
          label="用途"
          width="70"
          align="center"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span  v-if="scope.row.businessType === 1">开标</span>
            <span  v-if="scope.row.businessType === 2">评标</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="creatorName"
          label="预约人"
          width="75"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="预约时间"
          width="160"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="status"
          label="预约状态"
          width="80"
          align="center"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span  v-if="scope.row.status === 0">取消预约</span>
            <span  v-if="scope.row.status === 1">已预约</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="120"
          fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="updateOrder(scope)" v-if="scope.row.status !== 0">修改</el-button>
            <el-button type="text" size="small" @click="delOrder(scope)" v-if="scope.row.status !== 1">删除</el-button>
            <el-button type="text" size="small" @click="cancelOrder(scope)" v-if="scope.row.status !== 0">取消预约</el-button>
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
import {appointmentRecord} from '@/api/resource'

export default {
  name: '',
  components: {},
  filters: {
    formatUseDate (value) {
      if (value) {
        return value.substring(0, value.length - 3)
      }
    }
  },
  data () {
    return {
      messageLike: null,
      roomNameLike: null,
      status: '',
      projectData: [],
      // 当前页
      currentPage: 1,
      pageNo: 0,
      total: 0, // 总条数
      pageSize: 10 // 每页展示条数
    }
  },
  methods: {
    indexMethod (index) {
      return index + (this.currentPage - 1) * 10 + 1
    },
    search () {
      this.currentPage = 1
      this.pageNo = 0
      this.getTableData()
    },
    reset () {
      this.roomNameLike = ''
      this.status = ''
      this.messageLike = ''
      this.currentPage = 1
      this.pageNo = 0
      this.getTableData()
    },
    handleCurrentChange (nowNum) {
      this.currentPage = nowNum
      this.pageNo = (nowNum - 1) * this.pageSize
      this.getTableData()
    },
    updateOrder (scope) {
      this.$emit('updateOrder', scope)
    },
    delOrder (scope) {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        appointmentRecord.deleteAppointmentRecord(scope.row.objectId).then((res) => {
          if (res.data.resCode === '0000') {
            this.getTableData()
            this.refreshOrder()
          } else {
            return false
          }
        })
      }).catch(() => {
        return false
      })
    },
    /**
     * 取消或者删除后刷新预约管理
     */
    refreshOrder () {
      this.$emit('refreshOrder', '')
    },
    cancelOrder (scope) {
      this.$confirm('确认取消预约吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        appointmentRecord.cancalAppointmentRecord(scope.row.objectId).then((res) => {
          if (res.data.resCode === '0000') {
            this.getTableData()
            this.refreshOrder()
          } else {
            return false
          }
        })
      }).catch(() => {
        return false
      })
    },
    getTableData () {
      let query = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      if (Number(this.status) === 0 || Number(this.status) === 1) {
        this.$set(query, 'status', this.status)
      }
      if (this.messageLike) {
        this.$set(query, 'messageLike', this.messageLike)
      }
      if (this.roomNameLike) {
        this.$set(query, 'roomNameLike', this.roomNameLike)
      }
      let statusArr = ['0', '1'].join()
      this.$set(query, 'statusArr', statusArr)
      appointmentRecord.getAppointmentRecordList(query).then(res => {
        if (res.data.resCode === '0000') {
          this.projectData = res.data.appointmentRecordList.list
          this.total = res.data.appointmentRecordList.total
        } else {
          return false
        }
      })
    }
  },
  mounted () {
    this.getTableData()
  }
}
</script>

<style scoped>
  .use-date {
    text-align: left;
  }
  .search_btn{
    margin-left: 10px;
  }
  .selectlist{
    display: inline-block;
    float: left;
  }
  .el-form-item{
    margin-right: 10px;
    padding-right: 0px!important;
  }
</style>
