import invite from './invite.js'
import announcement from './announcement.js'
import bidDocument from './bidDocument.js'
import bidOpening from './bidOpening.js'
import bidResponse from './bidResponse.js'
import calibrationResult from './calibrationResult.js'
import chechResult from './checkResult.js'
import prequalificationFile from './prequalificationFile.js'
import prequalificationResponse from './prequalificationResponse.js'
import wasteBidResult from './wasteBidResult.js'
import exploration from './exploration.js'

export default [
  {
    path: '/project/projectProcess',
    name: '项目进度',
    meta: {
      title: '项目进度',
      active: '/project/projectProcess',
      permission: '1010401'
    },
    component: () => import(/* webpackChunkName: 'project' */ '@/pages/project/projectProcess/index')
  },
  {
    path: '/project/projectProcess/update',
    name: '补充项目详情',
    meta: {
      title: '补充项目详情',
      active: '/project/projectProcess',
      permission: '1010402'
    },
    component: () => import(/* webpackChunkName: 'project' */ '@/pages/project/projectProcess/update')
  },
  {
    path: '/project/projectProcess/detail/:code',
    name: '查看项目详情',
    meta: {
      title: '查看项目详情',
      active: '/project/projectProcess',
      permission: '1010401'
    },
    component: () => import(/* webpackChunkName: 'project' */ '@/pages/project/projectProcess/detail')
  },
  {
    // path: '/project/projectProcess/project/:code',
    path: '/project/projectProcess/project',
    name: '项目管理',
    meta: {
      title: '项目管理',
      active: '/project/projectProcess',
      permission: '1010401'
    },
    component: () => import(/* webpackChunkName: 'project' */ '@/pages/project/projectProcess/project')
  },
  {
    path: '/project/projectProcess/project/add',
    name: '项目管理-添加标段',
    meta: {
      title: '项目管理-添加标段',
      active: '/project/projectProcess',
      permission: '1010402'
    },
    component: () => import(/* webpackChunkName: 'project' */ '@/pages/project/projectProcess/addsection')
  },
  {
    path: '/project/projectProcess/project/update',
    name: '项目管理-修改标段',
    meta: {
      title: '项目管理-修改标段',
      active: '/project/projectProcess',
      permission: '1010402'
    },
    component: () => import(/* webpackChunkName: 'project' */ '@/pages/project/projectProcess/updatesection')
  },
  {
    path: '/project/projectProcess/project/detail/:code',
    name: '项目进度-查看标段',
    meta: {
      title: '项目进度-查看标段',
      active: '/project/projectProcess',
      permission: '1010401'
    },
    component: () => import(/* webpackChunkName: 'project' */ '@/pages/project/projectProcess/sectiondetail')
  },
  {
    path: '/project/projectProcess/project/process/:code',
    name: '项目进度管理',
    meta: {
      title: '项目进度管理',
      active: '/project/projectProcess',
      permission: '1010401'
    },
    component: () => import(/* webpackChunkName: 'project' */ '@/pages/project/projectProcess/process')
  },
  ...invite,
  ...announcement,
  ...bidDocument,
  ...bidOpening,
  ...bidResponse,
  ...calibrationResult,
  ...chechResult,
  ...prequalificationFile,
  ...prequalificationResponse,
  ...wasteBidResult,
  ...exploration
]
