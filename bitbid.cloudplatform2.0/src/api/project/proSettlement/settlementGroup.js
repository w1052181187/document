import request from '@/utils/axios/components-axios'

export const settlementGroup = {
  /**
   * 查询招标项目接口
   */
  getList (query) {
    return request({
      url: '/settlementGroup-infos',
      method: 'get',
      params: query
    })
  },
  /**
   * 查询单条招标项目接口
   */
  getOne (code) {
    return request({
      url: '/settlementGroup-infos/' + code,
      method: 'get'
    })
  },
  /**
   * 新增招标项目接口
   * @param {*} data [主体数据]
   */
  save (data) {
    return request({
      url: '/settlementGroup-infos',
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
      url: '/settlementGroup-infos/' + id,
      method: 'delete'
    })
  },
  /**
   * 查询保证金列表接口
   */
  getBondList (query) {
    return request({
      url: '/settlementGroup-infos/bondList',
      method: 'get',
      params: query
    })
  },
  /**
   * 查询当前用户管辖范围下的未退还,以及近七天需要退还保证金的投标人人数
   */
  getUnReturnPeopleCount (query) {
    return request({
      url: '/settlementGroup-infos/getUnReturnPeopleCount',
      method: 'get',
      params: query
    })
  },
  /**
   * 查询当前用户管辖范围下的未退还,以及近七天需要退还保证金的数据
   */
  getUnReturnListByBidSection (query) {
    return request({
      url: '/settlementGroup-infos/getUnReturnListByBidSection',
      method: 'get',
      params: query
    })
  }
}
