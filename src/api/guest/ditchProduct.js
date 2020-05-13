import request from '@/utils/request'

export function findYuyueProductInfo(data) {
  return request({
    url: '/product/findYuyueProductInfo',
    method: 'post',
    data
  })
}

export function deleteYuyueProduct(data) {
  return request({
    url: '/product/delYuyueProduct',
    method: 'post',
    data
  })
}

export function getChannelName(data) {
  return request({
    url: '/product/getChannelName',
    method: 'post',
    data
  })
}

export function findIproductInfos(data) {
  return request({
    url: '/product/findIproductInfos',
    method: 'post',
    data
  })
}

export function updateYuyueProduct(data) {
  return request({
    url: '/product/updateYuyueProduct',
    method: 'post',
    data
  })
}