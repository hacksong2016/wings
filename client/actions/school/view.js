/**
 * 学校 显示页面
 */
FlowRouter.route('/school/view', {
    action: function(params, queryParams) {
        BlazeLayout.render("template", {
            content: 'school_view'
        });
    }
});

Template.school_view = Template.fromString(`
{{#if Template.subscriptionsReady}}
<section class="wrapper">
     <div class="panel">
            <div class="panel-body">
        <div class="carousel">
            <div><img src="http://placehold.it/375x230"></div>
            {{#each pic in object.pictures}}
            <div><img src="/cfs/files/images/{{pic}}"></div>
            {{/each}}
        </div>
            <table class="detail-view">
                <tbody>
                
                    <tr><th>学校名称</th><td>{{object.name}}</td></tr>
                
                    <tr><th>城市</th><td>{{object.city}}</td></tr>
                
                    <tr><th>详细地址</th><td>{{object.address}}</td></tr>
                
                    <tr><th>坐标</th><td>{{object.coord}}</td></tr>
                
                    <tr><th>困难程度</th><td>{{object.score}}</td></tr>
                
                    <tr><th>需要救助的孩子</th><td>{{object.childrens}}</td></tr>
                
                    <tr><th>资助的累计金额</th><td>{{object.invest}}</td></tr>
                
                    <tr><th>创建时间</th><td>{{timeformat object.createat}}</td></tr>
                
                    <tr><th>更新时间</th><td>{{timeformat object.updateat}}</td></tr>
                
                    <tr><th>详情</th><td></td></tr>
                    <tr><td colspan=2>{{{object.description}}}</td></tr>
                </tbody>
            </table>
            <div class="center-block form-buttons">
                <a type="button" class="btn btn-primary" href='/school/edit?id={{object._id}}'>修改</a>
                <button type="button" class="btn btn-default" onclick='history.back();'>取消</button>
            </div>
        </div>
    </div>
</section>
{{/if}}
    `);

Template.school_view.helpers({
    object(){
        return School.findOne(FlowRouter.getQueryParam("id"));
    }
});

Template.school_view.onCreated(function(){
    this.subscribe("school" , FlowRouter.getQueryParam("id"));
    Session.set('title', '学校');
    if(this.subscriptionsReady()){
        var obj = School.findOne(FlowRouter.getQueryParam("id"));
        Session.set('caption', obj.title);
    }

});

Template.school_view.onRendered(function() {
    this.autorun(() => {
        if (this.subscriptionsReady()) {
            let count = 0;
            let waitForLoginServices = setInterval(function() {
                count++;
                if (count > 20) {
                    clearInterval(waitForLoginServices);
                }
                // 初始化上传
                if (this.$(".carousel").length > 0) {
                    clearInterval(waitForLoginServices);
                    $('.carousel').slick({
                        mobileFirst: true,
                        autoplay: true,
                        // adaptiveHeight: true,
                        infinite: true,
                        dots: true,
                        arrows: false,
                    });
                    $('.carousel img').css('display', 'block');
                }
            }, 300);
        }
    });
});

