/**
 * 学校 添加页面
 */
FlowRouter.route('/school/add', {
    action: function(params, queryParams) {
        BlazeLayout.render("template", {
            content: 'school_add'
        });
    }
});
Template.school_add = Template.fromString(`
{{#if Template.subscriptionsReady}}
<section class="wrapper">
     <div class="panel">
            <div class="panel-body">
            {{#autoForm collection="School" id="insertSchoolForm" type="insert"}}
            <fieldset>
    
            {{> afQuickField name='name' placeholder='schemaLabel'}}

            {{> afQuickField name='childrens' placeholder='schemaLabel'}}
            {{> afQuickField name='invest' placeholder='schemaLabel'}}
            {{> afQuickField name='score' placeholder='schemaLabel'}}
        
            {{> afQuickField name='city' placeholder='schemaLabel'}}
    
            {{> afQuickField name='address' placeholder='schemaLabel'}}
    

            <div class="form-group {{#if afFieldIsInvalid name='coord'}}has-error{{/if}}">
                    <label class="control-label">地址坐标</label>
                <div class="input-group">
                    {{> afFieldInput name='coord'}}
                    <span class="input-group-btn">
                        <button class="getPoint btn btn-white " type="button">获取坐标</button>
                    </span>
                </div>
            {{#if afFieldIsInvalid name='coord'}}
                <span class="help-block">{{{afFieldMessage name='coord'}}}</span>
            {{/if}}
            </div>
            
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
Template.school_add.helpers({});
Template.school_add.events({
    'click .getPoint': (event, template) => {
        var city = $("input[name='city']").val();
        var address = $("input[name='address']").val();
        var myGeo = new BMap.Geocoder();
        myGeo.getPoint(address, function(point) {
            if (point) {
                $("input[name='coord']").val(point.lng + ',' + point.lat);
            } else {
                toastr.error('地址不正确，没有找到坐标');
            }
        }, city);
    }
});
Template.school_add.onCreated(function() {
    Session.set('caption', '学校添加');
    Session.set('title', '学校');
    if (!AutoForm._hooks['insertSchoolForm']) {
        AutoForm.hooks({
            'insertSchoolForm': {
                // before: {
                //     insert: function(doc) {
                //         doc.userid = Meteor.userId();
                //         return doc;
                //     }
                // },
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
Template.school_add.onRendered(function() {});
