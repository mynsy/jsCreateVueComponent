# jsCreateVueComponent
使用js创建vue动态组件
### 说明：
动态组件就是：在需要的时候才创建的组件
### 场景：
例如：tips提示框，confirm确认框。。。
### 主要代码：
```js
  // 封装一个函数
  // js动态组件
  let myAlert = (function () {
    // 默认参数
    let defaults = {
      title: '弹窗',
      content: '',
      confirm: null,
      cancel: null
    };
    // 创建html模板，这个模板可以抽离出来，写成Vue组件
    let alertTemp =  {
      template: `<div id="alert">
          <h2>{{customTitle}}</h2>
          <p>{{customContent}}</p>
          <div>
            <button v-if="customConfirm" @click="customConfirm">确定</button>  
            <button v-if="customCancel" @click="customCancel">取消</button>  
          </div>
        </div>`
    };
    // 创建一个Vue的构造函数
    let alertComp = Vue.extend(alertTemp);

    return function (opts) {
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
```

### 使用：
```js
// 使用
myAlert({
  title: '呵呵哒',
  content: '我是弹窗',
  confirm: function () {
    alert(1)
  },
  cancel: function (ev) {
    document.body.removeChild(document.getElementById('alert'))
  }
});
```

### final:
使用模块化方式是更好的选择，查看`（alert.vue 和 alert.js）`