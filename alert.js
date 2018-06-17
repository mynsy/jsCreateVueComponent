import Vue from './vue-2.5.16'
import alert from './alert.vue'

// js动态组件
let myAlert = (function () {
  // 默认参数
  let defaults = {
    title: '弹窗',
    content: '',
    confirm: null,
    cancel: null
  };
  // 创建一个Vue的构造函数
  let alertComp = Vue.extend(alert);

  return function (opts, auto=false) {
    // 遍历传递进来的对象属性，赋值给默认参数
    for (let attr in opts) {
      defaults[attr] = opts[attr];
    }
    // 创建Vue实例
    let vm = new alertComp({
      // alertTemp需要替换的元素
      el: document.createElement('div'),
      // 设置vue的data数据
      data: {
        customTitle: defaults.title,
        customContent: defaults.content,
        customConfirm: defaults.confirm,
        customCancel: defaults.cancel,
      }
    });
    // 把组件添加到body中
    let bodyEle = document.body || document.documentElement;
    bodyEle.appendChild(vm.$el); // 把vue 组件添加到DOM中
    // 如果传递了auto参数，2秒后删除
    if(auto) {
      setTimeout(function () {
        bodyEle.removeChild(vm.$el)
      },1000)
    }
  }
})();

export default myAlert

// 使用
// myAlert({
//   title: '呵呵哒',
//   content: '我是弹窗',
//   confirm: function () {
//     alert(1)
//   },
//   cancel: function (ev) {
//     document.body.removeChild(document.getElementById('alert'))
//   }
// });