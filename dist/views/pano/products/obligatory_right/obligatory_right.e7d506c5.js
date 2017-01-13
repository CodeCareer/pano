!function(){"use strict";angular.module("kt.pano").controller("ktAssetsCtrl",["$scope","$location","$stateParams","$rootScope","ktProductsService","ktDataHelper","ktProductTrendsService","ktSweetAlert",function(a,b,c,d,e,f,g,h){var i=b.search(),j=a.params=$.extend({},i);e.get({content:c.id},function(b){function c(b){b.length%3!==0?(b.push({empty:!0}),c(b)):a.partitions=b}function d(b){b.length%3!==0?(b.push({empty:!0}),d(b)):a.similars=b}a.assetsDatas=b.products,a.original_products=b.original_products;var e=a.inst=b.from_info;e.descObj=f.textEllipsis(e.form_introduce,".init-main-info .desc",0,14,4,6);var g=a.exchange=b.exchange_info;g&&(g.exchangeObj=f.textEllipsis(g.exchange_introduce,".init-main-info .desc",0,14,4,1),c(b.products.partitions),d(b.similar_products),j.begin_date=moment(Math.max(moment(b.products.begin_date).toDate(),moment(b.products.last_date).subtract(30,"days").toDate())).format("YYYY-MM-DD"),j.end_date=moment(b.products.last_date).format("YYYY-MM-DD"),a.datePicker=j.begin_date+"~"+j.end_date,a.$watch("datePicker",function(a,b){if(a!==b){var c=a.split("~"),d={begin_date:c[0],end_date:c[1]};k.updateDataView(d)}}),k.updateDataView())}),a.alertCode=function(){h.swal({title:'<p class="alert">更多产品数据，请联系微信客服PANO酱</p>',text:'<div class="img-pano"><img src="images/pano_wxSEC.0e2a6fbe.png"></div>',html:!0,showCloseButton:!0})},a.datepickerSettings={applyBtnClass:"btn btn-navy-blue btn-xs",singleMonth:!1,extraClass:"date-picker-pano-top",showWeekNumbers:!1,autoClose:!1,beforeShowDay:function(a){var b=moment(),c=a<=b.toDate()&&a>=moment("2016-03-01").toDate(),d="",e=c?"":"不在可选范围内";return[c,d,e]}};var k=a.dailyRaiseChart={chartOptions:{},_params:{},yAxisFormat:"rmb",yAxis:"amount",xAxisFormat:null,list:[]},l=15,m=65,n=50,o=80,p={text:"努力加载中...",color:"#3d4351",textColor:"#3d4351"},q={tooltip:{valueType:"rmb"},toolbox:{show:!1},legend:{left:"center",right:l/2,textStyle:{fontSize:12,color:"#626472"}},yAxis:{nameGap:20,splitLine:{show:!0,lineStyle:{color:["#f3f3f3"],width:1,type:"solid"}}},grid:{show:!0,top:n,left:m,right:l,bottom:o}};k.updateDataView=function(b){function d(){var a=e.echart=echarts.getInstanceByDom($("#dailyRaiseChart")[0]);e.chartOptions=$.extend(!0,{},q,{legend:{data:["日募集情况"]},tooltip:{xAxisFormat:e.xAxisFormat,yAxisFormat:e.yAxisFormat},yAxis:{name:"募集金额（万元）"},xAxis:{type:"category",boundaryGap:!0,data:_.map(e.data,"date")},series:[{name:"日募集情况",itemStyle:{normal:{opacity:.8},emphasis:{barBorderWidth:1,barBorderColor:"rgba(0,0,0,.5)"}},stack:"日募集情况",type:"bar",barWidth:30,data:_.map(e.data,"amount")}]}),a&&a.hideLoading()}var e=this;$.extend(e._params,b||{}),e.echart=echarts.getInstanceByDom($("#dailyRaiseChart")[0]),e.echart&&(e.echart.hideLoading(),e.echart.showLoading(p)),g.get(f.cutDirtyParams($.extend(!0,{},j,{id:c.id},e._params)),function(b){e.data=b.products,a.avg_amount=b.avg_amount,a.max_amount=b.max_amount,a.min_amount=b.min_amount,d()})}}])}();