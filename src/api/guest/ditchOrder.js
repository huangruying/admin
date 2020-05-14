import request from '@/utils/request'

export function findYuyueOrders(data) {
  return request({
    url: '/order/findYuyueOrders',
    method: 'post',
    data
  })
}

export function delYuyueOrdersByOrderNo(data) {
    return request({
      url: '/order/delYuyueOrdersByOrderNo',
      method: 'post',
      data
    })
}