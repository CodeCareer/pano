!function(){"use strict";angular.module("kt.pano").controller("ktMarketLayoutCtrl",["$scope","$rootScope","$state","$location","ktSweetAlert","ktDataHelper","ktAnalyticsService","ktUpgradeMember",function(a,b,c,d,e,f,g,h){a.shared={filter_show:!0,tabActive:{tab0:!1,tab1:!1}};var i={dimension:"from",start_at:moment().day(0).add(+(moment().day()>0),"w").subtract(6,"weeks").add(1,"days").format("YYYY-MM-DD"),end_at:moment().day(0).add(+(moment().day()>0),"w").format("YYYY-MM-DD")},j=d.search(),k=a.shared.params=$.extend({},i,j);a.dimensionOnToggle=function(a){a&&b.bdTrack(["市场数据页","下拉","细分维度"])},a.shared.dimensions=[],$.dateRangePickerLanguages.default.shortcuts="",a.datepickerSettings={applyBtnClass:"btn btn-navy-blue btn-xs",singleMonth:!1,extraClass:"date-picker-pano-top",showWeekNumbers:!1,autoClose:!1,onDatepickerOpened:function(){b.bdTrack(["市场数据页","下拉","时间范围"])},beforeShowDay:function(a){var b=moment(),c=a<=(b.day()?b.day(0).add(1,"w").toDate():b.toDate())&&a>=moment("2016-03-01").toDate();return[c,"",c?"":"不在可选范围内"]},showShortcuts:!0,customShortcuts:[{name:"最近4周",onClick:function(){b.bdTrack(["市场数据页","最近4周","时间范围"])},dates:function(){var a=moment().day(0).add(+(moment().day()>0),"w").toDate();return[moment(a).subtract(4,"w").add(1,"d").toDate(),a]}},{name:"最近6周",onClick:function(){b.bdTrack(["市场数据页","最近6周","时间范围"])},dates:function(){var a=moment().day(0).add(+(moment().day()>0),"w").toDate();return[moment(a).subtract(6,"w").add(1,"d").toDate(),a]}},{name:"最近8周",onClick:function(){b.bdTrack(["市场数据页","最近8周","时间范围"])},dates:function(){var a=moment().day(0).add(+(moment().day()>0),"w").toDate();return[moment(a).subtract(8,"w").add(1,"d").toDate(),a]}}]},a.datePicker=k.start_at+"~"+k.end_at,a.$watch("datePicker",function(b,c){if(b!==c){var d=b.split("~");a.goTo({start_at:d[0],end_at:d[1]})}}),a.getDimensionName=function(){return a.shared.dimensions.length?_.find(a.shared.dimensions,{value:k.dimension||i.dimension}).name:""},a.goTo=function(b,d){var e={};$.isPlainObject(b)?$.extend(e,b):(_.each(a.shared.dimensions,function(a){e[a.value]="all"}),e[b]=d),c.go(c.current.name,e)},a.shared.filters=[],g.get({content:"settings"},function(b){var c=b[0].shift();a.specialFiltersOrigin=b[0].slice(1),c=a.shared.dimensions=_.map(c.options,function(a){return{name:a[0],value:a[1]}}),c.isOpen=!1;var d=a.shared.specialFilters={};f.initSpecialFilters(d,a.specialFiltersOrigin,k,a),a.$watch("shared.params.dimension",function(){d.init()})}),a.tabSelect=function(a){c.current.name!==a&&(c.go(a),b.bdTrack(["市场数据页","页面切换","pano.market.default"===a?"资产类":"资管类"]))},a.upgrade=function(){"pended"===b.user.status?e.swal({title:"",html:!0,confirmButtonText:"我知道了",text:"您的帐号正在审核中，待审核通过后方可进行升级操作。<br/> 审核结果会在1个工作日内以邮件或短信的形式通知，请您耐心等待。"}):h()},a.assetManger={},g.get({content:"rate_trend"},function(b){a.assetManger=b.stat})}])}();