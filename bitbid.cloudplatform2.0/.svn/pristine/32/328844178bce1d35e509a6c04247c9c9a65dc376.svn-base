<template>
  <div class="cloudcontent">
    <div class="topmain">
      <div class="seacher_box advancedsearch_box">
        <span>用户名/姓名：</span>
        <el-input class="search" placeholder="请输入内容" style="vertical-align: top"  v-model="queryModel.messageLike"></el-input>
        <div class="handBtn" v-if="!showselect">
          <el-button  type="primary" class="search" @click="search">查询</el-button>
          <el-button  @click="reset">重置</el-button>
          <span @click="showselect = true" class="more">展开搜索条件</span>
        </div>
        <div class="advancedsearch" v-if="showselect">
          <el-form :model="queryModel" ref="searchForm" label-width="90px" :validate-on-rule-change="true">
            <el-row>
              <el-col :span="9" class="bigWidth">
                <el-form-item label="所属部门：">
                  <el-input class="deptInput" v-model="queryModel.departmentName" auto-complete="off" placeholder="请选择" readonly="readonly" clearable @click.native="showDepartmentTree">
                    <i slot="suffix" class="el-input__icon el-icon-arrow-down"></i>
                  </el-input>
                  <tree-options :initData="queryModel.departmentId" @selectSuccess="selectedDepatment" :isShowOptions="isShowDptTree" :startWithRootFlag = "true"></tree-options>
                </el-form-item>
              </el-col>
              <el-col :span="9" class="bigWidth">
                <el-form-item label="角色：">
                  <el-select v-model="queryModel.roleId" placeholder="请选择">
                    <el-option
                      v-for="item in roleOptions"
                      :key="item.objectId"
                      :label="item.name"
                      :value="item.objectId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
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
    <div class="main">
      <!--按钮-->
      <div class="btnbigbox">
        <!--添加角色-->
          <el-button type="primary" class="addbutton" @click="showEditDialog(true, false)">
            <span> + 新增用户</span>
          </el-button>
        <edit-user :showVisible="showVisible" :isEdit="isEdit" :editObjectId="editObjectId" @showEditDialog="showEditDialog" @saveSuccess="handlePage(1)"></edit-user>
        <!--添加角色-->
      </div>
      <!--按钮-->
      <!--表格-->
      <div class="content_tablebox">
        <template>
          <el-table
            :data="users"
            border
            v-loading="loading"
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
              prop="departmentListNames"
              :formatter="simpleFormatData"
              label="所属部门"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="roleNames"
              label="角色"
              :formatter="simpleFormatData"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="操作" align="center" width="320">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="showEditDialog(true, true, scope.row.objectId)">编辑</el-button>
                <el-button type="text" size="small" @click="showAssignRoles(scope.row.objectId)">分配角色</el-button>
                <el-button type="text" size="small" @click="restPwd(scope.row)">重置密码</el-button>
                <el-button type="text" size="small" @click="forbiddenUser(scope.row, 2)" v-if="scope.row.status === 1">禁用</el-button>
                <el-button type="text" size="small" @click="forbiddenUser(scope.row, 1)" v-else>启用</el-button>
                <el-button type="text" size="small" @click="logoffUser(scope.row.objectId)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <assign-roles :userId="userId" :showVisible="showAssignRolesFlag" @showAssignRolesDialog="showAssignRoles" @submitSuccess="assignRoles"></assign-roles>
      <!--表格-->
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
</template>
<script>
import {user, role} from '@/api/system'
import editUser from './edit_user'
import assignRoles from './assign_roles'
import TreeOptions from '@/pages/system/department/tree/tree_options'

export default {
  components: {
    editUser,
    assignRoles,
    TreeOptions
  },
  data () {
    return {
      showselect: false, // 高级搜索显示隐藏
      loading: false,
      page: {
        pageSize: 10,
        pageNo: 1,
        total: 0, // 总条数
        currentPage: 1
      },
      queryModel: {
        enterpriseId: this.$store.getters.authUser.enterpriseId,
        isDelete: 0,
        type: 2,
        messageLike: '',
        nameLike: '',
        account: '',
        departmentId: null,
        departmentName: '',
        treeMode: 1,
        roleId: null
      },
      // 表格数据
      users: [],
      showVisible: false,
      isEdit: false,
      editObjectId: null,
      userId: null,
      showAssignRolesFlag: false,
      // 所属部门
      // 是否展示部门树
      isShowDptTree: false,
      roleOptions: []
    }
  },
  methods: {
    // 搜索
    search () {
      this.handlePage(1)
    },
    reset () {
      this.queryModel.messageLike = ''
      this.queryModel.roleId = null
      this.queryModel.departmentName = ''
      this.queryModel.departmentId = null
      this.handlePage(1)
    },
    searchRole () {
      role.queryAll(this.$store.getters.authUser.enterpriseId).then(res => {
        console.log(res)
        this.roleOptions = res.data.roleList
        // this.roles = res.data.rolePageInfo.list
      })
    },
    // 用户列表数据
    queryUserList () {
      this.loading = true
      this.queryModel.pageNum = this.page.pageNo
      this.queryModel.pageSize = this.page.pageSize
      user.queryListWithDptList(this.queryModel).then((res) => {
        this.loading = false
        this.users = res.data.data
        this.page.total = res.data.page.totalRows
        this.getRoleNames()
      })
    },
    // 获取角色名称
    getRoleNames () {
      this.users.forEach((item, index) => {
        role.queryNamesByUserId(item.objectId).then(res => {
          this.$set(this.users[index], 'roleNames', res.data.data)
        })
      })
    },
    // 编辑用户弹框
    showEditDialog (isShow, isEdit, objectId) {
      this.showVisible = isShow
      this.isEdit = isEdit
      this.editObjectId = objectId || null
    },
    // 禁用用户
    forbiddenUser (obj, status) {
      this.$confirm('确认进行该操作吗?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        obj.status = status
        user.update(obj).then(res => {
        })
      }).catch(() => {
        return false
      })
    },
    // 重置密码
    restPwd (obj) {
      this.$confirm('确认进行该操作吗?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('RestPwd', obj.account).then(() => {
          this.$alert('重置后的密码为：123456，请妥善保管', '重置密码成功')
        })
      }).catch(() => {
        return false
      })
    },
    // 删除用户
    logoffUser (userId) {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        user.logoff(userId).then(() => {
          this.handlePage(1)
        })
      }).catch(() => {
        return false
      })
    },
    // 分配角色弹框
    showAssignRoles (userId) {
      this.userId = userId
      this.showAssignRolesFlag = !this.showAssignRolesFlag
    },
    // 分配角色
    assignRoles () {
      this.showAssignRolesFlag = !this.showAssignRolesFlag
      this.handlePage(this.page.currentPage)
    },
    // 分配角色成功
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
    },
    // 部门树展开/关闭
    showDepartmentTree () {
      this.isShowDptTree = !this.isShowDptTree
    },
    // 选择部门
    selectedDepatment (deptTreeNode) {
      this.queryModel.departmentName = deptTreeNode.label
      this.queryModel.departmentId = deptTreeNode.id
      this.isShowDptTree = false
    }
  },
  mounted () {
    this.queryUserList()
    this.searchRole()
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
