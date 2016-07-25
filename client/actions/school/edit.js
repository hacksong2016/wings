/**
 * 学校 编辑修改页面
 */
FlowRouter.route('/school/edit', {
    action: function(params, queryParams) {
        BlazeLayout.render("template", {
            content: 'school_edit'
        });
    }
});

Template.school_edit = Template.fromString(`
{{#if Template.subscriptionsReady}}
<section class="wrapper">
     <div class="panel">
            <div class="panel-body">
        {{#autoForm collection="School" id="updateSchoolForm" doc=object type="update"}}
        <fieldset>

        {{> afQuickField name='name' placeholder='schemaLabel'}}

        {{> afQuickField name='childrens' placeholder='schemaLabel'}}
        {{> afQuickField name='invest' placeholder='schemaLabel'}}
        {{> afQuickField name='score' placeholder='schemaLabel'}}
        {{> afQuickField name='city' placeholder='schemaLabel'}}

        {{> afQuickField name='address' placeholder='schemaLabel'}}

        {{> afQuickField name='coord' placeholder='schemaLabel'}}

        {{> afQuickField name='pictures' placeholder='schemaLabel'}}

        {{> afQuickField name='description' placeholder='schemaLabel'}}


        </fieldset>
        <div class="center-block form-buttons">
            <button type="submit" class="btn btn-primary">保存</button>
            <button type="button" class="btn btn-default" onclick='history.back();'>取消</button>
        </div>
        {{/autoForm}}
        </div>
    </div>
</section>
{{/if}}
    `);

Template.school_edit.helpers({
    object(){
        return School.findOne(FlowRouter.getQueryParam("id"));;
    }
});

Template.school_edit.events({

});

Template.school_edit.onCreated(function(){
    Session.set('caption', '学校修改');
    Session.set('title', '学校');

    this.subscribe("school" , FlowRouter.getQueryParam("id"));
    
    if (!AutoForm._hooks['updateSchoolForm']) {
        AutoForm.hooks({
            'updateSchoolForm': {
                onSuccess: function(formType, result) {
                    FlowRouter.go("/school");
                },
                onError: function(formType, error) {
                    console.log(error);
                },
            },
        });
    }
});

Template.school_edit.onRendered( function() {
    this.autorun( () => {
        if ( this.subscriptionsReady() ) {
            let count = 0;
            let waitForLoginServices = setInterval( function() {
                count++;
                if (count > 20) {
                    clearInterval( waitForLoginServices );
                }
                // 初始化上传
                if ( this.$( ".js-file" ).length > 0 ) {
                    clearInterval( waitForLoginServices );
                    this.$( ".js-file" ).fileupload();
                }
                // 初始化radio
                if ( this.$( ".radio>label" ).length > 0 ) {
                    this.$('form').addClass('has-js');
                    this.$('.radio>label').addClass('label_radio');
                }
            }, 300 );
        }
    } );
} );


