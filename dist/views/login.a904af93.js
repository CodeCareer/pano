!function(){"use strict";angular.module("kt.pano").controller("ktLoginCtrl",["$scope","$rootScope","$state","$window","$timeout","$uibModal","ktSweetAlert","ktLoginCommon",function(a,b,c,d,e,f,g,h){b.goHome=function(){c.go("home.index")};try{d.localStorage.getItem("nothing")}catch(i){g.swal({title:"错误：",text:"您的浏览器不支持localStorage，可能是无痕浏览模式导致的，请不要使用无痕上网模式",type:"error"})}a.user=b.user=JSON.parse(d.localStorage.user||"{}"),a.submitForm=function(){h(a)},a.resetPassword=function(){var a,b;a=f.open({size:"md",backdrop:"static",templateUrl:"views/modals/input_phone_captcha.html",controller:"resetPasswordTwoCtrl"}),a.result.then(function(){b=f.open({size:"md",backdrop:"static",templateUrl:"views/modals/reset_password.html",controller:"resetPasswordThreeCtrl"}),b.result.then(function(){g.success("密码修改成功！")})})}}]).controller("resetPasswordTwoCtrl",["$scope","$uibModalInstance","ktRecoverService","ktGetCaptcha",function(a,b,c,d){a.title="验证手机",a.user.content="validate_captcha",a.user.captcha="",a.notLastStep=!0;var e=d.getCaptcha(a,c,{content:"captcha"},a.user);a.getCaptcha=function(b,c){b.preventDefault(),b.stopPropagation(),"sms"===c&&a.waitCaptchaMessage||"tel"===c&&a.waitCaptchaTel||e(a.user.mobile,c)},a.submitForm=function(){c.update(a.user,function(){b.close()},function(b){a.error=b.error||"更新出错！"})},a.cancel=function(){b.dismiss("cancel")}}]).controller("resetPasswordThreeCtrl",["$scope","$uibModalInstance","ktSweetAlert","ktRecoverService",function(a,b,c,d){a.title="设置新密码",a.user.content="",a.user.password="",a.user.password_confirmation="",a.submitForm=function(){d.update(a.user,function(){b.close()},function(b){a.error=b.error||"更新出错！"})},a.cancel=function(){b.dismiss("cancel")}}])}();