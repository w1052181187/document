export default [
  {
    path: '/archives/transfer',
    name: '档案移交',
    meta: {
      title: '档案移交',
      active: '/archives/transfer',
      permission: '1070101'
    },
    component: () => import(/* webpackChunkName: 'archives' */ '@/pages/archives/transfer/index')
  },
  {
    path: '/archives/transfer/add/:objectId',
    name: '新增档案移交',
    meta: {
      title: '新增档案移交',
      active: '/archives/transfer',
      permission: '1070102'
    },
    component: () => import(/* webpackChunkName: 'archives' */ '@/pages/archives/transfer/add')
  },
  {
    path: '/archives/transfer/detail/:objectId',
    name: '查看档案移交情况',
    meta: {
      title: '查看档案移交情况',
      active: '/archives/transfer',
      permission: '1070101'
    },
    component: () => import(/* webpackChunkName: 'archives' */ '@/pages/archives/transfer/detail')
  },
  {
    path: '/archives/transfer/addHistory',
    name: '添加项目',
    meta: {
      title: '添加项目',
      active: '/archives/transfer'
    },
    component: () => import(/* webpackChunkName: 'archives' */ '@/pages/archives/transfer/addHistory')
  },
  {
    path: '/archives/transfer/historyList',
    name: '项目列表',
    meta: {
      title: '项目列表',
      active: '/archives/transfer'
    },
    component: () => import(/* webpackChunkName: 'archives' */ '@/pages/archives/transfer/historyList')
  },
  {
    path: '/archives/transfer/updateHistory/:code',
    name: '编辑项目',
    meta: {
      title: '编辑项目',
      active: '/archives/transfer'
    },
    component: () => import(/* webpackChunkName: 'archives' */ '@/pages/archives/transfer/addHistory')
  },
  {
    path: '/archives/transfer/historyDetail/:code',
    name: '查看项目信息',
    meta: {
      title: '查看项目信息',
      active: '/archives/transfer'
    },
    component: () => import(/* webpackChunkName: 'archives' */ '@/pages/archives/transfer/historyDetail')
  }
]
