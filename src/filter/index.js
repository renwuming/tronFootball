import moment from 'moment'
const filter = {};

filter.install = function(Vue) {
  Vue.filter('time', function (value) {
    if(isNaN(value)) return ''
    return moment(+value).format('YYYY/MM/DD HH:mm:ss')
  });
};

export { filter as default };
