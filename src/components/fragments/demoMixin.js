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