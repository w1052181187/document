<template>
  <div class="cloudcontent" id="cloud_depositManage">
    <!--搜索按钮-->
    <div class="topmain">
      <div class="seacher_box advancedsearch_box">
        <span>项目名称：</span>
        <el-input class="search" placeholder="请输入项目名称关键字" style="vertical-align: top"  v-model="searchForm.projectNameLike" clearable></el-input>
        <span>项目编号：</span>
        <el-input placeholder="请输入项目编号" v-model="searchForm.projectCodeLike" clearable></el-input>
        <div class="handBtn" v-if="!showselect">
          <el-button  type="primary" class="search" @click="search">查询</el-button>
          <el-button  @click="reset">重置</el-button>
          <span @click="showselect = true" class="more">展开搜索条件</span>
        </div>
        <div class="advancedsearch" v-if="showselect">
          <el-form :model="searchForm" ref="searchForm" label-width="90px" :validate-on-rule-change="true">
            <el-row>
              <span>项目经理：</span>
              <el-input v-model="searchForm.projectLeaderName" placeholder="请选择" readonly>
                <el-button type="primary" slot="append" @click="showUserDialog">选择</el-button>
              </el-input>
              <span>标段名称：</span>
              <el-input v-model="searchForm.bidSectionNameLike" placeholder="请输入标段名称" clearable></el-input>
            </el-row>
            <el-row style="margin-top: 10px;">
              <el-col :span="9">
                <span>所属部门：</span>
                <el-input class="deptInput" v-model="searchForm.departmentName" auto-complete="off" placeholder="请选择" readonly="readonly" clearable @click.native="showDepartmentTree">
                  <i slot="suffix" class="el-input__icon el-icon-arrow-down"></i>
                </el-input>
                <tree-options :initData="searchForm.departmentId" @selectSuccess="selectedDepatment" :isShowOptions="isShowDptTree" :startWithRootFlag = "true"></tree-options>
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
      <select-user-dialog :showVisible="showUserVisible" @selected="selectedUser" @showDialog="showUserDialog"></select-user-dialog>
    </div>
    <!--搜索按钮-->
    <div class="main">
      <div class="tips">
        <p>
          <em>提醒：待退还金额合计{{this.totalMoneyRemind}}元，其中：</em>
          <span>
            逾期未退还：{{this.overdueRemind}}<br/>
            近7天需退还：{{this.recentRemind}}
          </span>
        </p>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first">
        </el-tab-pane>
        <el-tab-pane :label="'逾期未退还(' + overdueCount + ')'" name="second">
        </el-tab-pane>
        <el-tab-pane :label="'近7天需退还(' + recentCount + ')'" name="third">
        </el-tab-pane>
        <el-tab-pane label="项目进行中" name="fourth">
        </el-tab-pane>
        <el-tab-pane label="已退还" name="fifth">
        </el-tab-pane>
      </el-tabs>
      <div class="tab-content">
        <el-table
          :data="tableData"
          border
          header-cell-class-name="tableheader">
          <el-table-column
            prop="noticeName"
            label=""
            align="center"
            width="50">
            <template slot-scope="scope">
              <i class="morebtn el-icon-arrow-right" @click="btnOpen($event)"></i>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            align="center"
            :index="indexMethod"
            width="60">
          </el-table-column>
          <el-table-column
            prop="projectCode"
            label="项目编号"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="projectName"
            label="项目名称"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="departmentName"
            label="所属部门"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="projectLeaderName"
            label="项目经理"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="标段名称">
            <template slot-scope="scope">
              <p class="lineitem" :title="item.bidSectionName" v-for="(item, index) in scope.row.sectionfSettlementList" :key="index">
                {{item.bidSectionName}}
              </p>
            </template>
          </el-table-column>
          <el-table-column label="缴纳" align="center">
            <el-table-column
              label="投标人数量"
              class-name="merge_cell">
              <template slot-scope="scope">
                <p class="lineitem" :title="item.paymentNumber" v-for="(item, index) in scope.row.sectionfSettlementList" :key="index">
                  {{item.paymentNumber}}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              label="金额(元)"
              class-name="merge_cell">
              <template slot-scope="scope">
                <p class="lineitem" :title="item.paymentMoney" v-for="(item, index) in scope.row.sectionfSettlementList" :key="index">
                  {{item.paymentMoney}}
                </p>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="退还" align="center">
            <el-table-column
              label="投标人数量"
              class-name="merge_cell">
              <template slot-scope="scope">
                <p class="lineitem" :title="item.returnNumber" v-for="(item, index) in scope.row.sectionfSettlementList" :key="index">
                  {{item.returnNumber}}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              label="金额(元)"
              class-name="merge_cell">
              <template slot-scope="scope">
                <p class="lineitem" :title="item.returnMoney" v-for="(item, index) in scope.row.sectionfSettlementList" :key="index">
                  {{item.returnMoney}}
                </p>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="待退还" align="center">
            <el-table-column
              label="投标人数量"
              class-name="merge_cell">
              <template slot-scope="scope">
                <p class="lineitem" :title="item.waitReturnNumber" v-for="(item, index) in scope.row.sectionfSettlementList" :key="index">
                  {{item.waitReturnNumber}}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              label="金额(元)"
              class-name="merge_cell">
              <template slot-scope="scope">
                <p class="lineitem" :title="item.waitReturnMoney" v-for="(item, index) in scope.row.sectionfSettlementList" :key="index">
                  {{item.waitReturnMoney}}
                </p>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="操作" align="center" width="50"
            class-name="merge_cell">
            <template slot-scope="scope">
              <p class="lineitem" v-for="(item, index) in scope.row.sectionfSettlementList" :key="index">
                <el-button type="text" size="small" @click="handleDetail(scope.row)">查看</el-button>
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
  </div>
