!function(){"use strict";angular.module("kt.common").directive("ktPlatformInit",function(){return{restrict:"A",link:function(){function a(){var a=$(window).height();600>a&&(a=600),$("#wrapper").css("min-height",a+"px")}function b(){$(window).width()<769?$("body").addClass("page-small"):($("body").removeClass("page-small"),$("body").removeClass("show-sidebar"))}window.requestAnimationFrame(function(){b(),a()}),$(window).bind("resize click",function(){window.requestAnimationFrame(function(){b()}),setTimeout(function(){a()},200)})}}})}();