!function(){"use strict";angular.module("kt.pano").controller("ktProductObligatoryRightCtrl",["$scope","$state","$location","ktDataHelper","ktProductsService","ktSweetAlert",function(a,b,c,d,e,f){var g=a.shared,h=a.search=c.search(),i=[{value:"life_days_in",type:"dropdown"},{value:"rate_in",type:"dropdown"},{value:"asset_type_eq",type:"dropdown"}];a.gotoDetail=function(a){"Product"===a["class"]?b.go("pano.productObligatoryRight",{id:a.id}):f.swal({title:"提示",timer:1500,text:"该产品暂未录入详情"})},g.tabActive.tab0=!0,h.created_or_updated_in=_.isString(h.created_or_updated_in)?h.created_or_updated_in.split(","):[],g._params.page=g.params.page,$.extend(g.params,h,{credit_right_or_eq:"bond"}),d.pruneDirtyParams(g.params,h,["order","sort_by"]),d.intFitlerStatus(a,h),g.filterDatas?(g.filters=g.filterDatas[0],d.filterInit(g.filters,i)(g.params)):e.get({content:"settings"},function(a){g.filterDatas=a,g.filters=a[0],d.filterInit(g.filters,i)(g.params)}),e.get(d.cutDirtyParams(g.params),function(c){a.products=c.products,a.summary=c.summary,g._params.totalItems=c.summary.find.count,g._params.totalPages=_.ceil(c.summary.find.count/g.params.per_page),a.$emit("totalItemGot",h),a.$watch("shared.params.created_or_updated_in.length",function(){_.isArray(g.params.created_or_updated_in)&&b.go(b.current.name,{created_or_updated_in:g.params.created_or_updated_in.join()})})}),a.searchTabClick=function(b){e.get($.extend({"search_fields[]":b},d.cutDirtyParams(g.params)),function(b){a.products=b.products,g._params.totalItems=b.summary.find.count,g._params.totalPages=_.ceil(b.summary.find.count/g.params.per_page),a.$emit("totalItemGot",h)})}}])}();