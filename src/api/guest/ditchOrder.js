import request from '@/utils/request'

export function findYuyueOrders(data) {
  return request({
    url: '/wash/order/findYuyueOrders',
    method: 'post',
    data
  })
}

export function delYuyueOrdersByOrderNo(data) {
    return request({
      url: '/wash/order/delYuyueOrdersByOrderNo',
      method: 'post',
      data
    })
}