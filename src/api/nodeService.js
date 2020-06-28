import request from '@/utils/request'

export function findCarwashTypes(data) {
    return request({
      url: '/wash/serviceType/findCarwashTypes',
      method: 'post',
      data
    })
  }

  export function delCarwashsType(data) {
    return request({
      url: '/wash/serviceType/delCarwashsType',
      method: 'post',
      data
    })
  }

  export function updateCarwashsType(data) {
    return request({
      url: '/wash/serviceType/updateCarwashsType',
      method: 'post',
      data
    })
  }

  export function saveCarwashsType(data) {
    return request({
      url: '/wash/serviceType/saveCarwashsType',
      method: 'post',
      data
    })
  }