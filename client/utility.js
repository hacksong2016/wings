Template.registerHelper("format", function(time) {
    if (!time) return "-/-/- --:--";
    return new moment(time).format("YYYY/MM/DD");
});
Template.registerHelper("reverse", function(arr) {
    if (arr) {
        return arr.reverse();
    } else {
        return [];
    }
});
Template.registerHelper('timeformat', function(time) {
    if (!time) return "-/-/- --:--";
    return new moment(time).format("YYYY/MM/DD HH:mm");
});
Template.registerHelper('tonumber', function(number) {
    if (!number) return "0";
    return s.sprintf("%.2f", number);
});
Template.registerHelper('absoluteUrl', function(uri) {
    return Meteor.absoluteUrl(uri);
});
Template.registerHelper('emojiUri', function(key) {
    return Meteor.absoluteUrl('emoji/' + Emoji[key] + '.png');
});

Template.registerHelper('buyeridentity', function(key) {
    return {
      '采购经理': "采购经理",
      '采购公司': "采购公司"
    };
});

Template.registerHelper('supplieridentity', function(key) {
    return {
      '品牌厂商': "品牌厂商",
      '经销商': "经销商"
    };
});


Template.registerHelper('truncate', function(str, n) {
    return s.truncate(str,n);
});

Template.registerHelper('star', function(star) {
    let str = "<div class='star'>";
    max = 5;
    for (var i = 0; i < max; i++) {
         if (i < star) {
            str += '<img src="/star-light.svg">';
         }else{
            str += '<img src="/star-dark.svg">';
         }
    }
    str += '</div>';
    return str;
});