!function(){"use strict";angular.module("kt.pano").controller("ktProductObligatoryRightCtrl",["$scope","$rootScope","$state","$location","ktDataHelper","ktProductsService","ktSweetAlert",function(a,b,c,d,e,f,g){var h=a.shared,i=a.search=d.search(),j=["name","from","exchange","asset_type","original_asset","type","trust_party"];a.shared.placeholderText="请输入产品名称、平台名称、挂牌场所、资产类型、底层资产、产品类型或增信措施";var k=[{value:"life_days_in",type:"dropdown"},{value:"rate_in",type:"dropdown"},{value:"asset_type_eq",type:"dropdown"}];a.updatedAtSortTitle=function(){return"updated_at"===i.sort_by?"asc"===i.order?"点击按更新时间由新到旧排序":"点击取消按更新时间排序":"点击按更新时间由旧到新排序"},a.rateSortTitle=function(){return"rate"===i.sort_by?"asc"===i.order?"点击按年化收益率由大到小排序":"点击取消按年化收益率排序":"点击按年化收益率由小到大排序"},a.gotoDetail=function(a){"Product"===a.class?c.go("pano.productObligatoryRight",{id:a.id}):g.swal({title:"提示",timer:1500,text:"该产品暂未录入详情"})},h.tabActive.tab0=!0,h._params.created_or_updated_in=_.isString(i.created_or_updated_in)?i.created_or_updated_in.split(","):i.created_or_updated_in||[],h._params.totalItems=0,$.extend(h.params,i,{credit_right_or_eq:"bond"}),h._params.page=h.params.page,e.pruneDirtyParams(h.params,i,["order","sort_by","created_or_updated_in","search_fields[]"]),e.intFitlerStatus(a,i),h.filterDatas?(h.filters=h.filterDatas[0],e.filterInit(h.filters,k)(h.params)):f.get({content:"settings"},function(a){h.filterDatas=a,h.filters=a[0],e.filterInit(h.filters,k)(h.params)}),f.get(e.cutDirtyParams(h.params),function(b){a.updateTime=b.latest_uptime,a.products=b.products,b.summary.find.search_results&&(b.summary.find.search_results=_.filter(b.summary.find.search_results,function(a){return 0!==a.search_count}),b.summary.find.search_results.sort(function(a,b){return _.indexOf(j,a.name)>_.indexOf(j,b.name)?1:_.indexOf(j,a.name)<_.indexOf(j,b.name)?-1:0})),a.summary=b.summary,h._params.totalItems=b.summary.find.count,h._params.totalPages=_.ceil(b.summary.find.count/h.params.per_page),h.params.page=i.page||h.params.page,a.pageChanged=function(){d.search("page",h.params.page)},a.$watch("shared._params.created_or_updated_in.length",function(){_.isArray(h._params.created_or_updated_in)&&c.go(c.current.name,{created_or_updated_in:h._params.created_or_updated_in.sort().join()})})})}])}();