<template>
  <div class="main">
    <el-dialog title="上传投标报名表" width="600px"  :visible.sync="showVisible">
      <el-form :model="addForm"  ref="addForm" label-width="100px" :validate-on-rule-change="true">
        <el-row>
          <el-col :span="24">
            <el-form-item label="附件：" class="bitianicon">
              <upload-file @uploadSuccess="uploadOtherSuccess" @deleteSuccess="deleteSuccess"
                           :fileArrays="addForm.fileInformationList"
                           fileMaxNum="1"
                           fileType="9"
                           isImage="0">
              </upload-file>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item class="submit-radio text-center" label-width="0px" style="text-align: center; padding-right: 0px; margin-bottom: 0px;">
          <el-button type="primary" @click="handleClickEvent('addForm','save')" :loading="loading">保存</el-button>
          <el-button type="primary" class="submitBtn" @click="handleClickEvent('addForm','submit')" :loading="loading">提交</el-button>
          <el-button class="cancal" @click="handleClickEvent('addForm','cancel')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <submitApproveDialog :flowStatus="flowStatus" :tenderSystemCode="addForm.tenderSystemCode" :showVisible="approveDialogVisable" @confirmSubmit="confirmSubmit" @handleCancel="cancelApprove"></submitApproveDialog>
  </div>
</template>
<script>
import uploadFile from '@/components/upload/publicFileUpload'
import {documentInfo} from '@/api/project'
import submitApproveDialog from '@/pages/project/commonCompents/submitApproveDialog'
export default {
  components: {
    uploadFile,
    submitApproveDialog
  },
  data () {
    return {
      addForm: {
        fileInformationList: []
      },
      loading: false,
      approveDialogVisable: false,
      flowStatus: 6
    }
  },
  props: ['showVisible', 'code'],
  watch: {
    'code': 'getDocumentInfo'
  },
  methods: {
    // 上传附件
    uploadOtherSuccess (file) {
      this.addForm.fileInformationList.push(file)
    },
    deleteSuccess (fileId) {
      this.addForm.fileInformationList = this.addForm.fileInformationList.filter(item => item.relativePath !== fileId)
    },
    handleClickEvent (formName, type) {
      if (Object.is(type, 'submit') || Object.is(type, 'save')) {
        if (this.addForm.fileInformationList.length < 1) {
          this.$message({
            message: '请上传附件！',
            type: 'warning'
          })
          return
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (Object.is(type, 'save')) {
              this.approveDialogVisable = false
              this.submitData(type)
            } else {
              this.approveDialogVisable = true
            }
          } else {
            return false
          }
        })
      } else if (Object.is(type, 'cancel')) {
        this.$emit('showDialog', false)
      }
    },
    submitData (type) {
      let msg = Object.is(type, 'submit') ? '提交后数据将锁定，不允许修改，确认要提交吗?' : '确认要保存吗?'
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          done()
        }
      }).then(() => {
        this.loading = true
        if (Object.is(type, 'save')) {
          this.addForm.auditStatus = 0
        } else if (Object.is(type, 'submit')) {
          this.addForm.auditStatus = 4
          this.addForm.submitTime = new Date().getTime()
        }
        this.addForm.fileInformationList.map(item => {
          item.objectId = null
        })
        documentInfo.update(this.addForm).then((res) => {
          if (res.data.resCode === '0000') {
            this.loading = false
            this.cancelApprove()
            this.$emit('showDialog', false)
            this.$emit('reload', true)
          }
        })
      }).catch(() => {
        this.loading = false
        return false
      })
    },
    // 确认提交
    confirmSubmit (record) {
      this.addForm.approvalFlowExecutorList = []
      this.addForm.manualAdditionList = []
      for (let i = 0; i < record.approveList.length; i++) {
        let obj = {
          usersId: record.approveList[i].objectId,
          flowLevel: i + 1
        }
        this.addForm.approvalFlowExecutorList.push(obj)
      }
      if (record.noticeList && record.noticeList.length > 0) {
        this.addForm.manualAdditionList = record.noticeList
      }
      this.submitData('submit')
    },
    cancelApprove () {
      this.approveDialogVisable = false
    },
    getDocumentInfo () {
      if (!this.code) {
        return
      }
      documentInfo.getByCode(this.code).then(res => {
        if (res.data.documentInfo) {
          this.addForm = res.data.documentInfo
          this.addForm.fileInformationList = res.data.documentInfo.fileInformationList
        }
      })
    }
  },
  mounted () {
    this.getDocumentInfo()
  }
}
</script>
<style scoped>
</style>
