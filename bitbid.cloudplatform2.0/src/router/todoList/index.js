export default[
  {
    path: '/todoList/initiate',
    name: '待办事项-我发起的',
    meta: {
      title: '待办事项-我发起的',
      active: '/todoList/initiate',
      permission: 'business'
    },
    component: () => import(/* webpackChunkName: 'todoList' */ '@/pages/todoList/initiate/index')
  },
  {
    path: '/todoList/need',
    name: '待办事项-待我审批',
    meta: {
      title: '待办事项-待我审批',
      active: '/todoList/need',
      permission: 'business'
    },
    component: () => import(/* webpackChunkName: 'todoList' */ '@/pages/todoList/need/index')
  },
  {
    path: '/todoList/approved',
    name: '待办事项-我已审批',
    meta: {
      title: '待办事项-我已审批',
      active: '/todoList/approved',
      permission: 'business'
    },
    component: () => import(/* webpackChunkName: 'todoList' */ '@/pages/todoList/approved/index')
  }
]
