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