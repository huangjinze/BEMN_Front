<<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px"><navi/></el-aside>
      <el-main>
      <h1>Hello BEMN</h1>
      </el-main>
    </el-container>
  </el-container>
</template>

<<script>
  import navi from '../components/layout/navi'

  export default {
    components: {navi}
  }
</script>

<style scoped>

</style>
