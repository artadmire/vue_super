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