<template>
  <div class="cloudcontent">
    <div class="main">
      <el-form :model="updateForm" :rules="rules" ref="updateForm" :validate-on-rule-change="true">
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目编号：">
              <el-input v-model="bidSection.tenderProjectCode" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称：">
              <el-input v-model="bidSection.tenderProjectName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="标段编号：">
              <el-input v-model="bidSection.bidSectionCode" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标段名称：">
              <el-input v-model="bidSection.bidSectionName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="投标人："  prop="bidderName">
              <el-input v-model="updateForm.bidderName" readonly>
                <el-button type="primary" slot="append" size="mini" @click="btnChoose">选择</el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="投标文件递交时间：">
              <el-date-picker
                v-model="updateForm.submissionTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="投标文件：">
              <upload-file @uploadSuccess="uploadOtherSuccess" @deleteSuccess="deleteSuccess"
                           :fileArrays="updateForm.fileInformationList"
                           fileMaxNum="1"
                           fileType="9"
                           isImage="0">
              </upload-file>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item class="submit-radio">
          <el-button type="primary" @click="submit('updateForm', 0)" :loading="isSaving">保存</el-button>
          <el-button type="primary" class="submitBtn" @click="submit('updateForm', 1)" :loading="isSubmiting">提交</el-button>
          <el-button class="cancal" @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <bidder-dialog v-if="!tradingPlatformFlag" :tenderSystemCode="tenderSystemCode" :includeNames="includeBidderNames" :flowStatus="flowStatus" :flag="flag"
                   :showVisible="showBidderVisible" @selected="selectedBidder" @showDialog="showBidderDialog"></bidder-dialog>
    <section-bidder-dialog v-if="tradingPlatformFlag" :tenderSystemCode="tenderSystemCode" :includeNames="includeBidderNames" :flowStatus="flowStatus" :flag="flag"
                           :showVisible="showBidderVisible" @selected="selectedBidder" @showDialog="showBidderDialog" :sectionSystemCode="sectionSystemCode"></section-bidder-dialog>
    <submitApproveDialog :flowStatus="flowStatus" :tenderSystemCode="tenderSystemCode" ref="approvalDialog" :showVisible="approveDialogVisable" @confirmSubmit="confirmSubmit" @handleCancel="cancelApprove"></submitApproveDialog>
  </div>
</template>
<script>
import {resultInfo, bidSection, documentInfo} from '@/api/project'
import uploadFile from '@/components/upload/publicFileUpload'
import bidderDialog from '@/pages/project/projectProcess/common/bidder_dialog.vue'
import submitApproveDialog from '@/pages/project/commonCompents/submitApproveDialog'
import sectionBidderDialog from '@/pages/project/projectProcess/common/section_bidder_dialog.vue'
export default {
  components: {
    uploadFile,
    bidderDialog,
    submitApproveDialog,
    sectionBidderDialog
  },
  name: '',
  data () {
    return {
      tenderSystemCode: this.$route.query.tenderSystemCode,
      sectionSystemCode: this.$route.query.sectionSystemCode,
      isSaving: false,
      isSubmiting: false,
      updateForm: {
        bidderName: '',
        fileInformationList: []
      },
      bidSection: {},
      rules: {
        bidderName: {required: true, message: '请填写投标人名称', trigger: ['blur', 'change']}
      },
      showBidderVisible: false,
      flowStatus: 12,
      approveDialogVisable: false,
      tradingPlatformFlag: this.$store.getters.authUser.tradingPlatformFlag,
      includeBidderNames: [],
      flag: 0
    }
  },
  methods: {
    // 上传附件
    uploadOtherSuccess (file) {
      this.updateForm.fileInformationList.push(file)
    },
    deleteSuccess (fileId) {
      this.updateForm.fileInformationList = this.updateForm.fileInformationList.filter(item => item.relativePath !== fileId)
    },
    // 提交/保存
    submit (form, status) {
      this.$refs[form].validate((vaild) => {
        if (vaild) {
          if (Object.is(status, 0)) {
            this.approveDialogVisable = false
            this.submitData(status)
          } else {
            this.approveDialogVisable = true
          }
        } else {
          return false
        }
      })
    },
    submitData (status) {
      // if (this.updateForm.fileInformationList.length < 1) {
      //   this.$message({
      //     message: '请上传附件！',
      //     type: 'warning'
      //   })
      //   return
      // }
      let msg = Object.is(status, 1) ? '提交后数据将锁定，不允许修改，确认要提交吗?' : '确定要保存吗?'
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          done()
        }
      }).then(() => {
        if (Object.is(status, 0)) {
          this.isSaving = true
          this.updateForm.auditStatus = 0
        } else if (Object.is(status, 1)) {
          this.cancelApprove()
          this.isSubmiting = true
          this.updateForm.auditStatus = 4
          this.updateForm.submitTime = new Date().getTime()
        }
        this.updateForm.tenderSystemCode = this.tenderSystemCode
        this.updateForm.sectionSystemCode = this.sectionSystemCode
        this.updateForm.type = 2
        resultInfo.update(this.updateForm).then((res) => {
          this.isSaving = false
          this.isSubmiting = false
          if (res.data.resCode === '0000') {
            this.close()
          }
        })
      }).catch(() => {
        this.isSaving = false
        this.isSubmiting = false
        return false
      })
    },
    // 确认提交
    confirmSubmit (record) {
      this.updateForm.approvalFlowExecutorList = []
      this.updateForm.manualAdditionList = []
      for (let i = 0; i < record.approveList.length; i++) {
        let obj = {
          usersId: record.approveList[i].objectId,
          flowLevel: i + 1
        }
        this.updateForm.approvalFlowExecutorList.push(obj)
      }
      if (record.noticeList && record.noticeList.length > 0) {
        this.updateForm.manualAdditionList = record.noticeList
      }
      this.submitData(1)
    },
    cancelApprove () {
      this.approveDialogVisable = false
    },
    // 取消
    close () {
      this.$store.commit('delete_tabs', this.$route.fullPath)
      this.$router.go(-1)
    },
    // 查询当前标段信息
    getBidSection () {
      bidSection.getOne(this.sectionSystemCode).then(res => {
        this.bidSection = res.data.bidSection
        if (Number(this.bidSection.tenderMode) === 1 && this.bidSection.isPreBid &&
          Number(this.bidSection.isPreBid) === 1) {
          this.flag = 1
        }
      })
    },
    // 选择投标人
    btnChoose () {
      this.showBidderVisible = true
    },
    // 选择投标人弹窗 打开/关闭
    showBidderDialog () {
      this.showBidderVisible = !this.showBidderVisible
    },
    // 已选择投标人信息
    selectedBidder (obj) {
      this.updateForm.bidderName = obj.name
      this.updateForm.bidderId = obj.objectId
    },
    getReportList () {
      let query = {
        tenderSystemCode: this.tenderSystemCode,
        sectionSystemCode: this.sectionSystemCode,
        type: 7
      }
      documentInfo.getList(query).then(res => {
        let data = res.data.documentInfoList
        this.includeBidderNames = []
        if (data) {
          data.map(item => {
            let bidderName = item.bidderName.split(';')
            let isPassQualificationExamine = item.isPassQualificationExamine.split(';')
            for (let i = 0; i < bidderName.length; i++) {
              if (Number(isPassQualificationExamine[i]) === 1) {
                this.includeBidderNames.push(bidderName[i])
              }
            }
          })
        }
      })
    }
  },
  mounted () {
    this.getBidSection()
    this.getReportList()
  }
}
</script>

<style scoped>
</style>
