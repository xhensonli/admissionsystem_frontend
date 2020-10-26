<template>
    <div class="empty-data">
        <div class="el-icon-box empty-box"></div>
        <div class="empty-data-text">暂无数据</div>
    </div>
</template>

<script>
    export default {
        name: "EmptyData"
    }
</script>

<style scoped lang="less">

    .empty-data{
        margin-top: 150px;
        text-align: center;
        color: dodgerblue;
        opacity: .3;
        .empty-box{
            font-size: 128px;
            padding-bottom: 25px;
        }
        .empty-data-text{
            font-size: 36px;
        }
    }
</style>