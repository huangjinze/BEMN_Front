<!-- 该模块为:可复用的面包屑多选导航模块-->
<template>
    <div :class="className" :id="id">
        <div id="currentList">
            <span>当前选择：</span>
            <el-tag closable
                    v-for="tag in topPartTags"
                    :key="tag.text"
                    @close="handlePartClose(tag.text)"
            >{{tag.text}}</el-tag>
            <el-tag closable
                    v-for="tag in topSiteTags"
                    :key="tag.text"
                    @close="handleSiteClose(tag.text)"
            >{{tag.text}}</el-tag>
            <li class="station_cookie" style="display: none;"></li>
            <li class="region_cookie" style="display: none;"></li>
        </div>
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="选择区域：" name="1">
                <el-button
                        class="link"
                        @click="selectPart(value.text, value.id)"
                        v-for="(value, index) in partTags"
                        :key="value.text">
                    {{value.text}}
                </el-button>

            </el-collapse-item>
            <el-collapse-item title="选择站点：" name="2">
                    <el-button
                            :span="4"
                            class="link"
                            @click="selectSite(value.text, value.id)"
                            v-for="(value, index) in siteTags"
                            :key="value.text">
                        {{value.text}}
                    </el-button>
            </el-collapse-item>
        </el-collapse>

    </div>

</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      topPartTags: [

      ],
      topSiteTags: [

      ]
    }
  },
  props: {
    initTopPartTags: {
      type: Array,
      required: true
    },
    initTopSiteTags: {
      type: Array,
      required: true
    },
    partTags: {
      type: Array,
      required: true
    },
    siteTags: {
      type: Array,
      required: true
    },
    ClickPart: Function
  },
  mounted: function () {
    this.$nextTick(function () {
      this.topPartTags.push({ text: this.initTopPartTags[0] })
      this.topSiteTags.push({ text: this.initTopSiteTags[0] })
    })
  },
  methods: {
    handlePartClose (tag) {
      this.topPartTags.splice(this.topPartTags.indexOf(tag), 1)
    },
    handleSiteClose (tag) {
      this.topSiteTags.splice(this.topSiteTags.indexOf(tag), 1)
    },
    selectPart (text, id) {
    //    this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.topPartTags.pop()
      this.topPartTags.push({ text: text })
      this.$emit('ClickPart', id)
    },
    selectSite (text, id) {
          //    this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.topSiteTags.pop()
      this.topSiteTags.push({ text: text })
      this.$emit('ClickSite', id)
    }
  },
  name: 'headGuider'
}
</script>
<style scoped>
    [class*=" el-icon-"]{
        line-height:48px;
    }
    .link{
        margin-bottom: 10px;
    }
    #currentList{
        text-align:left;
        margin-bottom: 20px;
    }
    #multiselect{
        text-align:left;
    }
    .region_qu{
        width: 138px;
        float: left;
        margin-right: 10px;
        margin-bottom: 10px;
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
    }

    .region_zhan{
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        width: 150px;
        float: left;
        margin-right: 10px;
        margin-bottom: 10px;
    }
    #collapseOne ul li a{
        font-size: 16px;
    }
    .zhibiao{ color: lightgray; background:white;border:1px #e7ecf1 solid;line-height:30px;height:40px;border-radius: 8px 8px 0px 0px!important;padding:4px;margin-top:8px;float:left;text-align:center;cursor:pointer;}
    .portlet.box> .portlet-body{padding-top:0px!important;}
    .th1{padding: 8px;
        line-height: 1.42857;
        vertical-align: top;
        border: 1px solid #e7ecf1;
        text-align: center;
    }
    .zhibiao_act{color: #3F83D8;}
    #example_length label{
        display:none;
    }
    #example_filter label{

        padding-bottom:10px;
    }
    #button_a, #button_m, #button_d{
        width:80px;
        height: 35px;
        float: right;
        text-align: center;
        padding-top: 7px;
        color: white;
        background-color: #3F83D8 ;
        cursor: pointer;
        margin-top: 11px;
    }
    #button_d, #button_a{
        border-left: solid 1px white;
    }
    .pagination li{
        padding:2px!important;
    }

    .adddata{
        text-align: right;
        margin-right: 30%;
    }
    .modal-footer button{
        width: 100px;
    }
    .dropdown-menu{
        min-width: 88px!important;
        left: -19px;
    }
    .modal-body{
        overflow: auto;
    }
    .dates{
        font-size: 14px;
        color: #000;
    }
    .laydate_body .laydate_bottom{
        height: 32px;
    }

    .dropdown-menu{
        min-width: 88px!important;
        left: -19px;
    }
    .btn-group>.dropdown-menu:before, .dropdown-toggle>.dropdown-menu:before, .dropdown>.dropdown-menu:before{
        left: 34px;
    }
    .btn-group>.dropdown-menu:after, .dropdown-toggle>.dropdown-menu:after, .dropdown>.dropdown-menu:after{
        left: 34px;
    }
    #daochu,#daoru{
        text-align:center;
        height:30px;
        width: 58px;
        border-radius: 25px!important;
        padding: 5px 10px;
        font-size: 12px;
    }
    #daoru{
        background-color: #2f353b;
        color: #fff;
    }
    #daochu:hover{
        background-color: #2f353b;
        color: #fff;
    }
    #daoru:hover{
        background-color: #fff;
        color: #2f353b;
    }
    .daoru li {
        text-align: center;
    }
    .daoru li a{
        width:120px!important;
        text-align: center;
    }
    .select_year{
        background-color: #f8f8f8;
        font-size: 24px;
    }
    .select_year:hover{
        background-color: #f3f6f9!important;
    }
    .daoru_year,.daoru_year:hover{
        background-color: #3F83D8!important;
        color: white!important;
    }
    .year_add{
        font-size: 18px;
    }
    .dropdown-menu>li>a{
        width: 88px;
        cursor: pointer;
    }

    @media (max-width: 1000px){
        .buttons{
            float:none!important;
            margin-top: 30px;
        }
        #operation{
            margin-top: 70px;
        }
    }
    @media (max-width: 992px){
        .page-content-wrapper {
            float: left;
            width: 992px;
        }
    }
</style>

