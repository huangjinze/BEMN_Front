<template>
    <div>
        <el-breadcrumb separator="/" style="font-size: 18px">
            <el-breadcrumb-item :to="{ path: '/' }">奥林匹克</el-breadcrumb-item>
            <el-breadcrumb-item>通量</el-breadcrumb-item>
        </el-breadcrumb>
        <table>
            <tr>

            </tr>
            <tr>
                <td><h2>展示</h2></td>
                <td><h3>开始日</h3></td>
                <td><month></month></td>
                <td><h3>结束日</h3></td>
                <td><month></month></td>
                <td><el-button type="primary">导出表格</el-button></td>
                <td><el-button type="primary" plain>导出统计量</el-button></td>
            </tr>
            <tr>
                <td width="150px"><h2>对比</h2></td>
                <td width="150px"><h3>开始月</h3></td>
                <td width="300px"><selecter></selecter></td>
                <td width="150px"><h3>结束月</h3></td>
                <td width="150px"><selecter></selecter></td>
                <td width="150px"><el-button type="primary">导出表格</el-button></td>
                <td width="150px"><el-button type="primary" plain>导出统计量</el-button></td>
            </tr>
            <tr>
                <td ><h2>导入</h2></td>
                <td ></td>
                <td ><counter></counter></td>
                <td ><h3>选择文件</h3></td>
                <td ><upfile></upfile></td>
                <td ><el-button type="primary" plain>导入原始数据</el-button></td>
            </tr>
        </table>

    </div>
</template>
<script>
    import month from './month'
    import selecter from './selecter'
    import counter from './counter'
    import upfile from './upfile'
    export default {
        components: {selecter,month,counter,upfile}
    }
</script>
