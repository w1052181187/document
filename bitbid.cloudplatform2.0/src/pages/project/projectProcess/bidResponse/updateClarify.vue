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
            <el-form-item label="答疑澄清开始时间："  prop="clarificationStartTime">
              <el-date-picker
                v-model="updateForm.clarificationStartTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="答疑澄清截止时间："  prop="clarificationEndTime">
              <el-date-picker
                v-model="updateForm.clarificationEndTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开标时间："  prop="bidOpeningTime">
              <el-date-picker
                v-model="updateForm.bidOpeningTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <!--<el-col :span="12" v-if="!tradingPlatformFlag">
            <el-form-item label="文件发布时间："  prop="documentReleaseTime">
              <el-date-picker
                v-model="updateForm.documentReleaseTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
          </el-col>-->
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="标段信息：" class="bitianicon">
              <el-table
                ref="multipleTable"
                :data="bidSectionList"
                border
                style="width: 100%" header-cell-class-name="tableheader"
                @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="50">
                </el-table-column>
                <el-table-column
                  prop="bidSectionCode"
                  label="标段编号"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="bidSectionCode"
                  label="标段名称"
                  show-overflow-tooltip>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="招标澄清修改文件：">
              <upload-file @uploadSuccess="uploadOtherSuccess" @deleteSuccess="deleteSuccess"
                           :fileArrays="updateForm.fileInformationList"
                           fileType="9"
                           isImage="0">
              </upload-file>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="ueditor_box">
            <el-form-item label="变更内容：">
              <editor ref="ueditor" class="ueditor" :editread="editread"></editor>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item class="submit-radio">
          <el-button type="primary" @click="submit('updateForm', 0)" :loading="isSaving">保存</el-button>
          <el-button type="primary" class="submitBtn" @click="submit('updateForm', 1)" :loading="isSubmiting">提交</el-button>
          <el-button class="cancal" @click="close">取消</el-button>
        </el-form-item>
      </el-form>
      <submitApproveDialog :tenderSystemCode="updateForm.tenderSystemCode" :showVisible="approveDialogVisable" ref="approvalDialog" @confirmSubmit="confirmSubmit" @handleCancel="cancelApprove"></submitApproveDialog>
    </div>
  </div>
</template>

<script>
import editor from '@/components/ueditor/ueditor.vue'
import uploadFile from '@/components/upload/publicFileUpload'
import {documentInfo, bidSection} from '@/api/project'
import submitApproveDialog from '@/pages/project/commonCompents/submitApproveDialog'
export default {
  components: {
    editor,
    uploadFile,
    submitApproveDialog
  },
  data () {
    return {
      isSaving: false,
      isSubmiting: false,
      updateForm: {
        fileInformationList: []
      },
      rules: {
        documentReleaseTime: {required: true, message: '请选择文件发布时间', trigger: 'change'},
        bidOpeningTime: {required: true, message: '请填写开标时间', trigger: 'change'},
        clarificationStartTime: {required: true, message: '请填写答疑澄清开始时间', trigger: 'change'},
        clarificationEndTime: {required: true, message: '请填写答疑澄清截止时间', trigger: 'change'}
      },
      // 富文本
      editread: false,
      bidSectionList: [],
      bidSection: {},
      approveDialogVisable: false,
      tradingPlatformFlag: this.$store.getters.authUser.tradingPlatformFlag
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.updateForm.bidSectionList = val
    },
    // 上传附件
    uploadOtherSuccess (file) {
      this.updateForm.fileInformationList.push(file)
    },
    deleteSuccess (fileId) {
      this.updateForm.fileInformationList = this.updateForm.fileInformationList.filter(item => item.relativePath !== fileId)
    },
    // 提交/保存
    submit (form, status) {
      if (!this.updateForm.bidSectionList || this.updateForm.bidSectionList.length < 1) {
        this.$message({
          message: '请选择标段！',
          type: 'warning'
        })
        return
      }
      this.$refs[form].validate((vaild) => {
        if (vaild) {
          // if (this.updateForm.clarificationStartTime <= dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')) {
          //   this.$message({
          //     message: '答疑澄清开始时间不得早于或等于当前时间！',
          //     type: 'warning'
          //   })
          //   return
          // }
          if (this.updateForm.clarificationEndTime <= this.updateForm.clarificationStartTime) {
            this.$message({
              message: '答疑澄清截止时间不得早于或等于答疑澄清开始时间！',
              type: 'warning'
            })
            return
          }
          if (this.updateForm.prequalificationTime <= this.updateForm.clarificationEndTime) {
            this.$message({
              message: '开标时间不得早于或等于答疑澄清截止时间！',
              type: 'warning'
            })
            return
          }
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
        } else if (Object.is(status, 1)) {
          this.cancelApprove()
          this.isSubmiting = true
          this.updateForm.auditStatus = 4
          this.updateForm.submitTime = new Date().getTime()
        }
        this.updateForm.sectionSystemCode = this.$route.query.sectionSystemCode
        this.updateForm.content = this.$refs.ueditor.getContent()
        this.updateForm.fileInformationList.map(item => {
          item.objectId = null
        })
        documentInfo.update(this.updateForm).then((res) => {
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
    getDocumentInfo () {
      documentInfo.getById(this.$route.query.objectId).then(res => {
        this.updateForm = res.data.documentInfo
        this.$refs.ueditor.setContent(this.updateForm.content)
        this.updateForm.oldSectionList = this.updateForm.bidSectionList
        this.updateForm.bidSectionList.map(section => {
          this.bidSectionList.map(item => {
            if (section.code === item.code) {
              this.$refs.multipleTable.toggleRowSelection(item)
            }
          })
        })
      })
    },
    getBidSections () {
      let query = {
        tenderSystemCode: this.$route.query.tenderSystemCode,
        flowStatus: 13
      }
      bidSection.getAddExpert(query).then(res => {
        res.data.bidSectionList.map(section => {
          this.bidSectionList.push(section)
        })
      })
    },
    // 查询当前标段信息
    getBidSection () {
      bidSection.getOne(this.$route.query.sectionSystemCode).then(res => {
        this.bidSection = res.data.bidSection
      })
    },
    init () {
      this.getDocumentInfo()
      this.getBidSections()
      this.getBidSection()
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
</style>
