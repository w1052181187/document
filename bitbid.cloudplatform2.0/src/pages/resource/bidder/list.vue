<template>
  <div class="cloudcontent">
    <div class="topmain">
      <div class="seacher_box advancedsearch_box">
        <span>项目名称：</span>
        <el-input class="search" placeholder="请输入项目名称关键字" style="vertical-align: top"  v-model="searchForm.tenderProjectNameLike"></el-input>
        <span>项目编号：</span>
        <el-input class="search" placeholder="请输入项目编号关键字" style="vertical-align: top"  v-model="searchForm.projectCodeLike"></el-input>
        <div class="handBtn" v-if="!showselect">
          <el-button  type="primary" class="search" @click="search">查询</el-button>
          <el-button  @click="reset">重置</el-button>
          <span @click="showselect = true" class="more">展开搜索条件</span>
        </div>
        <div class="advancedsearch" v-if="showselect">
          <el-form :model="searchForm" ref="searchForm" label-width="90px" :validate-on-rule-change="true">
            <el-row>
              <el-col :span="9">
                <el-form-item label="项目类型：">
                  <span :class="isTypeSelectAll ? 'all selectall': 'all'" @click="conditionCancel('项目类型')">不限</span>
                  <el-radio-group v-model="searchForm.tenderProjectType" @change="conditionSelect($event, '项目类型')">
                    <el-radio v-for="item in proTypeOption" :label="item.code" :key="item.code" :checked="projectTypeFlag">{{item.name}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="项目经理：">
                  <el-input v-model="searchForm.firstProjectLeaderName" placeholder="请输入项目经理" readonly>
                    <el-button type="primary" slot="append" @click="showUserDialog">选择</el-button>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="9" class="bigWidth">
                <el-form-item label="所属部门：">
                  <el-input class="deptInput" v-model="searchForm.departmentName" auto-complete="off" placeholder="请选择" readonly="readonly" clearable @click.native="showDepartmentTree">
                    <i slot="suffix" class="el-input__icon el-icon-arrow-down"></i>
                  </el-input>
                  <tree-options :initData="searchForm.departmentId" @selectSuccess="selectedDepatment" :isShowOptions="isShowDptTree" :startWithRootFlag = "true"></tree-options>
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
      <el-table
        :data="registProjectData"
        @cell-click="cellClick"
        border
        style="width: 100%" header-cell-class-name="tableheader">
        <el-table-column
          type="index"
          label="序号"
          width="60"
          :index='indexMethod'
          align="center">
        </el-table-column>
        <el-table-column
          prop="projectCode"
          label="项目编号"
          class-name="pointer"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="tender-project-name">
              <img src="../../../assets/lishi_b.png" v-if="Number(scope.row.dataSource) === 1" title="历史项目">{{scope.row.projectCode}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="tenderProjectName"
          label="项目名称"
          class-name="pointer"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="tenderProjectTypeStr"
          label="项目类型"
          width="80px"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="bidSectionCount"
          label="标段数量"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="tendererName"
          label="招标人"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="departmentName"
          label="所属部门"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="firstProjectLeaderName"
          label="项目经理"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small"
                       v-if="!(scope.row.status === 5 || scope.row.status === 6 || scope.row.status === 9 || scope.row.status === 14)"
                       @click="projectBtn(scope.row)">查看</el-button>
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
        @current-change="handleCurrentChange"
        @next-click="handleCurrentNext">
      </el-pagination>
      <!--分页-->
    </div>
    <select-user-dialog :showVisible="showUserVisible" @selected="selectedUser" @showDialog="showUserDialog"></select-user-dialog>
  </div>
</template>
<script>
import {tenderProject, bidSection} from '@/api/project'
import {dateFormat} from '@/assets/js/common'
import selectUserDialog from '@/pages/system/users/search_user_radio'
import TreeOptions from '@/pages/system/department/tree/tree_options'
import * as bidsType from '@/assets/js/constants_three'
export default {
  components: {
    selectUserDialog,
    TreeOptions
  },
  data () {
    return {
      cityFlag: true,
      countyFlag: true,
      searchForm: {
        tenderProjectNameLike: '',
        projectCodeLike: '',
        tenderProjectType: '',
        firstProjectLeaderName: '',
        departmentId: '',
        departmentName: ''
      },
      registProjectData: [],
      // 当前页
      currentPage: 1,
      pageNo: 0,
      total: 0, // 总条数
      pageSize: 10, // 每页展示条数
      dataIndex: 1,
      sectionIndex: 'currentBidSection',
      sectionFlowStatusIndex: 'currentBidSectionFlowStatus',
      queryCondition: this.$route.query.status,
      showselect: false, // 高级搜索显示隐藏
      // 项目类型
      isTypeSelectAll: true,
      proTypeOption: [
        {
          name: '工程',
          code: 1
        },
        {
          name: '货物',
          code: 2
        },
        {
          name: '服务',
          code: 3
        }
      ],
      projectTypeFlag: true,
      // 项目经理
      showUserVisible: false,
      // 所属部门
      // 是否展示部门树
      isShowDptTree: false,
      // 项目类型
      tenderProjectType: bidsType.bidsType
    }
  },
  watch: {
    '$route': 'getTableData'
  },
  created () {
    this.getTableData()
  },
  methods: {
    cellClick (row, column, cell, event) {
      if (column.label === '项目编号' || column.label === '项目名称') {
        this.projectBtn(row)
      }
    },
    filterTenderProjectType (type) {
      if (Number(type) === 1) {
        return '工程'
      } else if (Number(type) === 2) {
        return '货物'
      } else if (Number(type) === 3) {
        return '服务'
      }
    },
    // 格式化时间
    formatDate (row, col, cellValue) {
      return cellValue ? dateFormat(cellValue, 'yyyy-MM-dd') : '---'
    },
    /** 获取列表数据 */
    getTableData () {
      if (Number(this.searchForm.projectDateInterval) === 6 && !this.searchForm.projectCustomTime) {
        this.$message({
          type: 'warning',
          message: '请输入自定义时间区间！'
        })
        return false
      }
      let query = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        enterpriseId: this.$store.getters.authUser.enterpriseId,
        querySource: 1,
        bidderId: this.$route.query.bidderId
      }
      if (this.searchForm.tenderProjectNameLike) {
        query.messageLike = this.searchForm.tenderProjectNameLike
      }
      if (this.searchForm.projectCodeLike) {
        query.projectCodeLike = this.searchForm.projectCodeLike
      }
      if (this.searchForm.tenderProjectType) {
        query.tenderProjectType = this.searchForm.tenderProjectType
      }
      if (this.searchForm.firstProjectLeaderName) {
        query.firstProjectLeaderNameLike = this.searchForm.firstProjectLeaderName
      }
      if (this.searchForm.departmentId) {
        query.departmentId = this.searchForm.departmentId
      }
      tenderProject.bidderRelatedProjcetList(query).then((res) => {
        if (res.data.tenderProjectList && res.data.tenderProjectList.list) {
          this.registProjectData = res.data.tenderProjectList.list
          this.total = res.data.tenderProjectList.total
          // 项目类型信息的拼接
          this.registProjectData.forEach(item => {
            let list = this.getClassifyList(item.tenderProjectType)
            if (list.length > 0) {
              item.tenderProjectTypeStr = list.length !== 1 ? this.getClassifyInfo(list) : this.filterTenderProjectType(item.tenderProjectType)
            } else {
              item.tenderProjectTypeStr = ''
            }
          })
        }
      })
    },
    /** 获取项目类型信息的集合 */
    getClassifyList (tenderProjectTypeList) {
      let list = []
      if (tenderProjectTypeList !== null) {
        list = tenderProjectTypeList.split('-')
      }
      return list
    },
    /** 获取招标项目扩展信息 */
    getClassifyInfo (list) {
      let str = ''
      let firstId = this.getLabelName(this.tenderProjectType, list[0])
      let secondId = this.getLabelName(this.tenderProjectType, list[1])
      let thirdId = this.getLabelName(this.tenderProjectType, list[2])
      if (firstId.node) {
        str += `${firstId.node.label}`
        str += '/'
      }
      if (secondId.node) {
        str += `${secondId.node.label}`
        str += '/'
      }
      if (thirdId.node) {
        str += `${thirdId.node.label}`
      }
      return str
    },
    /** treeData [原始数据集]， key 传入的key值 */
    getLabelName (treeData, key) {
      let parentNode = null
      let node = null
      function getTreeDeepArr (treeData, key) {
        for (let i = 0; i < treeData.length; i++) {
          // 1.如果没有子节点 beark
          if (node) {
            break
          }
          // 定义需要操作的数据
          let obj = treeData[i]
          // 没有节点就下一个
          if (!obj || !obj.value) {
            continue
          }
          // 2.有节点就继续找，一直递归
          if (obj.value === key) {
            node = obj
            break
          } else {
            // 3.如果有子节点就继续找
            if (obj.children) {
              // 4.递归前，记录当前节点，作为parentNode
              parentNode = obj
              // 递归
              getTreeDeepArr(obj.children, key)
            } else {
              // 跳出当前递归
              continue
            }
          }
        }
        // 如果没有找到父节点，置为null
        if (!node) {
          parentNode = null
        }
        // 返回结果
        return {
          node: node,
          parentNode: parentNode
        }
      }
      return getTreeDeepArr(treeData, key)
    },
    /** 模糊查询方法 */
    search () {
      this.pageNo = 0
      this.pageSize = 10
      this.currentPage = 1
      this.total = 0
      this.getTableData()
    },
    reset () {
      this.searchForm.projectCustomTime = ''
      this.searchForm.tenderProjectNameLike = ''
      this.searchForm.projectCodeLike = ''
      this.searchForm.tenderProjectType = ''
      this.searchForm.firstProjectLeaderName = ''
      this.searchForm.departmentId = ''
      this.searchForm.departmentName = ''
      this.isTypeSelectAll = true
      this.getTableData()
    },
    // 项目管理
    projectBtn (row) {
      this.judgePermission('1010402', row)
    },
    // 快捷入口判断权限并跳转
    judgePermission (permissionId, row) {
      if (this.$store.getters.permissions.includes(permissionId)) {
        let userIds = row.projectLeaderIds || []
        userIds.push(row.creator)
        this.$store.dispatch('JudgeScopeOfController', {departmentListIds: row.departmentListIds, userIds: userIds}).then(result => {
          if (result) {
            bidSection.getList({
              tenderSystemCode: row.code,
              enterpriseId: this.$store.getters.authUser.enterpriseId
            }).then((res) => {
              sessionStorage.setItem('isOverview', this.$store.getters.permissions.includes('1010402')) // 根据正常流程展示操作按钮
              if (res.data.bidSectionList.list.length > 0) {
                this.$router.push({path: `/project/projectProcess/project/process/${row.code}`})
                this.clearCurProjectSession(row.code)
              } else {
                this.$confirm('该项目下还未创建标段，是否立即创建标段？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.$router.push({path: `/project/projectProcess/project/add`, query: {code: row.code}})
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消创建标段'
                  })
                })
              }
            })
          }
        })
      } else {
        this.$alert('您没有该功能的查看或操作权限，请联系系统管理员授权！', '提示', {
          confirmButtonText: '确定',
          callback: () => {}
        })
      }
    },
    clearCurProjectSession (code) {
      let progressTemp = sessionStorage.getItem(code)
      if (progressTemp) {
        let curProject = JSON.parse(progressTemp)
        if (curProject.hasOwnProperty(this.sectionIndex)) {
          delete curProject[this.sectionIndex]
        }
        if (curProject.hasOwnProperty(this.sectionFlowStatusIndex)) {
          delete curProject[this.sectionFlowStatusIndex]
        }
        sessionStorage.setItem(code, JSON.stringify(curProject))
      } else {
        sessionStorage.setItem(code, JSON.stringify({}))
      }
    },
    // 表单分页
    indexMethod (index) {
      return index + (this.currentPage - 1) * 10 + 1
    },
    handleCurrentChange (nowNum) {
      this.currentPage = nowNum
      this.pageNo = (nowNum - 1) * this.pageSize
      this.getTableData(parseInt(this.pageNo), parseInt(this.pageSize))
    },
    handleCurrentNext (nowNum) {
      this.currentPage = nowNum
      this.pageNo = (nowNum - 1) * this.pageSize
      this.getTableData(parseInt(this.pageNo), parseInt(this.pageSize))
    },
    // 高级搜索-搜索条件选择
    conditionSelect (value, label) {
      switch (label) {
        case '项目类型':
          this.searchForm.tenderProjectType = value
          this.isTypeSelectAll = false
          break
        default:
          break
      }
    },
    // 高级搜索-取消条件
    conditionCancel (label) {
      switch (label) {
        case '项目类型':
          this.projectTypeFlag = false
          this.searchForm.tenderProjectType = null
          this.isTypeSelectAll = true
          break
        default:
          break
      }
    },
    // 项目经理 - 选择用户
    selectedUser (obj) {
      this.searchForm.firstProjectLeaderName = obj.name
      // this.addForm.tendererCode = obj.code
      // this.addForm.tendererName = obj.name
      // this.addForm.customerManagementCode = obj.code
      // this.addForm.tendererUnitAddress = this.wrapRegionText(obj)
    },
    // 选择人员弹框打开
    showUserDialog () {
      this.showUserVisible = !this.showUserVisible
    },
    // 部门树展开/关闭
    showDepartmentTree () {
      this.isShowDptTree = !this.isShowDptTree
    },
    // 选择部门
    selectedDepatment (deptTreeNode) {
      this.searchForm.departmentName = deptTreeNode.label
      this.searchForm.departmentId = deptTreeNode.id
      this.isShowDptTree = false
    }
  }
}
</script>
