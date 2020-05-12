import request from '@/utils/request'

export function findExternalProductAll(data) {
  return request({
    url: '/externalproduct/findExternalProductAll',
    method: 'post',
    data
  })
}