<template>
  <div class="cloudcontent"  id="cloud_journalSummaryDetail">
    <div class="main" v-loading="overAllloading">
      <el-form class="submitForm" :model="submitForm" label-width="120px" ref="submitForm">
        <el-row>
          <el-col>
            <el-form-item label="标题：" prop="title"
                          :rules="{ required: true, message: '标题不能为空', trigger: 'blur' }">
              <el-input v-model="submitForm.title" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-for="(item, index) in submitForm.item" :key="index">
          <el-col :span="item[0].type === 5 || item[0].type === 6 ? 24 : 12">
            <el-form-item :label="item[0].name + '：'" :class="item[0].isFillIn === '1' ? 'bitianicon' : ''"
                          :prop="'item.' + index + '[0].value'"
                          :rules="handleRules(item[0].isFillIn === '1', item[0].type, item[0].name)"
            >
              <el-input autocomplete="off"
                        v-if="item[0].type === 1"
                        v-model="item[0].value">
              </el-input>
              <el-select v-model="item[0].value" placeholder="请选择" v-if="item[0].type === 2">
                <el-option
                  v-for="opItem in item[0].optional"
                  :key="opItem.value"
                  :label="opItem.label"
                  :value="opItem.value">
                </el-option>
              </el-select>
              <el-radio-group v-model="item[0].value" v-if="item[0].type === 3">
                <el-radio v-for="raItem in item[0].optional" :label="raItem.value" :key="raItem.value" >{{raItem.label}}</el-radio>
              </el-radio-group>
              <el-checkbox-group v-model="item[0].value" v-if="item[0].type === 4">
                <el-checkbox v-for="raItem in item[0].optional" :label="raItem.value" :key="raItem.value" >{{raItem.label}}</el-checkbox>
              </el-checkbox-group>
              <el-date-picker
                v-if="item[0].type === 7"
                v-model="item[0].value"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
              <el-date-picker
                v-if="item[0].type === 8"
                v-model="item[0].value"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
              <editor  v-if="item[0].type === 5" :ref="'ueditor' + index" class="ueditor" :editread="editread" :content="content"  @contentChange="handleContentChange(index, item[0].order)"></editor>
              <upload-file
                v-if="item[0].type === 6"
                @uploadSuccess="uploadOtherSuccess"
                @deleteSuccess="deleteSuccess"
                :fileArrays="item[0].fileInformations"
                :fileType="item[0].businessType"
                isImage="0">
              </upload-file>
            </el-form-item>
          </el-col>
          <el-col :span="item[1].type === 5 || item[1].type === 6 ? 24 : 12" v-if="item.length === 2">
            <el-form-item :label="item[1].name + '：'" :class="item[1].isFillIn === '1' ? 'bitianicon' : ''"
                          :prop="'item.' + index + '[1].value'"
                          :rules="handleRules(item[1].isFillIn === '1',item[1].type, item[1].name)">
              <el-input autocomplete="off"
                        v-if="item[1].type === 1"
                        v-model.number="item[1].value">
              </el-input>
              <el-select v-model="item[1].value" placeholder="请选择" v-if="item[1].type === 2">
                <el-option
                  v-for="opItem in item[1].optional"
                  :key="opItem.value"
                  :label="opItem.label"
                  :value="opItem.value">
                </el-option>
              </el-select>
              <el-radio-group v-model="item[1].value" v-if="item[1].type === 3">
                <el-radio v-for="raItem in item[1].optional" :label="raItem.value" :key="raItem.value" >{{raItem.label}}</el-radio>
              </el-radio-group>
              <el-checkbox-group v-model="item[1].value" v-if="item[1].type === 4">
                <el-checkbox v-for="raItem in item[1].optional" :label="raItem.value" :key="raItem.value" >{{raItem.label}}</el-checkbox>
              </el-checkbox-group>
              <el-date-picker
                v-if="item[1].type === 7"
                v-model="item[1].value"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
              <el-date-picker
                v-if="item[1].type === 8"
                v-model="item[1].value"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="main recordcontent">
      <span>接收人：</span>
      <ul class="approve">
        <li v-for="(item, index) in receiveList" :key="index">
          <div class="approve-person notice-person">
            <span :title="item.name">{{item.name}}</span>
            <img class="close" src="../../../../static/images/approve/close.png" @click="handleDel('receive', index)">
          </div>
        </li>
        <li class="add" @click="showUserDialog">
          <img src="../../../../static/images/approve/add.png">
        </li>
      </ul>
      <div class="submit-radio">
        <el-button type="primary" @click="handleClickEvent('submitForm','save')" :loading="loading">保存</el-button>
        <el-button type="primary" class="submitBtn" @click="handleClickEvent('submitForm', 'submit')" :loading="loading">提交</el-button>
        <el-button class="cancal" @click="handleClickEvent('submitForm','cancel')">取消</el-button>
      </div>
    </div>
    <select-user-dialog :showVisible="showUserVisible"  :saveSelectedUser="receiveList" @selected="selectedUser" @showDialog="showUserDialog"></select-user-dialog>
  </div>
