<template>
    <div class="table-row-count-wrap clearfix">
        <div class="table-row-count">
            共{{count}}条数据
        </div>
    </div>
</template>

<script>
    export default {
        name: "TableRowCount",
        props: ['count']
    }
</script>

<style scoped lang="less">
    .table-row-count{
        /*float: right;*/
        /*margin-right: 30px;*/
        /*color: rgba(30, 144, 255, .7);*/
        color: #999;
        float: left;
        padding: 10px;
        border-radius: 3px;
        background-color: #fff;
    }
</style>