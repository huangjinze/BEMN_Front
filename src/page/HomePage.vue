<<template>
<BasePage>
  <div slot="header">header</div>
  <div slot="aside"><navi></navi></div>
  <div slot="main">Hello!!BEMN</div>
</BasePage>
</template>

<script>
  import navi from '../components/layout/navi'
  import BasePage from '../components/BasePage'

  export default {
    components: {navi, BasePage}
  }
</script>

<style scoped>

</style>
