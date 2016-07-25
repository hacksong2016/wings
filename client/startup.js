Meteor.startup(function() {
    $('body').addClass('full-width');
    // ====================================================
    //     时间格式化的配置
    // ====================================================
    moment.defineLocale('zh', {
        relativeTime: {
            future: "%s之后",
            past: "%s",
            s: "刚刚",
            m: "一分钟前",
            mm: "%d分钟前",
            h: "一小时前",
            hh: "%d小时前",
            d: "昨天",
            dd: "%d天前",
            M: "一月前",
            MM: "%d月前",
            y: "一年前",
            yy: "%d年前"
        }
    });
    // ====================================================
    //     表单验证提示信息
    // ====================================================
    SimpleSchema.messages({
        passwordMismatch: "确认密码不一样",
        passwordIncorrect: "密码错误",
        usernameNotFound: "用户没有找到",
        usernameExists: "用户名已存在",
        pinMismatch: "验证码错误",
        publickey: "请填写正确的公钥，否则无法部署！",
        required: "亲，你没填[label]！",
        before: "不能选择今天之前的时间！",
        endgtstart: "结束时间不能早于开始时间",
        minString: "[label]你真的[min]个字也不想填？",
        maxString: "[label]不能超过[max]字",
        minNumber: "[label]不能小于[min]",
        maxNumber: "[label]不能大于[max]",
        minDate: "[label]必须在[min]之后",
        maxDate: "[label]必须在[max]之前",
        badDate: "[label]不是日期格式",
        minCount: "You must specify at least [minCount] values",
        maxCount: "You cannot specify more than [maxCount] values",
        noDecimal: "[label]必须填写数字",
        notAllowed: "[label]不允许填写[value]",
        expectedString: "[label]必须填写文字",
        expectedNumber: "[label]必须填写数字",
        expectedBoolean: "[label]必须是选择",
        expectedArray: "[label]必须是数组",
        expectedObject: "[label]必须是对象",
        expectedConstructor: "[label]必须是一个[type]",
        unique: "[label]已经存在",
        regEx: [{
            msg: "[label]不符合要求，请完善"
        }, {
            exp: SimpleSchema.RegEx.Email,
            msg: "[label]需要填写邮件地址"
        }, {
            exp: SimpleSchema.RegEx.WeakEmail,
            msg: "[label]需要填写邮件地址"
        }, {
            exp: SimpleSchema.RegEx.Domain,
            msg: "[label]需要填写域名"
        }, {
            exp: SimpleSchema.RegEx.WeakDomain,
            msg: "[label]需要填写域名"
        }, {
            exp: SimpleSchema.RegEx.IP,
            msg: "[label]需要填写IP地址（IPv4或者IPv6）"
        }, {
            exp: SimpleSchema.RegEx.IPv4,
            msg: "[label]需要填写IPv4的IP地址"
        }, {
            exp: SimpleSchema.RegEx.IPv6,
            msg: "[label]需要填写IPv6的IP地址"
        }, {
            exp: SimpleSchema.RegEx.Url,
            msg: "[label]需要填写网址"
        }, {
            exp: SimpleSchema.RegEx.Id,
            msg: "[label]需要填写字符ID"
        }],
        keyNotInSchema: "[key]没找到有效的验证"
    });
    // ====================================================
    //     tabler 列表国际化内容
    // ====================================================
    $.extend(true, $.fn.dataTable.defaults, {
        language: {
            // "lengthMenu": "",
            // "zeroRecords": "zeroRecords==",
            "info": "",
            // "infoEmpty": "infoEmpty==",
            // "infoFiltered": "infoFiltered==",
            // processing: "Traitement en cours...",
            // search: "Rechercher&nbsp;:",
            // infoPostFix: "",
            // loadingRecords: "Chargement en cours...",
            // zeroRecords: "Aucun &eacute;l&eacute;ment &agrave; afficher",
            // emptyTable: "Aucune donnée disponible dans le tableau",
            paginate: {
                first: "第一页",
                previous: "上一页",
                next: "下一页",
                last: "最后"
            },
            // aria: {
            //     sortAscending: ": activer pour trier la colonne par ordre croissant",
            //     sortDescending: ": activer pour trier la colonne par ordre décroissant"
            // }
        }
    });
});
// ====================================================
//     生成随机数字
// ====================================================
randomNum = function(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var result = (Min + Math.round(Rand * Range));
        return result;
    }
    // ====================================================
    //     生成随机字符串
    // ====================================================
generateMixed = function(n) {
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var res = "";
    for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 35);
        res += chars[id];
    }
    return res;
}