</template>
<script>
import $ from 'jquery'
import selectUserDialog from '@/pages/system/users/search_user_radio'
import TreeOptions from '@/pages/system/department/tree/tree_options'
import {settlementGroup} from '@/api/project'
export default {
  components: {
    selectUserDialog,
    TreeOptions
  },
  data () {
    return {
      // 搜索form
      searchForm: {},
      showselect: false, // 高级搜索显示隐藏
      // 负责人
      showUserVisible: false,
      // 负责部门
      // 是否展示部门树
      isShowDptTree: false,
      // tab切换
      activeName: 'first',
      // 当前页
      currentPage: 1,
      pageNo: 0,
      total: 0, // 总条数
      pageSize: 10, // 每页展示条数
      tableData: [],
      overdueRemind: '', // 提醒中逾期未退还信息
      recentRemind: '', // 提醒中近7天需退还信息
      totalMoneyRemind: 0, // 提醒中待退还总金额
      overdueCount: 0, // 逾期未退还项目数量
      recentCount: 0 // 近7天需退还项目数量
    }
  },
  methods: {
    // 负责人 - 选择用户
    selectedUser (obj) {
      this.searchForm.projectLeaderName = obj.name
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
    },
    // 序号
    indexMethod (index) {
      return index + (this.currentPage - 1) * this.pageSize + 1
    },
    // 重置
    reset () {
      this.searchForm = {}
      this.currentPage = 1
      this.pageNo = 0
      this.getTableData()
    },
    // 搜索
    search () {
      this.currentPage = 1
      this.pageNo = 0
      this.getTableData()
    },
    // 分页
    handleCurrentChange (nowNum) {
      this.currentPage = nowNum
      this.pageNo = (nowNum - 1) * this.pageSize
      this.getTableData()
    },
    handleClick (tab, event) {
      if (tab.name === 'first') {
        this.searchForm.bondStatus = null
      } else if (tab.name === 'second') {
        this.searchForm.bondStatus = 1
      } else if (tab.name === 'third') {
        this.searchForm.bondStatus = 2
      } else if (tab.name === 'fourth') {
        this.searchForm.bondStatus = 3
      } else if (tab.name === 'fifth') {
        this.searchForm.bondStatus = 4
      }
      this.getTableData()
    },
    // 表格数据 显示/隐藏
    btnOpen (event) {
      if ($(event.currentTarget).hasClass('el-icon-arrow-down')) {
        $(event.currentTarget).removeClass('el-icon-arrow-down').addClass('el-icon-arrow-right')
        $(event.currentTarget).parents('tr.el-table__row').find('.cell').css('height', '30px')
      } else {
        $(event.currentTarget).parents('tr.el-table__row').find('.cell').css('height', 'auto')
        $(event.currentTarget).removeClass('el-icon-arrow-right').addClass('el-icon-arrow-down')
      }
    },
    handleDetail (row) {
      this.$router.push({path: `/project/proSettlement/customDetails/depositList`,
        query: {text: '保证金', tenderSystemCode: row.tenderSystemCode, settlementGroupCode: row.code, isToSettle: row.isToSettle, settlementGroupName: row.name}})
    },
    getTableData () {
      let query = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        enterpriseId: this.$store.getters.authUser.enterpriseId,
        name: '保证金',
        projectNameLike: this.searchForm.projectNameLike || null,
        projectCodeLike: this.searchForm.projectCodeLike || null,
        bidSectionNameLike: this.searchForm.bidSectionNameLike || null,
        bondStatus: this.searchForm.bondStatus
      }
      if (this.searchForm.projectLeaderName) {
        query.projectLeaderName = this.searchForm.projectLeaderName
      }
      if (this.searchForm.departmentId) {
        query.departmentId = this.searchForm.departmentId
      }
      settlementGroup.getBondList(query).then((res) => {
        this.totalMoneyRemind = 0
        this.overdueRemind = ''
        this.overdueCount = 0
        this.recentRemind = ''
        this.recentCount = 0
        if (res.data.overdueMap) {
          let overdueData = res.data.overdueMap
          if (overdueData.projectCount) {
            this.overdueRemind = overdueData.projectCount + '个项目，' + overdueData.number +
              '个投标单位，待退还金额合计' + overdueData.money + '元'
            if (overdueData.money) {
              this.totalMoneyRemind = overdueData.money
            }
            this.overdueCount = overdueData.projectCount
          } else {
            this.overdueRemind = '无'
          }
        }
        if (res.data.recentMap) {
          let recentData = res.data.recentMap
          if (recentData.projectCount) {
            this.recentRemind = recentData.projectCount + '个项目，' + recentData.number +
              '个投标单位，待退还金额合计' + recentData.money + '元'
            if (recentData.money) {
              if (this.totalMoneyRemind) {
                this.totalMoneyRemind = Number(this.totalMoneyRemind.replace(/,/g, '')) + Number(recentData.money.replace(/,/g, ''))
              } else {
                this.totalMoneyRemind = Number(recentData.money.replace(/,/g, ''))
              }
            }
            this.recentCount = recentData.projectCount
          } else {
            this.recentRemind = '无'
          }
        }
        if (Number(this.totalMoneyRemind) > 0) {
          this.totalMoneyRemind = (this.totalMoneyRemind.toFixed(2) + '').split('').reverse().join('')
            .replace(/(\d{3})(?=\d)/g, '$1,').split('').reverse().join('')
        }
        if (res.data.settlementGroupList && res.data.settlementGroupList.list) {
          this.tableData = res.data.settlementGroupList.list
          this.total = res.data.settlementGroupList.total
        } else {
          this.tableData = []
          this.total = 0
        }
      })
    }
  },
  mounted () {
    this.getTableData()
  },
  destroyed () {
  }
}
</script>
<style lang="less">
  #cloud_depositManage {
    .el-input-group>.el-input__inner{
      display: inline-block;
    }
    .el-col-9 .el-tree{
      max-width: 40%;
      margin-left: 80px;
    }
    .tips{
      width: 100%;
      padding: 12px;
      line-height: 24px;
      overflow: hidden;
      background: #fff1e4;
      border: 1px solid #fe8d24;
      color: #fe8d24;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      margin-bottom: 10px;
    }
    .tips p{
      width: 100%;
      color: #fe8d24;
      float: left;
      text-align: left;
    }
    .tips p em{
      font-style: normal;
      display: inline-block;
      float: left;
    }
    .tips span{
      display: inline-block;
      float: left;
    }
    .el-tabs__item{
      min-width: 100px;
      text-align: center;
    }
    .el-tabs__header{
      margin-bottom: 30px;
    }
    .el-table .cell {
      height: 30px;
      line-height: 30px;
    }
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
    th.tableheader{
      padding: 4px 0;
      background: #eeeeee;
    }
  }
</style>
