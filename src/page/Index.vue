/*

*/
<template>
    <div>
        <div class="nav">
            <el-menu :default-active="$route.path" class="navbar navbar-custom navbar-fixed-top" mode="horizontal" light router style="float: right">
                <el-menu-item index="#app" style="font-size: 25px;color: #2d2f33;font-family: 'Microsoft YaHei'"><a href="#app"><img src="../assets/pages/img/logo.png" style="height: 60px;margin-bottom: 10px"/></a></el-menu-item>
                <el-menu-item index="/login" style="font-size: 25px;color: #2d2f33;font-family: 'Microsoft YaHei'">登录</el-menu-item>
                <el-menu-item index="#about" style="font-size: 25px;color: #2d2f33;font-family: 'Microsoft YaHei'"><a href="#about">领域</a></el-menu-item>
                <el-menu-item index="#download" style="font-size: 25px;color: #2d2f33;font-family: 'Microsoft YaHei'"><a href="#download">功能</a></el-menu-item>
                <el-menu-item index="#show" style="font-size: 25px;color: #2d2f33;font-family: 'Microsoft YaHei'"><a href="#show">展示</a></el-menu-item>
                <el-menu-item index="#contect" style="font-size: 25px;color: #2d2f33;font-family: 'Microsoft YaHei'"><a href="#contact">联系</a></el-menu-item>
            </el-menu>
        </div>
        <!-- Intro Header -->
        <header class="intro" style="height: 900px">
            <div class="intro-body">
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2">
                            <h2 class="brand-heading">林业生态大数据平台</h2>
                            <p class="intro-text">一个集森林、荒漠与湿地于一体的
                                <br>林业生态大数据平台.</p>
                            <a href="#about" class="btn btn-circle page-scroll">
                                <i class="el-icon-arrow-down"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <!-- About Section -->
        <section id="about" class="content-section text-center clearfix">
            <div class="row clearfix">
                <h2 class="tit">我们的数据涵盖三大领域</h2>
                <img src="../assets/pages/img/hr.png">
                <el-row :gutter="20" style="padding-top: 50px">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <img src="../assets/pages/img/8.png">
                            <div class="h2">森 林</div>
                            <p class="row2_p">以乔木为主体的生物群落（包括植物、动物和微生物）及其非生物环境（光、热、水、气、土壤等）综合组成的生态系统</p>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <img src="../assets/pages/img/9.png">
                            <div class="h2">荒 漠</div>
                            <p class="row2_p">荒漠生态系统是地球上 最耐旱的，以超旱生的小乔木、灌木和半灌木占优势的生物群落与其周围环境所组成的综合体</p>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <img src="../assets/pages/img/7.png">
                            <div class="h2">湿 地</div>
                            <p class="row2_p">湿地生态系统属于水域生态系统。其生物群落由水生和陆生种类组成，具有较高的生态多样性、物种多样性和生物生产力</p>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </section>
        <!-- Download Section -->
        <section id="download" class="content-section text-center">
            <div class="download-section clearfix">
                <div class="col-lg-12">
                    <h2 class="tit tit3">系统功能</h2>
                    <img src="../assets/pages/img/hr2.png">
                    <el-row :gutter="20" style="padding-top: 100px">
                        <el-col :span="7">
                            <div class="grid-content bg-purple">
                                <div class="row3_div">
                                    <img src="../assets/pages/img/2.png">
                                    <div class="h3">数据展示</div>
                                </div>
                                <div class="row3_div">
                                    <img src="../assets/pages/img/3.png">
                                    <div class="h3">统计分析</div>
                                </div>
                                <div class="row3_div">
                                    <img src="../assets/pages/img/6.png">
                                    <div class="h3">用户管理</div>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="10">
                            <div class="grid-content bg-purple">
                                <img style="margin-top:20px;" class="computer" src="../assets/pages/img/1.png">
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="grid-content bg-purple">
                                <div class="col-md-3">
                                    <div class="row3_div">
                                        <img src="../assets/pages/img/4.png">
                                        <div class="h3">数据可视化</div>
                                    </div>
                                    <div class="row3_div">
                                        <img src="../assets/pages/img/5.png">
                                        <div class="h3">地图可视化</div>
                                    </div>
                                    <div class="row3_div">
                                        <img src="../assets/pages/img/0.png">
                                        <div class="h3">设备管理</div>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </section>
        <!-- Contact Section -->
        <section id="show" class="content-section text-center" style="padding-bottom:80px;">
            <div class="row">
                <el-row :gutter="20">
                    <el-col :span="5">
                        <div class="grid-content bg-purple">
                            <div class="block">
                                <br>
                                <div>
                                    <div class="counter">
                                        <span class="count_tit" style="display:inline;font-family: Microsoft YaHei">年平均值：</span><br><span id="counter">0</span>
                                    </div>
                                </div>
                                <br>
                                <h4 style="font-family: Microsoft YaHei" class="des">指标介绍</h4>
                                <!--        <p>中文名称：水指标(通量)</p>
                                        <p>英文名称：WATER(hello)</p>
                                        <p>用途：虽然说更多的用户更青睐亮色调的网页设计,因为亮色调使整个页面看起来爽朗;</p> -->
                                <p style="font-family: Microsoft YaHei;color:white">中文名称：水指标(通量)<br>英文名称：Water(Flux)<br>用途：水质指标是描述水质状况的一系列标准。</p>

                            </div>
                        </div>
                    </el-col>
                    <el-col :span="14">
                        <div class="grid-content bg-purple">
                            <!--    <div class="lxtitareaChart">2012年指标分析图</div> -->
                            <div class="block" id="areaChart"></div>
                        </div>
                    </el-col>
                    <el-col :span="5">
                        <div class="grid-content bg-purple">
                            <div class="block">
                                <!-- <div class="lxtit_li">全部指标</div> -->
                                <!-- <h style="display:inline;font-size: 27px;font-weight: bold;color:white;font-family: Microsoft YaHei">当前指标 </h> -->
                                <h1 style="display:inline;color:#FEC504;"></h1>
                                <ul class="block_ul">
                                    <li><span class="badge badge-info">1</span><span class="index">air_temperature</span></li>
                                    <li><span class="badge badge-info">2</span><span class="index">co2_mixing_ratio</span></li>
                                    <li><span class="badge badge-info">3</span><span class="index">es</span></li>
                                    <li><span class="badge badge-info">4</span><span class="index">h2o_molar_density</span></li>
                                    <li><span class="badge badge-info">5</span><span class="index">RH</span></li>
                                    <li><span class="badge badge-info">6</span><span class="index">sonic_temperature</span></li>
                                    <li><span class="badge badge-info">7</span><span class="index">TKE</span></li>
                                    <li><span class="badge badge-info">8</span><span class="index">u_unrot</span></li>
                                    <li><span class="badge badge-info">9</span><span class="index">VPD</span></li>
                                    <li class="active"><span class="badge badge-info">10</span><span class="index">wind_speed</span></li>
                                </ul>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <div class="row row2" style="margin-top:20px;">
                <el-row :gutter="20">
                    <el-col :span="7">
                        <div class="grid-content bg-purple">
                            <!-- <div class="lxtit_map">奥林匹克公园通量塔</div> -->
                            <div class="block2" id="map">
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div class="grid-content bg-purple">
                            <!-- <div class="lxtit_pie">2012年 月平均比例</div> -->
                            <div class="block2">
                                <h4 style="font-family: Microsoft YaHei;font-size:22px"><span class="year_span" style="font-family: Microsoft YaHei;font-size:22px"></span>年月平均比例</h4>
                                <div class="row row3">
                                    <div class="col-sm-2 col-md-2 block3" id="pie11"></div>
                                    <div class="col-sm-2 col-md-2 block3" id="pie12"></div>
                                    <div class="col-sm-2 col-md-2 block3" id="pie13"></div>
                                    <div class="col-sm-2 col-md-2 block3" id="pie14"></div>
                                    <div class="col-sm-2 col-md-2 block3" id="pie15"></div>
                                    <div class="col-sm-2 col-md-2 block3" id="pie16"></div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-2 col-md-2 block3" id="pie21"></div>
                                    <div class="col-sm-2 col-md-2 block3" id="pie22"></div>
                                    <div class="col-sm-2 col-md-2 block3" id="pie23"></div>
                                    <div class="col-sm-2 col-md-2 block3" id="pie24"></div>
                                    <div class="col-sm-2 col-md-2 block3" id="pie25"></div>
                                    <div class="col-sm-2 col-md-2 block3" id="pie26"></div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="7">
                        <div class="grid-content bg-purple">
                            <!-- <div class="lxtit_pie">月最大值及最小值</div> -->
                            <div class="block2" id="bar">
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </section>
        <!-- Contact Section -->
        <section id="contact" class="container content-section text-center" style="padding-bottom:80px;">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2">
                    <h2 class="tit">联系我们</h2>
                    <img src="../assets/pages/img/hr.png">
                    <p style="margin-top:60px;font-size:22px;">请发email给我们的系统提出宝贵的反馈或者建议，或者仅仅是打个招呼！</p>
                    <p><a href="mailto:feedback@startbootstrap.com"><b>feedback@bjfu.edu.cn</b></a>
                    </p>
                    <el-row :gutter="20">
                        <el-col :span="4" :offset="6">
                            <div class="grid-content bg-purple">
                                <img src="../assets/pages/img/qq.jpg"/>
                                <div class="h4">QQ</div>
                                <p>1509986545</p>
                            </div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                <img src="../assets/pages/img/phone.jpg"/>
                                <div class="h4">电话</div>
                                <p>1509986545</p>
                            </div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                <img src="../assets/pages/img/weibo.jpg"/>
                                <div class="h4">微博</div>
                                <p>1509986545</p>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </section>

        <!-- Map Section -->


        <!-- Footer -->
        <footer>
            <el-row :gutter="20">
                <el-col :span="4" :offset="8">
                    <div class="footer_qa col-md-3 col-md-offset-3 col-sm-3 col-sm-offset-2">
                        <img class="footer_img" src="../assets/pages/img/qa.png"/>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="footer_text col-md-5 col-sm-5">
                        <p>版权：<a href="http://www.bjfu.edu.cn/" target="_blank" style="color: #42DCA3">北京林业大学</a> 数字林业研究所</p>
                        <p>地址：北京市海淀区清华东路35号学研大厦A1008</p>
                    </div>
                </el-col>
            </el-row>
        </footer>
        <!--<div class="line"></div>-->
    </div>

