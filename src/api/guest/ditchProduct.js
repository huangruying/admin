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

export function updateYuyueProductInfo(data) {
  return request({
    url: '/product/updateYuyueProductInfo',
    method: 'post',
    data
  })
}

export function saveYuyueProduct(data) {
  return request({
    url: '/product/saveYuyueProduct',
    method: 'post',
    data
  })
}

export function getYyProductById(data) {
  return request({
    url: '/product/getYyProductById',
    method: 'post',
    data
  })
}

export function updateExamine(data) {
  return request({
    url: '/product/updateExamine',
    method: 'post',
    data
  })
}