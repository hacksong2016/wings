/**
 * 学校 定义页面
 */
// Collection
School = new Mongo.Collection('school');
School.allow({
    insert: function() {
        return true;
    },
    update: function() {
        return true;
    },
    remove: function() {
        return true;
    },
});
// SimpleSchema 
School.attachSchema(new SimpleSchema({
    name: {
        type: String,
        label: "学校名称"
    },
    city: {
        type: String,
        label: "城市"
    },
    address: {
        type: String,
        label: "详细地址"
    },
    coord: {
        type: String,
        label: "坐标"
    },
    pictures: {
        type: [
            String,
        ],
        label: "图片"
    },
    'pictures.$': {
        type: String,
        label: "展示图片（可多图）",
        autoform: {
            afFieldInput: {
                type: "fileUpload",
                collection: "Images",
                label: "上传展示图片",
                accept: "image/*"
            }
        }
    },
    description: {
        type: String,
        label: "详情",
        autoform: {
            afFieldInput: {
                type: "summernote",
                class: "editor"
            }
        }
    },
    score: {
        type: Number,
        label: "困难程度",
        optional: true
    },
    childrens: {
        type: Number,
        label: "需要救助的孩子",
    },
    invest: {
        type: Number,
        label: "资助的累计金额",
        optional: true
    },
    userid: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue: function() {
            if (this.isInsert) {
                return Meteor.userId();
            }
        },
    },
    createat: {
        type: Date,
        label: "创建时间",
        autoValue: function() {
            if (this.isInsert) {
                return new Date();
            }
        }
    },
    updateat: {
        type: Date,
        label: "更新时间",
        optional: true,
        autoValue: function() {
            return new Date();
        }
    },
}));
// TabularTables
Meteor.isClient && (Template.schoolEdit = Template.fromString(`
    <a href="/school/edit?id={{this._id}}" class="btn btn-primary btn-xs"><i class='icon-edit'></i></a>
    <a class="btn btn-primary btn-xs delete" id='{{this._id}}'><i class='icon-trash'></i></a>
  `));
TabularTables.School = new Tabular.Table({
    name: "School List",
    collection: School,
    searching: false,
    // ordering: false,
    selector: function(userId) {
        return {
            userid: userId
        }
    },
    order: [
        [2, "desc"]
    ],
    columns: [{
        data: 'name',
        title: '学校名称',
        orderable: false,
        render: function(val, type, doc) {
            return "<a href='/school/view?id=" + doc._id + "'>" + val + "</a>";
        }
    }, {
        data: 'city',
        title: '城市',
        orderable: false,
    }, {
        data: 'address',
        title: '详细地址',
        orderable: true,
    }, {
        data: 'updateat',
        title: '更新时间',
        orderable: false,
        render: function(val, type, doc) {
            return moment(val).format("YYYY/MM/DD HH:mm");
        }
    }, {
        title: '管理',
        tmpl: Meteor.isClient && Template.schoolEdit
    }]
});
