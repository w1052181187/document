<template>
  <div class="cloudcontent expert-details" id="expert_details">
    <div class="main viewdetails">
      <el-tabs v-model="activeName">
        <el-tab-pane label="专家信息" name="first">
          <el-form :model="baseInfo" ref="baseInfo" label-width="120px" class="demo-baseInfo">
            <el-row>
              <el-col :span="12">
                <el-form-item label="专家姓名：">
                  <span>{{baseInfo.name | formatText}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别：">
                  {{baseInfo.sex === 0 ? '保密' : baseInfo.sex === 1 ? '男' : '女'}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="身份证号码：">
                  <span>{{baseInfo.idNumber | formatText}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="出生年月：">
                  <span>{{baseInfo.birthDay | formatDate}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  :label="(index === 0)? '专业类别：' : ''"
                  v-for="(item, index) in baseInfo.expertCategoryInfoList"
                  :key="index">
                  <span>{{item}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="专家分类：">
                  {{baseInfo.dicExpertClassify | formatText}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="联系方式：">
                  <span>{{baseInfo.mobileNum | formatText}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="电子邮箱：">
                  <span>{{baseInfo.email | formatText}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="所在行政区域：">
                  <span>{{baseInfo.regionText | formatText}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="详细地址：">
                  <span>{{baseInfo.address | formatText}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮政编码：">
                  <span>{{baseInfo.zipCode | formatText}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="最后毕业院校：">
                  <span>{{baseInfo.graduationCollege | formatText}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最高学历：">
                  <span>{{baseInfo.education | formatText}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="所在单位：">
                  <span>{{baseInfo.company | formatText}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否在职：">
                  <span>{{baseInfo.isOnJob != null ? (baseInfo.isOnJob === 1 ? '是' : baseInfo.isOnJob === 0 ? '否' : '---') : '---'}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="职务：">
                  <span>{{baseInfo.job | formatText}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="从业年限(年)：">
                  <span>{{baseInfo.workAge | formatText}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="技术职称：">
                  <span>{{baseInfo.technicalTitle | formatText}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  v-for="(item, index) in baseInfo.qualificationInfoList"
                  :key="index"
                  :label="(index === 0) ? '职业资格：' : ''">
                  <span style="display:inline-block;width:30%;">{{item.name}}</span>
                  <span style="display:inline-block;width:30%;">{{item.level}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="工作简历：">
                  <span>{{baseInfo.workResume | formatText}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="专家备注：">
                  <span>{{baseInfo.remarks | formatText}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="合作项目" name="second">
          <cooperators-list-detail :relatedCode="baseInfo.code"></cooperators-list-detail>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import {dateFormat} from '@/assets/js/common'
import * as region from '@/assets/js/region'
import {expertClassify} from '@/assets/js/expertClassify'
import { expert } from '@/api/resource'
import CooperatorsListDetail from './cooperators/llist_detail'
export default {
  components: {
    CooperatorsListDetail
  },
  name: 'expertEdit',
  data () {
    return {
      activeName: 'first',
      baseInfo: {
        expertCategoryInfoList: [],
        qualificationInfoList: []
      },
      // 地址三级联动
      addressOptions: region.CityInfo,
      // 专家类别集合
      expertClassifyList: expertClassify,
      mapJson: []
    }
  },
  methods: {
    /** 初始化数据 */
    initData () {
      expert.queryOne(this.$route.params.objectId).then(res => {
        this.baseInfo = res.data.data
        // 数组动态添加，如果视图没反应，则用$set方法
        this.$set(this.baseInfo, 'expertCategoryInfoList', [])
        this.$set(this.baseInfo, 'qualificationInfoList', [])
        // 获取专家分类
        if (this.baseInfo.dicExpertClassify) {

        }
        // 包装地区信息
        if (this.baseInfo.provinceId) {
          this.wrapRegionText('baseInfo')
        }
        // 包装专家类别
        if (this.baseInfo.expertCategory) {
          this.wrapExertpCategoryInfoList()
        }
        // 包装职业资格
        if (this.baseInfo.qualifications) {
          this.wrapQualificationInfoList()
        }
      })
    },
    /** 包装三级联动地址信息 */
    wrapRegionText (objName) {
      // 初始化省市县数据
      let _this = this
      _this[objName].regionText = ''
      this.addressOptions.map((item) => {
        if (item.value === _this[objName].provinceId) {
          _this[objName].regionText += item.label + '/'
          item.children.map((ite) => {
            if (ite.value === _this[objName].cityId) {
              _this[objName].regionText += ite.label + '/'
              ite.children.map((countyItem) => {
                if (countyItem.value === _this[objName].countyId) {
                  _this[objName].regionText += countyItem.label
                }
              })
            }
          })
        }
      })
    },
    /** 包装专家类别单个信息 */
    wrapSingleExpertCategory (resultArr, mapMark) {
      this.mapJson.map(item => {
        if (item.value === mapMark) {
          resultArr.push(item.label)
          this.mapJson = item.children
        }
      })
    },
    /** 包装专家类别信息 */
    wrapExpertCategoryText (objArr) {
      let resultArr = []
      this.mapJson = this.expertClassifyList
      objArr.forEach(item => {
        this.wrapSingleExpertCategory(resultArr, item)
      })
      return resultArr.join('-')
    },
    /** 包装专家类别 */
    wrapExertpCategoryInfoList () {
      this.baseInfo.expertCategory.split(';').forEach(item => {
        let objArr = item.split('-')
        this.baseInfo.expertCategoryInfoList.push(this.wrapExpertCategoryText(objArr))
      })
    },
    /** 包装职业资格 */
    wrapQualificationInfoList () {
      this.baseInfo.qualifications.split(';').forEach(item => {
        let objArr = item.split('-')
        this.baseInfo.qualificationInfoList.push({
          name: objArr[0],
          level: objArr[1]
        })
      })
    },
    /** 取消 */
    cancel () {
      this.$store.commit('delete_tabs', this.$route.fullPath)
      this.$router.push({path: `/resource/expert`})
    }
  },
  filters: {
    // 格式化时间
    formatDate (value) {
      return value ? dateFormat(value, 'yyyy-MM-dd') : '---'
    },
    // 格式化字符串
    formatText (value) {
      return value || '---'
    }
  },
  mounted () {
    this.initData()
  }
}
</script>
<style lang="less">
  #expert_details {
    .project_page {
      padding: 30px 5px;
      text-align: center;
    }
  }
</style>
