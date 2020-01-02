import request from '@/utils/axios/projectflow-axios'

export const approvalTask = {
  // 我发起的审批任务
  launchedByMe (query) {
    return request({
      url: '/approvalTasks/launchedByMe',
      method: 'get',
      params: query
    })
  },
  // 审批任务详情
  detail (objectId) {
    return request({
      url: '/approvalTasks/' + objectId,
      method: 'get'
    })
  },
  // 查询审批任务
  getByRelatedCode (params) {
    return request({
      url: '/approvalTasks/getByRelatedCode',
      method: 'get',
      params: params
    })
  },
  // 撤回我的审批任务
  recallMyTask (query) {
    return request({
      url: '/approvalTasks/' + query,
      method: 'put'
    })
  },
  // 待我审批的审批任务
  needMeApproval (query) {
    return request({
      url: '/approvalTasks/needMeApproval',
      method: 'get',
      params: query
    })
  },
  // 待我审批的审批任务详情
  needMeApprovalOne (objectId) {
    return request({
      url: '/approvalTasks/needMeApproval/' + objectId,
      method: 'get'
    })
  },
  // 获取当前任务的所有审批人
  getApprovalFlowExecutorList (relatedCode) {
    return request({
      url: '/approvalTasks/getApprovalFlowExecutorList/' + relatedCode,
      method: 'get'
    })
  },
  // 获取当前任务的所有审批人通过主体code
  getApprovalFlowExecutorListBySubjectCode (params) {
    return request({
      url: '/approvalTasks/getApprovalFlowExecutorListBySubjectCode',
      method: 'get',
      params: params
    })
  },
  // 转交审批
  deliverTask (userId, taskCode) {
    return request({
      url: '/approvalTasks/deliverTask/' + userId + '/' + taskCode,
      method: 'put'
    })
  },
  // 获取知会人
  getNotifyPeopleList (query) {
    return request({
      url: '/approvalTasks/getNotifyPeopleList',
      method: 'get',
      params: query
    })
  },
  // 通过审批任务code催办审批
  urgeApprovalByTaskCode (taskCode) {
    return request({
      url: '/approvalTasks/urgeApprovalByTaskCode/' + taskCode,
      method: 'put'
    })
  },
  // 通过审批关联code催办审批
  urgeApprovalByRelatedCode (relatedCode) {
    return request({
      url: '/approvalTasks/urgeApprovalByRelatedCode/' + relatedCode,
      method: 'put'
    })
  },
  // 撤回审批
  withDrawByRelatedCode (relatedCode) {
    return request({
      url: '/approvalTasks/withDrawByRelatedCode/' + relatedCode,
      method: 'put'
    })
  },
  // 撤回审批
  checkedReturnFlag (relatedCode) {
    return request({
      url: '/approvalTasks/checkedReturnFlag/' + relatedCode,
      method: 'get'
    })
  },
  // 通过关联code获取审批任务code
  getCodeByRelatedCode (relatedCode) {
    return request({
      url: '/approvalTasks/getCodeByRelatedCode/' + relatedCode,
      method: 'get'
    })
  },
  // 通过关联code判断是否可以撤回
  checkedReturnFlagByRelatedCode (relatedCode) {
    return request({
      url: '/approvalTasks/checkedReturnFlagByRelatedCode/' + relatedCode,
      method: 'get'
    })
  }
}