</template>
<script>
import {templateInfo} from '@/api/system'
import {journalSummary} from '@/api/office'
import editor from '@/components/ueditor/ueditor.vue'
import uploadFile from '@/components/upload/publicFileUpload'
import selectUserDialog from '@/pages/system/users/search_user_checkbox'
export default {
  components: {
    editor,
    uploadFile,
    selectUserDialog
  },
  data () {
    return {
      overAllloading: true,
      // 富文本
      editread: false,
      content: '',
      submitForm: {
        title: '',
        item: [
        ]
      },
      receiveList: [],
      // 选择人员-接收人
      showUserVisible: false,
      loading: false
    }
  },
  methods: {
    // rules
    handleRules (isFill, type, value) {
      if (!isFill) {
        return null
      }
      let tempRule
      switch (type) {
        case 1:
          tempRule = {
            required: true, message: `${value}不能为空`, trigger: ['blur', 'change']
          }
          break
        case 2:
          tempRule = {
            required: true, message: `${value}不能为空`, trigger: ['blur', 'change']
          }
          break
        case 3:
          tempRule = {
            required: true, message: `${value}不能为空`, trigger: ['blur', 'change']
          }
          break
        case 4:
          tempRule = {
            required: true, message: `${value}不能为空`, trigger: ['blur', 'change']
          }
          break
        case 7:
          tempRule = {
            required: true, message: `${value}不能为空`, trigger: ['blur', 'change']
          }
          break
        case 8:
          tempRule = {
            required: true, message: `${value}不能为空`, trigger: ['blur', 'change']
          }
          break
      }
      return tempRule
    },
    // 查询模板项
    getTemplateItems () {
      templateInfo.getOne(this.$route.query.templateCode).then((res) => {
        let templateInfo = res.data.templateInfo
        if (templateInfo) {
          this.$set(this.submitForm, 'title', this.$store.getters.authUser.departmentName +
            this.$store.getters.authUser.userName + '的' + templateInfo.name)
          this.submitForm.item = JSON.parse(templateInfo.items)
          this.submitForm.relatedTemplateCode = templateInfo.code
          this.submitForm.templateName = templateInfo.name
          this.submitForm.templateItems = templateInfo.items
          this.overAllloading = false
        }
      })
    },
    // 查询工作日志/计划总结单条数据
    getJournalSummary () {
      journalSummary.getById(this.$route.query.objectId).then(res => {
        let journalSummary = res.data.journalSummary
        if (journalSummary) {
          this.submitForm = journalSummary
          this.$set(this.submitForm, 'item', JSON.parse(journalSummary.content))
          this.$nextTick(function () {
            this.submitForm.item.map((item, index) => {
              if (item[0].type === 5) {
                this.$refs['ueditor' + index][0].setContent(item[0].value)
              }
            })
          })
          this.receiveList = journalSummary.readRecordList
          this.receiveList.map(item => {
            item.name = item.userName
            item.objectId = item.userId
          })
          this.overAllloading = false
        }
      })
    },
    // 上传附件
    uploadOtherSuccess (file) {
      this.submitForm.item.map(item => {
        if (item[0].type === 6 && item[0].businessType === file.businessType) {
          item[0].fileInformations.push(file)
        }
      })
    },
    deleteSuccess (fileId) {
      this.submitForm.item.map(item => {
        if (item[0].type === 6) {
          item[0].fileInformations = item[0].fileInformations.filter(item => item.relativePath !== fileId)
        }
      })
    },
    // 图文
    handleContentChange (index, order) {
      if (this.$refs['ueditor' + index]) {
        this.$nextTick(function () {
          this.submitForm.item.map(item => {
            if (item[0].type === 5 && item[0].order === order) {
              item[0].value = this.$refs['ueditor' + index][0].getContent()
            }
          })
        })
      }
    },
    // 返回
    cancel (operate) {
      this.$store.commit('delete_tabs', this.$route.fullPath)
      if (Object.is(operate, 'cancel')) {
        if (Object.is(this.$route.query.type, 1)) {
          this.$router.push({path: `/office/journal`})
        } else if (Object.is(this.$route.query.type, 2)) {
          this.$router.push({path: `/office/planSummary`})
        }
      } else if (Object.is(operate, 'save')) {
        if (Object.is(this.$route.query.type, 1)) {
          this.$router.push({path: `/office/journal`, query: {active: 4}})
        } else if (Object.is(this.$route.query.type, 2)) {
          this.$router.push({path: `/office/planSummary`, query: {active: 4}})
        }
      } else if (Object.is(operate, 'submit')) {
        if (Object.is(this.$route.query.type, 1)) {
          this.$router.push({path: `/office/journal`, query: {active: 3}})
        } else if (Object.is(this.$route.query.type, 2)) {
          this.$router.push({path: `/office/planSummary`, query: {active: 3}})
        }
      }
    },
    // 接收人  选择用户
    selectedUser (array) {
      if (array) {
        this.receiveList = array
      }
    },
    // 接收人 选择人员弹框打开
    showUserDialog () {
      this.showUserVisible = !this.showUserVisible
    },
    handleDel (type, index) {
      switch (type) {
        case 'receive':
          this.receiveList.splice(index, 1)
          break
      }
    },
    handleClickEvent (form, operate) {
      if (Object.is(operate, 'cancel')) {
        this.cancel(operate)
      } else {
        this.$refs[form].validate((vaild) => {
          if (vaild) {
            for (let i = 0; i < this.submitForm.item.length; i++) {
              let item = this.submitForm.item[i]
              // 富文本校验
              if (item[0].type === 5 && item[0].isFillIn === '1') {
                if (!item[0].value) {
                  this.$message({
                    message: item[0].name + '不能为空！',
                    type: 'warning'
                  })
                  return false
                }
              }
              // 附件校验
              if (item[0].type === 6 && item[0].isFillIn === '1') {
                if (!item[0].fileInformations || item[0].fileInformations.length < 1) {
                  this.$message({
                    message: item[0].name + '不能为空！',
                    type: 'warning'
                  })
                  return false
                }
              }
            }
            if (!this.receiveList || this.receiveList.length < 1) {
              this.$message({
                message: '请选择接收人！',
                type: 'warning'
              })
              return
            } else {
              let readRecordList = []
              this.receiveList.map(item => {
                let readRecord = {
                  departmentId: item.departmentId,
                  departmentName: item.departmentName ? item.departmentName : item.department.name,
                  userId: item.objectId,
                  userName: item.name,
                  isReaded: 0
                }
                readRecordList.push(readRecord)
              })
              this.$set(this.submitForm, 'readRecordList', readRecordList)
            }
            this.loading = true
            this.submitForm.type = this.$route.query.type
            this.submitForm.content = JSON.stringify(this.submitForm.item)
            if (Object.is(operate, 'save')) {
              this.submitForm.status = 0
            } else if (Object.is(operate, 'submit')) {
              this.submitForm.sendDate = new Date().getTime()
              this.submitForm.status = 1
            }
            journalSummary.update(this.submitForm).then(res => {
              if (res.data.resCode === '0000') {
                this.loading = false
                this.cancel(operate)
              }
            })
          } else {
            this.loading = false
            return false
          }
        })
      }
    }
  },
  mounted () {
    if (this.$route.query.objectId) {
      this.getJournalSummary()
    } else {
      this.getTemplateItems()
    }
  }
}
</script>
<style lang="less">
  #cloud_journalSummaryDetail{
    .showImg{
      width:100px;
      overflow: hidden;
    }
    .showImg .el-button{
      padding: 8px 11px;
    }
    .showImg img{
      margin-top: 13px;
    }
    .imgDialog .el-dialog__header{
      border-bottom: 1px solid #eeeeee;
    }
    .imgDialog .el-dialog__body{
      padding: 0;
    }
    ul.imgList{
      width: 100%;
      overflow: hidden;
      margin: 20px 0 30px 0;
    }
    ul.imgList li{
      float: left;
      width: 80px;
      height: 80px;
      margin: 16px 30px;
      position: relative;
    }
    ul.imgList li .hover{
      position: absolute;
      left: 0;
      top: 0;
      display: none;
      cursor: pointer;
    }
    ul.imgList li:hover .hover{
      display: block;
    }
    .temTableData {
      margin-top: 20px;
      border: 0!important;
    }
    .optional span:hover{
      cursor: pointer;
      color: #409EFF;
    }
    .optionalDialog .el-dialog__header{
      border-bottom: 1px solid #eeeeee;
    }
    .optionalDialog p{
      color: #999999;
      line-height: 24px;
    }
    .optionalDialog .submit-radio{
      text-align: center;
    }
    .approve{
      width: 100%;
      margin: 20px 0;
      float: left;
      overflow: hidden;
    }
    .approve li{
      margin: 0 10px;
      overflow: hidden;
      float: left;
      display: inline-block;
    }
    .approve-person{
      width: 50px;
      height: 50px;
      display: inline-block;
      position: relative;
    }
    .approve-person span{
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-radius: 100%;
      background-color: #f2b55a;
      font-size: 12px;
      color: white;
      display: inline-block;
      overflow: hidden;
    }
    .close{
      width: 16px;
      height: 16px;
      top: 0;
      right: 0;
      position: absolute;
      cursor: pointer;
    }
    .arrow{
      display: inline-block;
      width: 12px;
      height: 8px;
      vertical-align: middle;
      margin: 0 12px;
    }
    .add{
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-radius: 100%;
      background-color: #eeeeee;
      display: inline-block;
      cursor: pointer;
      overflow: hidden;
    }
    .add img{
      width: 20px;
      height: 20px;
      vertical-align: middle;
    }
  }
</style>
