import moment from 'moment'
const filter = {};

const posMap = ['','','守门员']
filter.install = function(Vue) {
  Vue.filter('time', function (value) {
    if(isNaN(value)) return ''
    return moment(+value).format('YYYY/MM/DD HH:mm:ss')
  });
  Vue.filter('position', function (value) {
    return posMap[value]
  });
  Vue.filter('value', function (value) {
    return parseFloat(value).toFixed(2)
  });
};

export { filter as default };
