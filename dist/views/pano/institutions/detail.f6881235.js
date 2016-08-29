!function(){"use strict";angular.module("kt.pano").controller("ktInsitutionCtrl",["$scope","$rootScope","$location","$state","ktInsitutionsService","ktAnalyticsService","ktCompassAssetService","ktDataHelper","ktValueFactory",function(a,b,c,d,e,f,g,h,i){function j(a){"from"===o.dimension?a.from_eq=o.from:"mapped_exchange"===o.dimension&&(a.exchange_eq=o.mapped_exchange)}function k(){g.get($.extend({credit_right_or_eq:"bond"},z),function(b){a.products=b.compass_assets})}function l(){g.get($.extend({credit_right_or_eq:"am"},z),function(b){a.products2=b.compass_assets})}var m={dimension:"from",start_at:moment().day(0).add(+(moment().day()>0),"w").subtract(6,"weeks").add(1,"days").format("YYYY-MM-DD"),end_at:moment().day(0).add(+(moment().day()>0),"w").format("YYYY-MM-DD")},n=c.search(),o=a.params=$.extend({},m,n);o[o.dimension]=d.params.id,a.getLife=h.getLife,a.partnerType=function(){return"from"===o.dimension?"mapped_exchange":"mapped_exchange"===o.dimension?"from":void 0},a.moreHidden=function(){var a=b.user;return console.log(a),!("pended"===a.status||0===a.grade)},a.tabActive={tab1:!0,tab2:!1},a.moreChartView=function(){var a={dimension:o.dimension};a[o.dimension]=d.params.id;var b=d.href("pano.market.default",a);window.open(b,"_blank")},a.datepickerSettings={applyBtnClass:"btn btn-navy-blue btn-xs",singleMonth:!1,extraClass:"date-picker-pano-top",showWeekNumbers:!1,autoClose:!1,beforeShowDay:function(a){var b=moment(),c=a<=(b.day()?b.day(0).add(1,"w").toDate():b.toDate())&&a>=moment("2016-03-01").toDate(),d="",e=c?"":"不在可选范围内";return[c,d,e]},showShortcuts:!0,customShortcuts:[{name:"最近4周",dates:function(){var a=moment().day(0).add(+(moment().day()>0),"w").toDate(),b=moment(a).subtract(4,"w").add(1,"d").toDate();return[b,a]}},{name:"最近6周",dates:function(){var a=moment().day(0).add(+(moment().day()>0),"w").toDate(),b=moment(a).subtract(6,"w").add(1,"d").toDate();return[b,a]}},{name:"最近8周",dates:function(){var a=moment().day(0).add(+(moment().day()>0),"w").toDate(),b=moment(a).subtract(8,"w").add(1,"d").toDate();return[b,a]}}]},a.datePicker=o.start_at+"~"+o.end_at,a.$watch("datePicker",function(a,b){if(a!==b){var c=a.split("~"),d={start_at:c[0],end_at:c[1]};w.updateDataView(d),x.updateDataView(d),y.updateDataView(d)}});var p=function(a){return _.map(a,function(a){return moment(a).format("MMDD~")+moment(a).weekday(6).format("MMDD")})},q=40,r=65,s=50,t=80,u={text:"努力加载中...",color:"#3d4351",textColor:"#3d4351"},v={tooltip:{valueType:"rmb"},toolbox:{show:!1},legend:{left:"center",right:q/2,textStyle:{fontSize:12,color:"#626472"}},yAxis:{nameGap:20,splitLine:{show:!0,lineStyle:{color:["#f3f3f3"],width:1,type:"solid"}}},grid:{show:!0,top:s,left:r,right:q,bottom:t}},w=a.weekAmountChart={chartOptions:{},_params:{},yAxisFormat:"rmb",yAxis:"amount",xAxisFormat:null,list:[]};w.updateDataView=function(b){function c(){var a=d.echart=echarts.getInstanceByDom($("#weekAmountChart")[0]),b=d.data,c=_.map(b.data,"name"),e=h.chartOptions("#weekAmountChart",c);d.chartOptions=$.extend(!0,{},v,e,{legend:{data:c},tooltip:{axisPointer:{axis:"auto",type:"line"},reverse:!0,titlexAxisIndex:1,titleFormat:"@ToWeekEnd",titleSuffix:"发行量",xAxisFormat:d.xAxisFormat,yAxisFormat:d.yAxisFormat},yAxis:{name:"发行量（万元）"},xAxis:[{type:"category",name:"周",nameLocation:"end",axisLabel:{interval:b.xAxis.length>6||window.detectmob()?"auto":0},axisTick:{show:!1,interval:0},nameGap:10,boundaryGap:!1,data:p(b.xAxis)},{type:"category",axisLabel:{show:!1},axisTick:{show:!1},boundaryGap:!1,data:b.xAxis}],series:_.map(_.reverse(b.data),function(a){return{name:a.name,xAxisIndex:0,stack:"总量",itemStyle:{emphasis:{shadowColor:"rgba(0,0,0,.5)"}},areaStyle:{normal:{}},type:"line",smooth:!1,data:a.data}})}),a&&a.hideLoading()}var d=this;$.extend(d._params,b||{}),d.echart=echarts.getInstanceByDom($("#weekAmountChart")[0]),d.echart&&(d.echart.hideLoading(),d.echart.showLoading(u)),f.get(h.cutDirtyParams($.extend(!0,{},o,{content:"detail",chart:"circulation_group_by_week_and_from"},d._params)),function(b){b.crawled_at&&(a.updateDate=moment(b.crawled_at).format("YYYY-MM-DD")),d.data=h.chartDataPrune(b.stat),c()})};var x=a.weekRateChart={chartOptions:{},yAxisFormat:"percent2",yAxis:"rate",_filters:[{name:"期限：",options:[{name:"1M",value:1},{name:"3M",value:3},{name:"6M",value:6},{name:"1Y",value:12},{name:"2Y",value:24}]}],_getParamName:function(a){return _.find(this._filters[a].options,{value:this._params.life}).name},_params:{life:6},xAxisFormat:null,list:[]};x.updateDataView=function(a){function b(){var a=c.data,b=_.map(a.data,"name"),d=c.echart=echarts.getInstanceByDom($("#weekRateChart")[0]),e=h.chartOptions("#weekRateChart",b);c.chartOptions=$.extend(!0,{},v,e,{legend:{data:b},tooltip:{axisPointer:{axis:"auto",type:"line"},titleFormat:"@ToWeekEnd",titlexAxisIndex:1,titleSuffix:"收益率",xAxisFormat:c.xAxisFormat,yAxisFormat:c.yAxisFormat},yAxis:{name:"收益率（%）",interval:1,max:h.getAxisMax(a.data),min:0},xAxis:[{type:"category",name:"周",nameLocation:"end",axisLabel:{interval:a.xAxis.length>6||window.detectmob()?"auto":0},axisTick:{show:!1,interval:0},nameGap:10,boundaryGap:!1,data:p(a.xAxis)},{type:"category",axisLabel:{show:!1},axisTick:{show:!1},boundaryGap:!1,data:a.xAxis}],series:_.map(a.data,function(a){return{name:a.name,type:"line",xAxisIndex:0,markLine:{data:h.getMarkLineCoords(a.data)},smooth:!1,data:a.data}})}),d&&d.hideLoading()}var c=this;$.extend(c._params,a||{}),c.echart=echarts.getInstanceByDom($("#weekRateChart")[0]),c.echart&&(c.echart.hideLoading(),c.echart.showLoading(u)),f.get(h.cutDirtyParams($.extend(!0,{},o,{content:"detail",chart:"rate_group_by_week_and_from"},c._params)),function(a){c.data=h.chartDataPrune(a.stat),b()})};var y=a.assetTypePercentChart={chartOptions:{},_params:{},yAxisFormat:"percent2",yAxis:"rate",xAxisFormat:null,list:[]};y.updateDataView=function(a){function b(){var a=c.data,b=_.map(a,"name"),d=c.echart=echarts.getInstanceByDom($("#assetTypePercentChart")[0]),e=h.chartOptions("#assetTypePercentChart",b);c.chartOptions=$.extend(!0,{},v,e,{legend:{data:b},tooltip:{trigger:"item",axisPointer:{axis:"auto",type:"line"},formatter:function(a){var b='<div class="f1_2rem chart-tooltip-title" style="border-bottom: 1px solid rgba(255,255,255,.3);padding-bottom: 5px;margin-bottom:5px;">'+a.data.name+'</div><table class="f1_2rem chart-tooltip-table"><tr><td class="justify">占比：</td><td>'+i(a.data.value,c.yAxisFormat)+"</td></tr>";return b},xAxisFormat:c.xAxisFormat,yAxisFormat:c.yAxisFormat},yAxis:{show:!1},xAxis:{show:!1},grid:{show:!0,top:0,left:0,right:0,bottom:50},series:[{name:"访问来源",type:"pie",radius:"55%",center:["50%","50%"],data:a,itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]}),d&&d.hideLoading()}var c=this;$.extend(c._params,a||{}),c.echart=echarts.getInstanceByDom($("#assetTypePercentChart")[0]),c.echart&&(c.echart.hideLoading(),c.echart.showLoading(u)),f.get(h.cutDirtyParams($.extend(!0,{},o,{content:"overview",chart:"circulation_pct"},c._params)),function(a){c.data=h.chartDataToPercent(a.stat),c.data=_.chain(c.data.data).map(function(a){return{name:a.name,value:a.data_percent[0]||0}}).value(),b()})},a.moreTableView=function(a){var b={};j(b);var c=d.href("pano.products."+a,b);window.open(c,"_blank")};var z={page:1,per_page:10};j(z),a.inst={},a.moduleVisible=function(b){return a.inst&&_.includes(a.inst.tab,b)},e.get({instID:d.params.id},function(b){var c=a.inst=b.institution;c&&(c.descObj=h.textEllipsis(c.desc,".init-main-info .desc",0,13,4,6),c.assetsObj=h.textEllipsis(c.assets,".init-main-info",260,13,3,1),a.moduleVisible("chart")?(w.updateDataView(),x.updateDataView(),y.updateDataView()):(a.tabActive.tab1=!1,a.tabActive.tab2=!0),a.moduleVisible("am")&&l(),a.moduleVisible("bond")&&k())})}])}();