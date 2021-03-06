import request from '@/utils/axios/projectflow-axios'

export const tenderProject = {
  /**
   * 查询招标项目接口
   */
  getList (query) {
    return request({
      url: '/tenderProject-infos',
      method: 'get',
      params: query
    })
  },
  /**
   * 查询与投标人相关联项目接口
   */
  bidderRelatedProjcetList (query) {
    return request({
      url: '/tenderProject-infos/bidderRelatedProjcetList',
      method: 'get',
      params: query
    })
  },
  /**
   * 查询单条招标项目接口
   */
  getOne (code) {
    return request({
      url: '/tenderProject-infos/' + code,
      method: 'get'
    })
  },
  /**
   * 新增招标项目接口
   * @param {*} data [主体数据]
   */
  save (data) {
    return request({
      url: '/tenderProject-infos',
      method: 'post',
      data: data
    })
  },
  /**
   * 删除招标项目接口
   * @param {[long]} id [主键]
   */
  delete (id) {
    return request({
      url: '/tenderProject-infos/' + id,
      method: 'delete'
    })
  },
  /**
   * 添加详情时展示部分概况信息接口
   */
  getBaseByCode (code) {
    return request({
      url: '/tenderProject-infos/queryBaseByCode/' + code,
      method: 'get'
    })
  },
  /**
   * 根据标段code获取对应的招标项目信息
   */
  getByBidSectionCode (bidSectionCode) {
    return request({
      url: '/tenderProject-infos/queryByBidSectionCode/' + bidSectionCode,
      method: 'get'
    })
  },
  /**
   * 查询招标项目接口
   */
  getListInProjectSum (query) {
    return request({
      url: '/tenderProject-infos/listInProjectSum',
      method: 'get',
      params: query
    })
  },
  /**
   * 档案管理：历史项目的修改/新增
   * @param {*} data [主体数据]
   */
  saveInArchives (data) {
    return request({
      url: '/tenderProject-infos/updateInArchives',
      method: 'post',
      data: data
    })
  },
  /**
   * 查询招标项目接口
   */
  getListInSettlement (query) {
    return request({
      url: '/tenderProject-infos/listInSettlement',
      method: 'get',
      params: query
    })
  },
  /**
   * gd:项目详情-招标人账号检测
   */
  checkPurchasingAgent (purchasingAgent) {
    return request({
      url: '/tenderProject-infos/checkPurchasingAgent/' + purchasingAgent,
      method: 'get'
    })
  }
}
