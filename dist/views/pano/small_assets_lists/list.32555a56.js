!function(){"use strict";angular.module("kt.pano").controller("ktAssetsTableListCtlr",["$scope","$rootScope","$state","$location","ktSweetAlert","ktDataHelper","ktSmallAssetsTableService","ktSmallAssetsSettingService",function(a,b,c,d,e,f,g,h){var i=a.shared,j=d.search(),k=["institution","finance_type_str","desc","project_file_str"];a.shared.placeholderText="输入关键字，如机构名称、资金类型、详细介绍或资料名称",a.gotoDetail=function(a){var b=c.href("pano.institutions.detail",{id:a.name,dimension:"0"===a.type?"from":"mapped_exchange"});window.open(b,"_blank")},a.gotoProducts=function(a,b){var d={};"0"===a.type?d.from_eq=a.name:"1"===a.type&&(d.exchange_eq=a.name);var e=c.href("am"===b?"pano.products.assetManage":"pano.products.obligatoryRight",d);window.open(e,"_blank")},a.rateSortTitle=function(){return"rate"===j.sort_by?"asc"===j.order?"按价格范围起始值由小到大排序":"按价格范围起始值由大到小排序":"取消按价格范围起始值排序"},a.amountSortTitle=function(){return"amount"===j.sort_by?"asc"===j.order?"按预计规模起始值由大到小排序":"按预计规模起始值由小到大排序":"取消按预计规模起始值排序"},a.dateSortTitle=function(){return"updated_at"===j.sort_by?"asc"===j.order?"按更新时间由旧到新排序":"按更新时间由新到旧排序":"取消按更新时间由新到旧排序"},i._params.totalItems=0,$.extend(i.params,j),i._params.page=i.params.page,f.pruneDirtyParams(i.params,j,["order","sort_by","search_fields[]"]),f.intFitlerStatus(a,j),i.filterDatas?(i.filters=i.filterDatas,f.filterInit(i.filters)(i.params)):h.get({},function(a){i.filterDatas=a[0],i.filters=i.filterDatas,f.filterInit(i.filters)(i.params)}),g.get(f.cutDirtyParams(i.params),function(b){a.institutions=b.result.micro_finaces;var c=b.result.summary.find.search_results;c&&(b.result.summary.find.search_results=_.filter(c,function(a){return 0!==a.search_count}),b.result.summary.find.search_results.sort(function(a,b){return _.indexOf(k,a.name)>_.indexOf(k,b.name)?1:_.indexOf(k,a.name)<_.indexOf(k,b.name)?-1:0})),a.summary=b.result.summary.find,i._params.totalItems=b.result.summary.find.all_related.count,i._params.totalPages=_.ceil(b.result.summary.find.all_related.count/i.params.per_page),i.params.page=j.page||i.params.page,a.pageChanged=function(){d.search("page",i.params.page)}})}])}();