!function(){"use strict";angular.module("kt.pano").controller("ktAssetsCtrl",["$scope","$location","$timeout","$stateParams","$rootScope","ktProductsService","ktDataHelper","ktProductTrendsService","ktSweetAlert",function(a,b,c,d,e,f,g,h,i){a.$on("$stateChangeSuccess",function(){c(function(){$("body").scrollTop(0)},100)});var j=b.search(),k=a.params=$.extend({},j);f.get({content:d.id},function(b){function d(b){b.length%3!==0?(b.push({empty:!0}),d(b)):a.partitions=b}function e(b){b.length%3!==0?(b.push({empty:!0}),e(b)):a.similars=b}a.assetsDatas=b.products,a.updateTime=b.products.latest_uptime,a.original_products=b.original_products;var f=a.inst=b.from_info;f&&c(function(){f.descObj=g.textEllipsis(f.from_introduce,".init-main-info .desc",0,14,4,6)},100);var h=a.exchange=b.exchange_info;h&&c(function(){h.exchangeObj=g.textEllipsis(h.exchange_introduce,".init-main-info .desc",0,14,4,1)},100),d(b.products.partitions||[]),e(b.similar_products),k.begin_date=moment(Math.max(moment(b.products.begin_date).toDate(),moment(b.products.last_date).subtract(30,"days").toDate())).format("YYYY-MM-DD"),k.end_date=moment(b.products.last_date).format("YYYY-MM-DD"),a.datePicker=k.begin_date+"~"+k.end_date,a.$watch("datePicker",function(a,b){if(a!==b){var c=a.split("~"),d={begin_date:c[0],end_date:c[1]};l.updateDataView(d)}}),l.updateDataView()}),a.alertCode=function(){i.swal({title:'<span class="alert">请联系PANO微信小助手</span>',text:'<span class="img-pano"><img src="images/pano_wxSEC.0e2a6fbe.png"></span>',html:!0})},a.datepickerSettings={applyBtnClass:"btn btn-navy-blue btn-xs",singleMonth:!1,extraClass:"date-picker-pano-top",showWeekNumbers:!1,autoClose:!1,beforeShowDay:function(a){var b=moment(),c=a<=b.toDate()&&a>=moment("2016-03-01").toDate(),d="",e=c?"":"不在可选范围内";return[c,d,e]}};var l=a.dailyRaiseChart={chartOptions:{},_params:{},yAxisFormat:"rmb",yAxis:"amount",xAxisFormat:null,list:[]},m=15,n=65,o=50,p=80,q={text:"努力加载中...",color:"#3d4351",textColor:"#3d4351"},r={tooltip:{valueType:"rmb"},toolbox:{show:!1},legend:{left:"center",right:m/2,textStyle:{fontSize:12,color:"#626472"}},yAxis:{nameGap:20,splitLine:{show:!0,lineStyle:{color:["#f3f3f3"],width:1,type:"solid"}}},grid:{show:!0,top:o,left:n,right:m,bottom:p}};l.updateDataView=function(b){function c(){var a=e.echart=echarts.getInstanceByDom($("#dailyRaiseChart")[0]);e.chartOptions=$.extend(!0,{},r,{legend:{data:["日募集情况"]},tooltip:{xAxisFormat:e.xAxisFormat,yAxisFormat:e.yAxisFormat},yAxis:{name:"募集规模（万元）"},xAxis:{type:"category",boundaryGap:!0,data:_.map(e.data,"date")},series:[{name:"日募集情况",itemStyle:{normal:{opacity:.8},emphasis:{barBorderWidth:1,barBorderColor:"rgba(0,0,0,.5)"}},stack:"日募集情况",type:"bar",barWidth:30,data:_.map(e.data,"amount")}]}),a&&a.hideLoading()}var e=this;$.extend(e._params,b||{}),e.echart=echarts.getInstanceByDom($("#dailyRaiseChart")[0]),e.echart&&(e.echart.hideLoading(),e.echart.showLoading(q)),h.get(g.cutDirtyParams($.extend(!0,{},k,{id:d.id},e._params)),function(b){e.data=b.products,a.avg_amount=b.avg_amount,a.max_amount=b.max_amount,a.min_amount=b.min_amount,c()})}}])}();