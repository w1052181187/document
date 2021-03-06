/**
 * 系统管理-审批配置
 */
export default[
  {
    path: '/system/approveConfig',
    name: '审批配置',
    meta: {
      title: '审批配置',
      active: '/system/approveConfig',
      permission: 'admin'
    },
    component: () => import(/* webpackChunkName: 'system' */ '@/pages/system/approveConfig/index')
  },
  {
    path: '/system/approveConfig/projectProcess',
    name: '审批配置-项目进度审批',
    meta: {
      title: '审批配置-项目进度审批',
      active: '/system/approveConfig',
      permission: 'admin'
    },
    component: () => import(/* webpackChunkName: 'system' */ '@/pages/system/approveConfig/projectProcess/index')
  },
  {
    path: '/system/approveConfig/projectProcess/setting/:objectId',
    name: '审批配置-审批设置',
    meta: {
      title: '审批配置-审批设置',
      active: '/system/approveConfig',
      permission: 'admin'
    },
    component: () => import(/* webpackChunkName: 'system' */ '@/pages/system/approveConfig/projectProcess/approveSetting')
  },
  {
    path: '/system/approveConfig/cost',
    name: '审批配置-费用审批',
    meta: {
      title: '审批配置-费用审批',
      active: '/system/approveConfig',
      permission: 'admin'
    },
    component: () => import(/* webpackChunkName: 'system' */ '@/pages/system/approveConfig/cost/index')
  }
]
