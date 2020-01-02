<template>
  <div class="cloudcontent" id="cloud_processedit">
    <approve-flow :approvalTaskCode="approvalTaskCode" :subjectCode="$route.params.code" v-if="tableFlag"></approve-flow>
    <div class="project-info-line" v-if="tableFlag"></div>
    <div class="main viewdetails">
      <div class="basic-approve-title">中标确认函</div>
      <el-form :model="updateForm" :validate-on-rule-change="true">
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目名称：">
              <span>{{updateForm.tenderProjectName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目编号：" >
              <span>{{updateForm.tenderProjectCode}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="标段名称：">
              <span>{{updateForm.bidSectionName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标段编号：">
              <span>{{updateForm.bidSectionCode}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="中标信息：">
              <el-table
                :data="updateForm.candidateList"
                border
                style="width: 100%" header-cell-class-name="tableheader">
                <el-table-column
                  prop="bidderName"
                  label="中标人"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="bidPrice"
                  label="中标价格（元）">
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="其他类型中标价：">
              <editor ref="price_ueditor" class="ueditor" :editread="editread"  :content="priceContent"></editor>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="ueditor_box">
            <el-form-item label="其他说明：">
              <editor ref="ueditor" class="ueditor" :editread="editread"  :content="content"></editor>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="定标附件：">
              <el-table
                :data="updateForm.calibrationFileInformationList"
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
                :data="updateForm.otherFileInformationList"
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
      <div class="project-info-line" v-if="tableFlag"></div>
      <communicate-record v-if="tableFlag" :relatedCode="$route.params.code" :flowType='flowType' :creator="updateForm.submitter" :createName="updateForm.submitterName" :routingPath="routingPath" :nodeContent="nodeContent"></communicate-record>
      <div class="project-info-line"></div>
      <approve-record :tableFlag="tableFlag"  :approvalTaskCode="approvalTaskCode" :flowStatus='flowStatus' :subjectCode="$route.params.code" ></approve-record>
    </template>
    <approve-handle :isApproved="isApproved" :approvalTaskCode="approvalTaskCode"></approve-handle>
  </div>
</template>
<script>
import editor from '@/components/ueditor/ueditor.vue'
import {downloadFile} from '@/assets/js/common'
import {winBiddingConfirmationLetter} from '@/api/project'
import approveFlow from '@/pages/todoList/commonComponents/approveFlow.vue'
import communicateRecord from '@/pages/todoList/commonComponents/communicateRecord.vue'
import approveRecord from '@/pages/todoList/commonComponents/approveRecord.vue'
import approveHandle from '@/pages/todoList/commonComponents/approveHandle.vue'
import {approvalTask} from '@/api/todoList/flow/approval-task'
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
      flowStatus: 22,
      isSubmiting: false,
      // 是否显示审批（0:详情 1：审批 2：审批详情 3：我发起的详情）
      isApproved: 0,
      auditStatus: 0,
      updateForm: {},
      bidSection: {},
      // 富文本
      editread: true,
      objectId: '',
      approvalTaskCode: '',
      routingPath: '', // 路由地址
      nodeContent: '',
      flowType: 'tenderProject', // 审批类型
      tableFlag: false,
      winBiddingConfirmationLetterSystemCode: this.$route.params.code,
      priceContent: '',
      content: ''
    }
  },
  methods: {
    lookFile (file) {
      downloadFile(file.fileName, file.relativePath)
    },
    detail () {
      winBiddingConfirmationLetter.getOne(this.winBiddingConfirmationLetterSystemCode).then((res) => {
        if (res.data.resCode === '0000') {
          this.updateForm = res.data.winBiddingConfirmationLetter
          this.updateForm.calibrationFileInformationList = []
          this.updateForm.otherFileInformationList = []
          if (this.updateForm.fileInformationList.length > 0) {
            this.updateForm.fileInformationList.forEach(item => {
              if (Number(item.businessType) === 9) {
                this.updateForm.calibrationFileInformationList.push(item)
              } else if (Number(item.businessType) === 10) {
                this.updateForm.otherFileInformationList.push(item)
              }
            })
          }
          // 获取文本编辑器的内容
          this.$refs.price_ueditor.setContent(this.priceContent = this.updateForm.otherTypesBidPrice)
          this.$refs.ueditor.setContent(this.content = this.updateForm.otherContent)
          // 沟通记录
          this.nodeContent = this.updateForm.tenderProjectName + this.updateForm.bidSectionName + '中标确认函'
          this.routingPath = this.updateForm.routingPath + this.$route.params.code + '?sectionSystemCode=' + this.$route.query.sectionSystemCode
          // 审批信息的展示
          if (Number(this.updateForm.auditStatus) !== 0) {
            this.getTaskByRelatedCode(this.updateForm.code, this.flowStatus)
          }
        }
      })
    },
    /** 拆分候选人信息 */
    splitCandidateName (candidateNameStr) {
      let candidateList = []
      let list = candidateNameStr.split(',')
      if (list.length > 0) {
        for (let i = 0; i < list.length; i++) {
          candidateList.push({name: list[i]})
        }
      }
      return candidateList
    },
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
              this.$refs.price_ueditor.setContent(this.updateForm.otherTypesBidPrice ? this.updateForm.otherTypesBidPrice : '')
              this.$refs.ueditor.setContent(this.updateForm.otherContent ? this.updateForm.otherContent : '')
            })
          }
        }
      })
    },
    init () {
      this.isApproved = this.$route.query.isApproved
      this.auditStatus = this.$route.query.auditStatus
      this.approvalTaskCode = this.$route.query.code
      this.detail()
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
<style lang="less">
  #cloud_processedit{
  }
</style>
