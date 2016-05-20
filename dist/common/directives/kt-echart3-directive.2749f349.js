!function(){"use strict";angular.module("kt.common").directive("ktEchart",["$rootScope","ktValueFactory",function(a,b){return{restrict:"A",scope:{chartOptions:"=chartOptions"},link:function(c,d,e){function f(a){var b=d.find(".custom-data-zoom");if(b.length)return void b.css(a.styles||{}).attr(a.attr||{}).find(".zoom-box").css({left:a.start+"%",right:100-a.end+"%"});b=$('<div class="custom-data-zoom dn"/>').attr($.extend({id:_.uniqueId("dataZoom")},a.attr||{})).append($('<div class="zoom-box" title="可以拖拽，放大缩小"/>').css({left:a.start+"%",right:100-a.end+"%"})).appendTo(d).css(a.styles||{}).on("zoomUpdate",function(a,b){var c=h.getOption().customDataZoom,d=$(this).find(".zoom-box");d.attr({style:b.styles,"data-x":b.dataX}),c.onZoom&&c.onZoom(b)});var e;interact(".zoom-box",{context:d[0]}).draggable({inertia:!1,restrict:{restriction:".custom-data-zoom",endOnly:!1,elementRect:{left:0,right:1,top:0,bottom:1}},onmove:function(a){var b=$(a.target),c=(parseFloat(b.attr("data-x"))||0)+a.dx;b.css({transform:"translateX("+c+"px)"}).attr("data-x",c),clearTimeout(e),e=setTimeout(function(){g(b)},300)}}).on("dragend",function(){}).resizable({preserveAspectRatio:!1,restrict:{restriction:".custom-data-zoom"},edges:{left:!0,right:!0,bottom:!1,top:!1}}).on("resizemove",function(b){var c=$(b.target);if(!(b.rect.width<(a.minWidth*c.parent().width()/100||15))){var d=parseFloat(c.attr("data-x"))||0;d+=b.deltaRect.left,c.css({width:b.rect.width+"px",transform:"translate("+d+"px)"}).attr("data-x",d),clearTimeout(e),e=setTimeout(function(){g(c)},300)}}).on("resizeend",function(){}),c.$watch("chartOptions.filterVisible",function(a){a?b.fadeIn():b.fadeOut()})}function g(a){var b=$(a),c=h.getOption().customDataZoom,d=b.parent(),e=d.width(),f=b.position(),g=d.attr("group"),i={type:"dataZoom",styles:b.attr("style"),dataX:b.attr("data-x"),start:100*_.round(f.left/e,2),end:100*_.round((b.outerWidth()+f.left)/e,2)};g&&$(".custom-data-zoom").filter(function(){return!$(this).is(d)&&$(this).attr("group")===g}).trigger("zoomUpdate",$.extend({triggerType:"manual"},i)),c.onZoom&&c.onZoom(i)}if(!echarts.getInstanceByDom(d[0])){var h=echarts.init(d[0],"theme1"),i=b,j={tooltip:{trigger:"axis",shadowStyle:{color:"rgba(0,0,0,.1)"},textStyle:{color:"white"},axisPointer:{type:"shadow"},formatter:function(a){var b=this.getOption(),c=b.color,d=b.tooltip[0].yAxisFormat,e=b.tooltip[0].reverse,f=b.tooltip[0].titlePrefix||"",g=b.tooltip[0].titleSuffix||"",h=b.tooltip[0].titleFormat||"",j=b.tooltip[0].noUnit,k=a[0].name;if(c=b.tooltip[0].color||c,!_.isArray(a))return"";e&&(a=_.reverse(a)),"@ToWeekEnd"===h&&(k+=" ~ "+moment(a[0].name).weekday(6).format("YYYY-MM-DD")),k=f+k+g;var l='<div class="f1_2rem chart-tooltip-title" style="border-bottom: 1px solid rgba(255,255,255,.3);padding-bottom: 5px;margin-bottom:5px;">'+k+'</div><table class="f1_2rem chart-tooltip-table">';return l=_.reduce(a,function(a,b){return a+'<tr><td class="justify"><i class="fa-circle fa" style="transform: scale(0.8);color:'+c[b.seriesIndex]+';"></i>'+b.seriesName+'：</td><td class="text-right"><span>'+i(b.data,d,j).replace(/^(0万元|0)$/g,"-")+"</span></td></tr>"},l)}.bind(h)},toolbox:{show:!1,orient:"vertical",x:"right",y:"center",feature:{dataView:{show:!0,readOnly:!1},magicType:{show:!0,type:["line","bar","stack","tiled"]},restore:{show:!0},saveAsImage:{show:!0}}},yAxis:{type:"value",boundaryGap:[0,"10%"],axisLabel:{textStyle:{color:"#666b76",fontSize:10},formatter:function(a){var b=this.getOption().tooltip[0].yAxisFormat;return i(a,b).toString().replace(/%|万元|百万|元/g,"")}.bind(h)}},legend:{bottom:10,data:[]},xAxis:{type:"value",axisLabel:{formatter:function(a){var b=this.getOption().tooltip[0].xAxisFormat;return i(a,b)}.bind(h)},data:[]},series:[]},k=$.extend(!0,{},j,c.chartOptions||{});k.group&&(h.group=k.group),$.isPlainObject(k.customDataZoom)&&f(k.customDataZoom),h.setOption(k),h.on("legendselectchanged",function(b){a.$broadcast("legendSelected",{chartId:e.id,target:b.name,targetValue:b.selected[b.name]})}),h.on("datazoom",function(){var a=c.chartOptions.dataZoom;if(a&&!$.isEmptyObject(a)&&(!$.isArray(a)||a.length)){$.isPlainObject(a)&&(a=[a]);var b=_.toArray(arguments);_.each(a,function(a){$.isFunction(a.onZoom)&&a.onZoom.apply(h,b)})}}),d.data("echart",h),c.$watch("chartOptions",function(a){a&&$.isPlainObject(a.customDataZoom)&&f(a.customDataZoom),h.setOption($.extend(!0,{},k,a||{}),!0)}),$(window).on("resize",function(){h.resize()})}}}}]).directive("ktEchartLegend",function(){return{restrict:"A",require:"ngModel",link:function(a,b,c,d){b.on("change",function(){var a=$("#"+c.chartId).data("echart"),b={legend:{selected:{}}};b.legend.selected[c.name]=d.$modelValue,a&&a.setOption(b)}),a.$on("legendSelected",function(a,b){c.name===b.target&&c.chartId===b.chartId&&(d.$setViewValue(b.targetValue),d.$render())})}}})}();