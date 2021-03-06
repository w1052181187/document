export default [
  {
    path: '/archives/borrow',
    name: '档案借阅',
    meta: {
      title: '档案借阅',
      active: '/archives/borrow',
      permission: '1070101'
    },
    component: () => import(/* webpackChunkName: 'archives' */ '@/pages/archives/borrow/index')
  },
  {
    path: '/archives/borrow/detail/:objectId',
    name: '查看档案借阅申请',
    meta: {
      title: '查看档案借阅申请',
      active: '/archives/borrow',
      permission: '1070101'
    },
    component: () => import(/* webpackChunkName: 'archives' */ '@/pages/archives/borrow/detail')
  }
]
