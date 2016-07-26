FlowRouter.route('/', {
  name: "index",
  action: function(params, queryParams) {
    BlazeLayout.render("template", {
      content: 'index'
    });
  }
});
Template.index = Template.fromString(`
<section class="wrapper index">
<div class="jumbotron">
  <div class="container">
    <h1>森林天使</h1>
    <p>以爱为名，助力留守儿童快乐成长</p>
    <p><a class="btn btn-primary btn-lg start" role="button">立即加入我们</a></p>
    <h1>&nbsp;</h1>
  </div>
</div>
<div class="bs-docs-featurette">
  <div class="container">
    <h2 class="bs-docs-featurette-title">注册-登陆-提交需要资助学校的信息</h2>
    <p class="lead">{{> loginButtons }}</p>
    <hr class="half-rule">
    <div class="row">
      <div class="col-sm-4">
        <h3>森林天使简介</h3>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;森林天使于2012年在福建各偏远山区展开工作近一年，以形成一套完整并成熟的公益模式，经过一年的准备期，于2014年3月份正式组建全职团队从事关爱留守儿童工作，在全国范围内设立图书室、校服捐赠、心愿认领、孤儿及单亲困难户一对一帮扶等十个项目。足迹已到达福建、宁夏、四川地区，即将向全国各偏远地区开展感受爱、传递爱的公益之路。目前森林天使已向国家相关部门申请基金会中。
</p>
      </div>
      <div class="col-sm-4">
        <h3>创始人致辞</h3>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;现今社会，都以物质来衡量一个人是否成功。我不想活在别人的价值观里，只要突破自我便就是成功了。人的自我价值不在于身边的人说你多好、多优秀，而是打从心底对自己的认可。大学毕业后我放弃优越的工作待遇回到父母身边，为了弥补童年留下的遗憾。只是童年时期造成的孤独感至今都挥之不去。如果不能去治愈那些所谓成人的心灵创伤，那么，我们可以尽己所能去帮助孩子。
      </p>
      </div>
      <div class="col-sm-4">
        <h3>联系我们</h3>
        <p>北京市朝阳区广渠路百环家园15号楼2单元2412，邮编：100020<br>
网址：www.slangel.com<br>
秘书处邮箱：slangel_msc@163.com<br>
理事长邮箱：slangel2014@163.com<br>
微信公共账号：slangel2014<br>
微博：森林天使ForestAngel<br></p>
      </div>
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
  </div>
</div>
</section>

  `);
Template.index.onRendered(function() {
    this.$(".jumbotron").height($(window).width() / 3.5);
    // console.log($(window).width() / 3.5);
//   let count = 0;
//   let waitForLoginServices = setInterval(function() {
//     count++;
//     if (count > 20) {
//       clearInterval(waitForLoginServices);
//     }
//     // 初始化上传
//     if (this.$(".jumbotron #login-buttons a").length > 0) {
//       clearInterval(waitForLoginServices);
//       this.$(".jumbotron #login-buttons a").addClass('btn btn-primary btn-lg');
//       this.$(".jumbotron #login-buttons a").html('注册-登陆-提交项目');
//     }
//   }, 300);
});
Template.index.onCreated(function() {
  // counter starts at 0
  // this.counter = new ReactiveVar( 0 );
});
Template.index.events({
  'click .start' (event, instance) {
     $("#login-buttons a").click();
  },
});
