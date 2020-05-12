import request from '@/utils/request'

export function findYuyueProductInfo(data) {
  return request({
    url: '/product/findYuyueProductInfo',
    method: 'post',
    data
  })
}