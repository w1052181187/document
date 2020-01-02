<template>
  <div class="cloudcontent" id="cloud_projectProcess">
    <approve-flow :approvalTaskCode="approvalTaskCode" :subjectCode="$route.params.code" :flowStatus="flowStatus" v-if="tableFlag && Number(updateForm.dataSource) === 0"></approve-flow>
    <div class="project-info-line" v-if="tableFlag"></div>
    <div class="main viewdetails">
      <div class="basic-approve-title">项目详情</div>
      <el-form :model="updateForm" :validate-on-rule-change="true">
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目名称：">
              <span>{{updateForm.tenderProjectName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目编号：">
              <span>{{updateForm.projectCode}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="招标项目编号：" >
             <span>{{updateForm.tenderProjectCode}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目预计收入(元)：" >
              <span>{{updateForm.projectIncome}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目类型：">
              <span>{{updateForm.tenderProjectTypeStr}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目预算（元）：">
              <span>{{updateForm.tenderProjectBudget}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="资金来源：">
              <span><p v-for="(item,index) in updateForm.fundSourceList" :key="index" class="dresult-span">
                <span v-if="Number(item.sourceOfFunds) === 1">
                  {{item.sourceOfFunds | filterSourceOfFunds}}:{{item.value}}%
                  (国有资金控股：{{item.stateOwnedCapitalHolding | filterState}}；
                  国有资金占主导地位：{{item.stateOwnedFundsPredominate| filterState}})
                </span>
                <span v-if="Number(item.sourceOfFunds) !== 0 &&Number(item.sourceOfFunds) !== 1">
                  {{item.sourceOfFunds | filterSourceOfFunds}}:{{item.value}}%
                </span>
              </p></span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="投标人征集方式：">
              <span>{{updateForm.biddingMethod | filterBiddingMethod}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="采购组织方式：" >
              <span>{{updateForm.purchasingOrganizationForm | filterPurchasingOrganizationForm}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="评标方法：" >
              <span>{{updateForm.bidEvaluationMethod}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="批准文号：">
              <span>{{updateForm.approvalNumber}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="批准单位：">
              <span>{{updateForm.approvalUnit}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="批文名称：" >
              <span>{{updateForm.approvalName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="招标人：" >
             <span>{{updateForm.tendererName}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="招标方式：">
              <span>{{updateForm.tenderMode | filterTenderMode}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="招标人单位地址：" >
              <span>{{updateForm.tendererUnitAddress}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否组织踏勘：">
              <span>{{updateForm.isToExplore | filterSyndicatedFlag}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="监督部门名称：">
              <span>{{updateForm.supervisionDepName}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="招标人账号：" v-if="updateForm.purchasingAgent">
              <span>{{updateForm.purchasingAgent}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否资格预审：" v-if="Number(updateForm.tenderMode) === 1">
              <span>{{updateForm.isPreBid | filterIsPreBid}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="ueditor_box">
            <el-form-item label="招标内容与范围及招标方案说明：">
              <editor ref="ueditor" class="ueditor" :editread="editread" :content="content"></editor>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="批复文件：">
              <el-table
                :data="updateForm.approvalFiles"
                border
                style="width: 100%" header-cell-class-name="tableheader">
                <el-table-column
                  type="index"
                  label="序号"
                  width="60"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="fileName"
                  label="文件名称"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  label="操作" align="center" width="200">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="lookFile(scope.row)">查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="附件：">
              <el-table
                :data="updateForm.otherFiles"
                border
                style="width: 100%" header-cell-class-name="tableheader">
                <el-table-column
                  type="index"
                  label="序号"
                  width="60"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="fileName"
                  label="文件名称"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  label="操作" align="center" width="200">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="lookFile(scope.row)">查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <template>
      <div class="project-info-line" v-if="tableFlag && Number(updateForm.dataSource) === 0"></div>
      <communicate-record v-if="tableFlag && Number(updateForm.dataSource) === 0" :flowStatus='flowStatus' :relatedCode="$route.params.code" :flowType='flowType' :creator="updateForm.detailSubmitter" :createName="updateForm.detailSubmitterName" :routingPath="routingPath" :nodeContent="nodeContent"></communicate-record>
      <div class="project-info-line"></div>
      <approve-record :tableFlag="tableFlag"  :isHistory="Number(updateForm.dataSource) === 1" :approvalTaskCode="approvalTaskCode" :flowStatus='flowStatus' :subjectCode="$route.params.code" ></approve-record>
    </template>
    <approve-handle :isApproved="isApproved" :approvalTaskCode="approvalTaskCode" :flowStatus="flowStatus"></approve-handle>
  </div>
</template>
<script>
import editor from '@/components/ueditor/ueditor.vue'
import {tenderProject} from '@/api/project'
import {downloadFile} from '@/assets/js/common'
import approveFlow from '@/pages/todoList/commonComponents/approveFlow.vue'
import communicateRecord from '@/pages/todoList/commonComponents/communicateRecord.vue'
import approveRecord from '@/pages/todoList/commonComponents/approveRecord.vue'
import approveHandle from '@/pages/todoList/commonComponents/approveHandle.vue'
import {approvalTask} from '@/api/todoList/flow/approval-task'
import * as region from '@/assets/js/region'
import * as industry from '@/assets/js/industry_two'
import * as bidsType from '@/assets/js/constants_three'
export default {
  components: {
    editor,
    approveFlow,
    approveRecord,
    communicateRecord,
    approveHandle
  },
  data () {
    return {
      flowStatus: 1,
      isSubmiting: false,
      // 是否显示审批（0:详情 1：审批 2：审批详情 3：我发起的详情）
      isApproved: 0,
      auditStatus: 0,
      objectId: '',
      updateForm: {
        approvalFiles: [],
        otherFiles: []
      },
      // 项目类型
      options: [{
        value: '1',
        label: '工程'
      }, {
        value: '2',
        label: '货物'
      }, {
        value: '3',
        label: '服务'
      }],
      value: '',
      // 招标方式
      typeOptions: [{
        value: '1',
        label: '公开招标'
      }, {
        value: '2',
        label: '邀请招标'
      }, {
        value: '3',
        label: '竞争性谈判'
      }, {
        value: '4',
        label: '单一来源采购'
      }, {
        value: '5',
        label: '询价采购'
      }, {
        value: '6',
        label: '竞争性磋商'
      }],
      typeValue: '',
      // 是否资格预审
      isCheckOptions: [{
        value: '1',
        label: '是'
      }, {
        value: '2',
        label: '否'
      }],
      isCheckValue: '',
      // 是否允许联合体投标
      isAllowOptions: [{
        value: '1',
        label: '是'
      }, {
        value: '2',
        label: '否'
      }],
      isAllowValue: '',
      // 富文本
      editread: true,
      content: '',
      approvalTaskCode: '',
      routingPath: '', // 路由地址
      nodeContent: '',
      flowType: 'tenderProject', // 审批类型
      tableFlag: false,
      // 地址三级联动
      addressOptions: region.CityInfo,
      selectedcityOptions: [],
      // 行业三级联动
      industryOptions: industry.industry,
      selectedIndustryOptions: [],
      // 项目类型
      tenderProjectTypes: bidsType.bidsType
    }
  },
  filters: {
    /** 招标方式 */
    filterTenderMode (value) {
      if (Number(value) === 1) {
        return '公开招标'
      } else if (Number(value) === 2) {
        return '邀请招标'
      } else if (Number(value) === 3) {
        return '竞争性谈判'
      } else if (Number(value) === 4) {
        return '单一来源采购'
      } else if (Number(value) === 5) {
        return '询价采购'
      } else if (Number(value) === 6) {
        return '竞争性磋商'
      }
    },
    /** 是否资格预审 */
    filterIsPreBid (value) {
      if (value === 0) {
        return '否'
      } else if (value === 1) {
        return '是'
      }
    },
    /** 是否允许联合体投标 */
    filterSyndicatedFlag (value) {
      if (value === 0) {
        return '否'
      } else if (value === 1) {
        return '是'
      }
    },
    /** 资金来源 */
    filterSourceOfFunds (value) {
      if (value === 1) {
        return '自有资金'
      } else if (value === 2) {
        return '专项资金'
      } else if (value === 3) {
        return '吸收资金'
      } else if (value === 4) {
        return '其他'
      } else if (value === 5) {
        return '国有企业'
      } else if (value === 6) {
        return '发改'
      } else if (value === 7) {
        return '财政'
      } else if (value === 8) {
        return '自筹'
      }
    },
    /** 国有资金控股/国有资金占主导地位 */
    filterState (value) {
      if (value === 0) {
        return '否'
      } else if (value === 1) {
        return '是'
      }
    },
    filterBiddingMethod (value) {
      if (value === 0) {
        return '公开'
      } else if (value === 1) {
        return '邀请'
      }
    },
    filterPurchasingOrganizationForm (value) {
      if (value === 0) {
        return '自行采购'
      } else if (value === 1) {
        return '政府采购'
      }
    }
  },
  watch: {
    '$route': 'init'
  },
  created () {
    this.init()
  },
  methods: {
    // 查询当前主体是否包含审批任务,有则展示审批记录等信息
    getTaskByRelatedCode (code, flowStatus) {
      approvalTask.getByRelatedCode({
        relatedCode: code,
        flowStatus: flowStatus
      }).then((res) => {
        if (res.data.resCode === '0000') {
          if (res.data.approvalTask) {
            this.tableFlag = true
            this.$nextTick(() => {
              this.$refs.ueditor.setContent(this.updateForm.tenderContent)
            })
          }
        }
      })
    },
    init () {
      this.isApproved = this.$route.query.isApproved
      this.auditStatus = this.$route.query.auditStatus
      this.approvalTaskCode = this.$route.query.code
      this.tableFlag = false
      this.getChooseTenderProjectInfo()
    },
    /** 获取当前招标项目信息 */
    getChooseTenderProjectInfo () {
      tenderProject.getBaseByCode(this.$route.params.code).then((res) => {
        if (res.data.tenderProject) {
          this.updateForm = res.data.tenderProject
          if (res.data.fundSourceList) {
            this.updateForm.fundSourceList = res.data.fundSourceList
            this.updateForm.fundSourceList.forEach(item => {
              if (item.sourceOfFunds === 1) {
                this.stateOwnedCapitalHolding = item.stateOwnedCapitalHolding
                this.stateOwnedFundsPredominate = item.stateOwnedFundsPredominate
              }
            })
          }
          // 附件信息的区分
          this.updateForm.approvalFiles = []
          this.updateForm.otherFiles = []
          if (this.updateForm.fileInformationList && this.updateForm.fileInformationList.length > 0) {
            this.updateForm.fileInformationList.forEach(item => {
              if (Number(item.businessType) === 8) { // 批复文件
                this.updateForm.approvalFiles.push(item)
              } else if (Number(item.businessType) === 9) { // 附件
                this.updateForm.otherFiles.push(item)
              }
            })
          }
          // 获取文本编辑器的内容
          if (this.updateForm.tenderContent) {
            this.$refs.ueditor.setContent(this.content = this.updateForm.tenderContent)
          }
          // 沟通记录
          this.nodeContent = this.updateForm.tenderProjectName + '详细信息'
          this.routingPath = this.updateForm.routingPath + this.$route.params.code
          // 审批信息的展示
          if (Number(this.updateForm.status) !== 6) {
            this.getTaskByRelatedCode(this.updateForm.code, this.flowStatus)
          }
          // 获取联动信息
          // this.updateForm.tenderProjectAddressStr = this.getTenderExpandsInfo(this.updateForm.tenderExpandsInfo, 'address')
          // this.updateForm.industryTypeStr = this.getTenderExpandsInfo(this.updateForm.tenderExpandsInfo, 'industry')
          this.updateForm.tenderProjectTypeStr = this.getTenderExpandsInfo(this.updateForm.tenderProjectType, 'bidsType')
        }
      })
    },
    /** 获取招标项目扩展信息 */
    getTenderExpandsInfo (tenderExpandsInfo, type) {
      let str = ''
      if (Object.is(type, 'address')) {
        let provinceId = this.getLabelName(region.CityInfo, tenderExpandsInfo.provinceId)
        let cityId = this.getLabelName(region.CityInfo, tenderExpandsInfo.cityId)
        let countyId = this.getLabelName(region.CityInfo, tenderExpandsInfo.countyId)
        if (provinceId.node) {
          str += `${provinceId.node.label}`
          str += '/'
        }
        if (cityId.node) {
          str += `${cityId.node.label}`
          str += '/'
        }
        if (countyId.node) {
          str += `${countyId.node.label}`
        }
      } else if (Object.is(type, 'industry')) {
        let industryTypeFirst = this.getLabelName(industry.industry, tenderExpandsInfo.industryTypeFirst)
        let industryTypeSecond = this.getLabelName(industry.industry, tenderExpandsInfo.industryTypeSecond)
        if (industryTypeFirst.node) {
          str += `${industryTypeFirst.node.label}`
          str += '/'
        }
        if (industryTypeSecond.node) {
          str += `${industryTypeSecond.node.label}`
        }
      } else if (Object.is(type, 'bidsType')) {
        if (tenderExpandsInfo === '1') {
          str = '工程'
        } else if (tenderExpandsInfo === '2') {
          str = '货物'
        } else if (tenderExpandsInfo === '3') {
          str = '服务'
        } else {
          /** 获取项目类型信息的集合 */
          let list = tenderExpandsInfo.split('-')
          let firstId = this.getLabelName(this.tenderProjectTypes, list[0])
          let secondId = this.getLabelName(this.tenderProjectTypes, list[1])
          let thirdId = this.getLabelName(this.tenderProjectTypes, list[2])
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
        }
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
    handleClickEvent () {
      this.$router.push({path: '/project/projectProcess'})
    },
    lookFile (file) {
      downloadFile(file.fileName, file.relativePath)
    }
  }
}
</script>
<style lang="less">
  #cloud_projectProcess {
    .el-select{
      width: 100%;
    }
  }
</style>
