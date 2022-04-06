# vue进阶用法
## 特征一：模板化
### 插槽
#### 默认插槽
组件外部维护参数以及结构，内部安排位置。

#### 具名插槽
以name标识插槽的身份，从而在组件内部做到可区分

#### 作用域插槽
slot-scope（2.6 before）
v-slot(after)
外部做结构描述勾勒，内部做传参。

详细内容请移步[插槽](https://cn.vuejs.org/v2/guide/components-slots.html)

### 模板数据的二次加工
1. watch、computed(可以缓存数据) => 相应流过于复杂（尽量不要在computed中赋值）
2. 方案一：函数 - 独立、管道 / 缺点无法响应式
   方案二：v-html 
   方案三：过滤器 - 拿不到当前的实例，这是一个纯函数，没有跟当前的环境有关联，这个是比较推荐的方案
   ```js
   // 属性
    filters: {
        // 过滤器
        moneyFilter(money) {
        return money > 99 ? 99 : money
        }
    }
    // template
    <h1>{{ money | moneyFilter }}</h1>
    <h1 v-html="money > 99 ? 99 : money"></h1>
   ```

### jsx 更自由的基于js书写
Vue 推荐在绝大多数情况下使用模板来创建你的 HTML。但是在某些场景下，也支持使用jsx语法来编写你的代码。
```js
render(h) {
    const moneyNode = (
      <p>{ this.money > 99 ? 99 : this.money }</p>
    );

    return (
      <ul class="list">
        {
          this.options.map((item, index) => {
            return (
              <content
                onClick={this.handleClick}
                item={item}
                value={item.value}
                key={index}>
                { moneyNode }  
              </content>
            )
          })
        }
      </ul>
    )
  }
```
特点
* 1. 不支持v-model 如何实现 => 双向绑定 => 外层bind:value，内层@input
* 2. 写jsx的好处，可以使用js编写代码。劣势 => vue的编译路径：template->render->vm.render->vm.render() diff => 这样看似使用render会少一步编译，节约性能，实际上在template中做了很多优化处理，比如排除那些静态的dom，所以还是比较推荐使用template。

## 特征二：组件化
### 传统模板化
```js
    Vue.component('component', {
        template: '<h1>组件</h1>'
    })
    new Vue({
        el: '#app'
    })
    // functional components
```
* 1. 抽象复用
* 2. 精简 & 聚合

### 混入mixin - 逻辑混入
* 1. 应用： 抽离公共逻辑（逻辑相同，模板不同，可用mixin）
* 2. 缺点： 数据来源不明确
* 3. 合并策略
    a. 递归合并
    b. data合并冲突时，以组件优先
    c. 生命周期回调函数不会覆盖，会先后执行，优先级为先mixin后组件

mixins.js
```js
export default {
    data() {
        return {
            msg: '我是mixin',
            obj: {
                title: 'mixinTitle',
                header: 'mixinHeader'
            }
        }
    },
    created() {
        console.log('mixin created');
    }
}
```
使用
```html
<script>
import demoMixin from './fragments/demoMixin'
export default {
  name: 'HelloWorld',
  mixins: [demoMixin],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      slotProps: 'maile start',
      money: 100,
      obj: {
        number: 123,
        text: 'text',
        header: 'header'
      }
    }
  },
  created() {
    console.log(this.$data)
    console.log('component created');
  }
}
</script>
```

### 继承拓展extends - 逻辑拓展
* 1. 应用： 拓展独立逻辑
* 2. 与mixin的区别，传值mixin为数组
* 3. 合并策略
    a. 同mixin，也是递归合并
    b. 合并优先级 组件 > mixin > extends
    c. 回调优先级 extends > mixin

demoExtends.js

```js
export default {
    data() {
        return {
            msg: '我是extends',
            obj: {
                title: 'extendsTitle',
                header: 'extendsHeader',
                shoes: 'extendsShoes'
            }
        }
    },
    created() {
        console.log('extends created');
    }
}
```
使用
```html
<script>
import demoExtends from './fragments/demoExtends'
export default {
  name: 'HelloWorld',
  extends: demoExtends,
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      slotProps: 'maile start',
      money: 100,
      obj: {
        number: 123,
        text: 'text',
        header: 'header'
      }
    }
  },
  created() {
    console.log(this.$data)
    console.log('component created');
  }
}
</script>
```

### 整体拓展类extend
从预定义的配置中拓展出来一个独立的配置项，进行合并

### Vue.use - 插件
Vue允许通过外部传入来扩展功能。
* 1. 注册外部插件，作为整体实例的补充
* 2. 会除重，不会重复注册
* 3. 手写插件
    a. 外部使用Vue.use(myPlugin, options)
    b. 默认调用的是内部的install方法

myPlugin.js
```js
export default {
    install: (Vue, option) => {
        Vue.globalMethod = function() {
            // 主函数
        }
        Vue.directive('my-directive', {
            bind(el, binding, vnode, oldVnode) {
                // 全局资源
            }
        })
        Vue.mixin({
            created: function() {
                console.log(option.name + 'created');
            }
        })
        Vue.prototype.$myMethod = function() {}
    }
}
```
main.js中使用
```js
// 加载拓展插件
const _options = {
  name: 'my baby plugin'
}

Vue.use(MyPlugin, _options)

```
### 组件通信
#### 事件总线

任意两个组件之间传值常⽤事件总线 或 vuex的⽅式。
```js
// Bus：事件派发、监听和回调管理
class Bus {
    constructor(){
        this.callbacks = {}
    }
    $on(name, fn){
        this.callbacks[name] = this.callbacks[name] || []
        this.callbacks[name].push(fn)
    }
    $emit(name, args){
        if(this.callbacks[name]){
        this.callbacks[name].forEach(cb => cb(args))
    }
 }
}
// main.js
Vue.prototype.$bus = new Bus()
// child1
this.$bus.$on('foo', handle)
// child2
this.$bus.$emit('foo')
```

#### $parent/$root
兄弟组件之间通信可通过共同祖辈搭桥，$parent或$root。
```js
// brother1
this.$parent.$on('foo', handle)
// brother2
this.$parent.$emit('foo')
```
Vue 子组件可以通过 $root 属性访问父组件实例的属性和方法。区别在于，如果存在多级子组件，通过parent 访问得到的是它最近一级的父组件，通过root 访问得到的是根父组件。

$parent也存在一个弊端，就是不能访问爷爷辈的组件实例，可以使用下面的方式来解决。
```js
methods: {
    dispatch(componentName, eventName, params) {
        var parent = this.$parent || this.$root;
        var name = parent.$options.componentName;

        while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
            name = parent.$options.componentName;
        }
        }
        if (parent) {
            parent.$emit.apply(parent, [eventName].concat(params));
        }
    }
}

```
使用
```js
// ElFormItem想要访问的祖先
this.dispatch('ElFormItem', 'foo', ['maile']);
```

#### $children/$refs
⽗组件可以通过$children访问⼦组件实现⽗⼦通信。但是不能保证顺序，但是$refs可以精准的访问到组件实例。
```js
// parent
this.$children[0].xx = 'xxx'
```
#### $attrs/$listeners

包含了⽗作⽤域中不作为 prop 被识别 (且获取) 的特性绑定 ( class 和 style 除外)。当⼀个组件没有声明任何 prop 时，这⾥会包含所有⽗作⽤域的绑定 ( class 和 style 除外)，并且可以通过 vbind="foo" 传⼊内部组件。在创建⾼级别的组件时⾮常有⽤。

```js
// child：并未在props中声明foo 
<templte>
    <p>{{$attrs.foo}}</p>
</templte>
...
export default {
    props: ['bar'],
    // 子组件
    mounted() {
        console.log(this.$listeners) // 即可拿到 change 事件
    }
}

// parent
<HelloWorld  @change="change" bar="bar" foo="foo"/>
```
#### provide/inject
能够实现祖先和后代之间传值。
```js
// ancestor
provide() {
 return {foo: 'foo'} }
// descendant
inject: ['foo']
```

### 组件的高级引用
* 1. 递归组件 - tree-node
* 2. 动态组件 - <component :is='name'></component>
* 3. 异步组件 

[异步组件和动态组件详细](https://cn.vuejs.org/v2/guide/components-dynamic-async.html)


实现tree-node组件。

```html
<template>
 <div>
 <div @click="toggle" :style="{paddingLeft: (level-1)+'em'}">
    <label>{{model.title}}</label> 
    <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
 </div>
 <div v-show="open" v-if="isFolder">
    <tree-node class="item" v-for="model in model.children"
        :model="model" :key="model.title"
        :level="level + 1">\
    </tree-node>
 </div>
 </div>
</template>
<script>
export default {
 name: "tree-node",
 props: {
    model: Object,
    level: {
        type: Number,
        default: 1
    }
 },
 data: function() {
    return {
        open: false
    };
 },
 computed: {
    isFolder: function() {
        return this.model.children && this.model.children.length;
    }
 },
 methods: {
    toggle: function() {
        if (this.isFolder) {
            this.open = !this.open;
        }
    },
 }
};
</script>
```
实现tree组件
```html
<template>
 <div class="kkb-tree">
    <TreeNode v-for="item in data" :key="item.title" :model="item"></TreeNode>
 </div>
</template>
 <script>
 import TreeNode from './TreeNode.vue';
 export default {
    props: {
        data: {
            type: Array,
            required: true
        }
    },
    components: {
        TreeNode,
    }
 }
```



