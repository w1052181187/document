/**
 * Created by DELL on 2019/11/27.
 */
const confirmSuccess = function (context, title, callback) {
  let inst = null
  context.$confirm(title, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    beforeClose: (action, instance, done) => {
      inst = instance
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        instance.confirmButtonText = '执行中...'
        done()
      } else {
        done()
      }
    }
  }).then(() => {
    let cancelLoading = function () {
      inst.confirmButtonLoading = false
    }
    callback(cancelLoading)
  }).catch(() => {
    return false
  })
}
export {
  confirmSuccess
}
