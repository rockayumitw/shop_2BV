import Vue from 'vue'
Vue.filter('dateFormat', (value, format = 'YYYY-MM-DD') => {
    let datetime = moment(value)
    return datetime.format(format)
  })
  
  Vue.filter('dateFormatFromUTC', (value, format = 'YYYY-MM-DD') => {
    let UTC = moment.tz(value, 'UTC')
    let timezone = moment.tz.guess()
  
    return UTC.clone().tz(timezone).format(format)
  })