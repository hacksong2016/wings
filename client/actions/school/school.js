/**
 * 学校 列表页面
 */
FlowRouter.route('/school', {
    name: "school",
    action: function(params, queryParams) {
        BlazeLayout.render("template", {
            content: 'school'
        });
    }
});

Template.school = Template.fromString(`
{{#if Template.subscriptionsReady}}
<section class="wrapper">
     <div class="panel">
            <div class="panel-body">
            {{> tabular table=TabularTables.School class="table table-striped table-bordered table-condensed"}}

            <a href="/school/add" class="btn btn-primary">添加</a>
        </div>
    </div>
</section>
{{/if}}
  `);

Template.school.helpers({
    selector() {
        const pid = FlowRouter.getQueryParam("parentid");
        return pid?{parentid:pid}:{parentid:''};
    }
});

Template.school.events({
  'click .delete': (event, template)=> {
    event.preventDefault();
    if(confirm("确定要删除这条学校吗？"))
    {
        School.remove(event.currentTarget.id);
    }
  }
});


Template.school.onCreated(function() {
    Session.set('caption', '学校列表');
    Session.set('title', '学校');
});