</template>

<script>
//  import sbg from 'startbootstrap-grayscale'
  export default {
    data () {
      return {

      }
    },
    methods: {}
  }
</script>

<style>
    /*Theme CSS*/
    @import "../assets/pages/css/grayscale.min.css";
    @import "../assets/pages/css/style2.css";
    /*[if lt IE 9]*/
    @import "https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js";
    @import "https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js";

    /*@import "~startbootstrap-grayscale";*/
    /*<![endif]-->*/
    .el-menu-demo{
        font-size: 30px;
        width: 100%;
        float: right;
    }
    .text-center {
        text-align: center;
    }
    .clearfix:before,
    .clearfix:after {
        content: " ";
        display: table; }

    .clearfix:after {
        clear: both;
    }
    a:link,a:visited{
        text-decoration:none;  /*超链接无下划线*/
    }
    .navbar{
        margin-bottom: 0px!important;
    }
    .navbar {
        position: relative;
        min-height: 50px;
        margin-bottom: 20px;
        border: 1px solid transparent; }
    .navbar:before,
    .navbar:after {
        content: " ";
        display: table; }
    .navbar:after {
        clear: both; }
    @media (min-width: 768px) {
        .navbar {
            border-radius: 4px; } }
    @media (min-width: 768px) {
        .navbar-fixed-top{
            padding-left: 0;
            padding-right: 0; } }

    .navbar-fixed-top {
        max-height: 340px; }
    @media (max-device-width: 480px) and (orientation: landscape) {
        .navbar-fixed-top {
            max-height: 200px; } }
    .navbar-fixed-top{
        position: fixed;
        right: 0;
        left: 0;
        z-index: 1030; }
    @media (min-width: 768px) {
        .navbar-fixed-top{
            border-radius: 0; } }

    .navbar-fixed-top {
        top: 0;
        border-width: 0 0 1px; }
    .navbar-custom{
        text-transform:uppercase;
        font-family:Montserrat,"Helvetica Neue",Helvetica,Arial,sans-serif}
    .navbar-header:before,
    .navbar-header:after {
        content: " ";
        display: table; }

    .navbar-header:after {
        clear: both; }

    @media (min-width: 768px) {
        .navbar-header {
            float: left; } }
</style>