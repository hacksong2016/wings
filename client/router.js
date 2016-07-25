FlowRouter.notFound = {
    action: function() {
        console.log("notFound");
    }
};
// FlowRouter.subscriptions = function() {
//     if (Meteor.userId()) {
//         this.register('companyByUser', Meteor.subscribe('companyByUser'));
//     }
// };
FlowRouter.route('/logout', {
    name: "logout",
    action: function(params, queryParams) {
        Meteor.logout(() => {});
        FlowRouter.go('/')
    }
});
// ====================================================
// 检查注册的拦截器
// ====================================================
FlowRouter.triggers.enter([function(context, redirect, stop) {
    if (!Meteor.userId()) {
        redirect('/');
    }
}], {
    only: ["profile"]
});
// AccountsTemplates.configureRoute('signIn', {
//   layoutType: 'blaze',
//   name: 'signin',
//   path: '/login',
//   template: 'login',
// });
// FlowRouter.triggers.enter([function(context, redirect) {
//     if (!Meteor.user()) {
//         var waitForLoginServices = setInterval(function() {
//             // console.log('configured?', Accounts.loginServicesConfigured());
//             if (Accounts.loginServicesConfigured()) {
//                 clearInterval(waitForLoginServices);
//                 Meteor.loginWithWeChatMP({
//                 },function(err, res) {
//                     if (err) {
//                         console.log(err);
//                     } else {
//                         console.log("登陆成功！");
//                         console.log(res);
//                     }
//                 });
//             }
//         }, 100);
//     }
// }], {
//     only: ["home"]
// });
