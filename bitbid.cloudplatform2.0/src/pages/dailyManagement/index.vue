<template>
  <div class="cloudcontent" id="cloud_processtype">
    <!--搜索 & 添加按钮-->
    <div class="topmain">
      <el-row>
        <div class="seacher_box">
          <span>标题：</span>
          <el-input class="input" placeholder="请输入关键字" v-model="search_input"></el-input>
          <span>发布时间：</span>
          <el-date-picker
            v-model="publishTime"
            type="daterange"
            range-separator="--"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
          <div class="handBtn">
            <el-button  type="primary" class="search" @click="search">查询</el-button>
            <el-button  @click="reset">重置</el-button>
          </div>
        </div>
      </el-row>
    </div>
    <!--搜索 & 添加按钮-->
    <div class="main">
      <el-button class="addbutton" v-if="(type === 'notice' && $store.getters.permissions.includes('1080102')) || (type === 'news' && $store.getters.permissions.includes('1080202'))" @click="handleAdd">
        <span>+ 新增</span>
      </el-button>
      <el-button class="addbutton" v-if="type === 'homeNotice'" @click="handleMultiDel">
        <span>批量删除</span>
      </el-button>
      <el-button class="addbutton" v-if="type === 'homeNotice'" @click="handleReaded">
        <span>标记为已读</span>
      </el-button>
      <el-table
        :data="tableData"
        border
        header-cell-class-name="tableheader"
        @selection-change="handleSelectionChange">
        <el-table-column
          v-if="type !== 'homeNotice'"
          key="index"
          type="index"
          label="序号"
          align="center"
          :index="indexMethod"
          width="80">
        </el-table-column>
        <el-table-column
          v-if="type === 'homeNotice'"
          key="selection"
          type="selection"
          align="center"
          width="80">
          <!--:selectable="chenkCanCkecked">-->
        </el-table-column>
        <el-table-column
          key="title"
          prop="title"
          :label="type === 'notice' || type === 'homeNotice'  ? '通知标题' : '标题'"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span :class="handleTitleStyle(scope.row)" style="cursor: pointer;" @click="handleDetail(scope)">{{scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="type === 'notice' || type === 'news'"
          key="status"
          prop="status"
          label="状态"
          width="120">
          <template slot-scope="scope">
            <span  v-if="scope.row.status === 0">已保存</span>
            <span  v-if="scope.row.status === 1">已提交</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="type === 'notice' || type === 'news'"
          key="createName"
          prop="createName"
          label="提交人"
          :formatter="formatterCreateName"
          width="140"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          v-if="type === 'notice' || type === 'news'"
          key="submitTime"
          prop="submitTime"
          label="提交时间"
          width="180"
          value-format="yyyy-MM-dd">
        </el-table-column>
        <el-table-column
          v-if="type === 'homeNotice' || type === 'homeNews'"
          key="createName"
          prop="createName"
          label="发布人"
          width="140"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          v-if="type === 'homeNotice' || type === 'homeNews'"
          key="submitTime"
          prop="submitTime"
          label="发布时间"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleDetail(scope)">查看</el-button>
            <template v-if="(type === 'notice' && $store.getters.permissions.includes('1080102')) || (type === 'news' && $store.getters.permissions.includes('1080202'))">
              <el-button type="text" size="small" @click="handleEdit(scope)" v-if="Number(scope.row.status) !== 1">编辑</el-button>
            </template>
            <template v-if="(type === 'notice' && $store.getters.permissions.includes('1080102')) || (type === 'news' && $store.getters.permissions.includes('1080202'))">
              <el-button type="text" size="small" @click="handleDel(scope)" v-if="Number(scope.row.status) !== 1">删除</el-button>
            </template>
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
import {notice} from '@/api/notice/notice'

export default {
  name: '',
  data () {
    return {
      search_input: '',
      publishTime: '',
      type: '',
      // 当前页
      currentPage: 1,
      pageNo: 0,
      total: 0, // 总条数
      pageSize: 10, // 每页展示条数
      tableData: [],
      selectedData: [] // 选中数据
    }
  },
  methods: {
    chenkCanCkecked (row, index) {
      if (Number(row.isReaded) === 1) {
        return false
      } else {
        return true
      }
    },
    formatterCreateName (notice) {
      if (notice.createName) {
        let createrNameArr = notice.createName.split('—>')
        return createrNameArr[createrNameArr.length - 1]
      } else {
        return '---'
      }
    },
    indexMethod (index) {
      return index + (this.currentPage - 1) * 10 + 1
    },
    // 重置
    reset () {
      this.search_input = ''
      this.publishTime = null
      this.pageNo = 0
      this.currentPage = 1
      this.getData()
    },
    // 搜索
    search () {
      this.pageNo = 0
      this.currentPage = 1
      this.getData()
    },
    // 多选
    handleSelectionChange (val) {
      this.selectedData = val
    },
    // 批量删除
    handleMultiDel () {
      if (this.selectedData.length > 0) {
        this.$confirm('确认要将所选通知删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let selectIds = []
          this.selectedData.map(item => {
            selectIds.push(item.objectId)
          })
          notice.deleteNoticeList({includeIds: selectIds}).then((res) => {
            this.getData()
          })
        })
      } else {
        this.$message('请选择要删除的通知')
      }
    },
    // 标记已读
    handleReaded () {
      if (this.selectedData.length > 0) {
        this.$confirm('确认要将所选通知设为已读吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          notice.setIsReaded(this.selectedData).then((res) => {
            this.getData()
          })
        })
      } else {
        this.$message('请选择要标记为已读的通知')
      }
    },
    // 处理标题样式
    handleTitleStyle (row) {
      if (this.type === 'homeNotice') {
        return Number(row.isReaded) === 1 ? 'readed' : 'unReaded'
      } else {
        return ''
      }
    },
    getData () {
      let query = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        messageLike: this.search_input,
        enterpriseId: this.$store.getters.authUser.enterpriseId,
        userId: this.$store.getters.authUser.userId
      }
      if (this.publishTime) {
        this.$set(query, 'searchStartTime', this.publishTime[0] + ' 00:00:00')
        this.$set(query, 'searchEndTime', this.publishTime[1] + ' 23:59:59')
      }
      if (this.type === 'homeNotice') {
        this.$set(query, 'refType', 1) // 与我相关
        notice.getMyNoticeList(query).then((res) => {
          if (res.data.resCode === '0000') {
            this.tableData = res.data.noticeList.list
            this.total = res.data.noticeList.total
          }
        })
      } else {
        if (this.type === 'notice') {
          this.$set(query, 'type', 1)
        } else if (this.type === 'news') {
          this.$set(query, 'type', 2)
        } else if (this.type === 'homeNews') {
          this.$set(query, 'type', 2)
          this.$set(query, 'status', 1) // 已提交
        }
        notice.getNoticeList(query).then((res) => {
          if (res.data.resCode === '0000') {
            this.tableData = res.data.noticeList.list
            this.total = res.data.noticeList.total
          }
        })
      }
    },
    // 表单分页
    handleCurrentChange (nowNum) {
      this.currentPage = nowNum
      this.pageNo = (nowNum - 1) * this.pageSize
      this.getData(parseInt(this.pageNo), parseInt(this.pageSize))
    },
    handleDel (scope) {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        if (this.type === 'homeNotice') {
          notice.deleteMyNotice(scope.row.objectId).then((res) => {
            this.getData()
          })
        } else {
          notice.deleteNotice(scope.row.objectId).then((res) => {
            if (res.data.resCode === '0000') {
              this.getData()
            }
          })
        }
      }).catch(() => {
        return false
      })
    },
    handleAdd () {
      let path = ''
      switch (this.type) {
        case 'notice':
          path = '/dailyManagement/noticeAnnouncement/add'
          break
        case 'news':
          path = '/dailyManagement/companyNews/add'
          break
      }
      this.$router.push({path: path})
    },
    handleDetail (scope) {
      let path = ''
      switch (this.type) {
        case 'notice':
          path = '/dailyManagement/noticeAnnouncement/detail/'
          path += scope.row.objectId
          this.$router.push({path: path})
          break
        case 'news':
          path = '/dailyManagement/companyNews/detail/'
          path += scope.row.objectId
          this.$router.push({path: path})
          break
        case 'homeNews':
          path = '/dailyManagement/companyNews/detail/'
          path += scope.row.objectId
          this.$router.push({path: path})
          break
        case 'homeNotice':
          path = '/dailyManagement/noticeAnnouncement/detail/'
          path += scope.row.objectId
          this.$router.push({path: path, query: {isSetReaded: '1'}})
          break
      }
    },
    handleEdit (scope) {
      let path = ''
      switch (this.type) {
        case 'notice':
          path = '/dailyManagement/noticeAnnouncement/update/'
          break
        case 'news':
          path = '/dailyManagement/companyNews/update/'
          break
      }
      path += scope.row.objectId
      this.$router.push({path: path})
    },
    init () {
      this.type = this.$route.meta.type
      this.getData()
    }
  },
  watch: {
    '$route': 'init'
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>
  .addbutton{
    margin-bottom: 12px;
    color: #fff;
    background-color: #409EFF;
    border-color: #409EFF;
    float: right;
    margin-left: 12px;
  }
  .input{
    width: 200px;
    margin-right: 24px;
  }
  .unReaded::before{
    display: inline-block;
    content: '';
    width: 10px;
    height: 10px;
    margin-right: 6px;
    border-radius: 50%;
    background-color: #ff0001;
    text-align: center;
  }
  .unReaded{
    color: #333;
    vertical-align: middle;
    cursor: pointer;
  }
  .readed{
    color: #999;
    vertical-align: middle;
    cursor: pointer;
  }
  .readed::before{
    display: inline-block;
    content: '';
    width: 10px;
    height: 10px;
    margin-right: 6px;
    border-radius: 50%;
    background-color: #bbb;
  }
</style>
