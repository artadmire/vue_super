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