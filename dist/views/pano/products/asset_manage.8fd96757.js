!function(){"use strict";angular.module("kt.pano").controller("ktProductAssetManageCtrl",["$scope","$state","$location","ktSweetAlert","ktDataHelper","ktCompassAssetService",function(a,b,c,d,e,f){var g=a.shared,h=c.search();g.tabActive.tab1=!0,$.extend(g.params,h,{credit_right_or_eq:"am"}),e.pruneDirtyParams(g.params,h,["order","sort_by"]),f.get(e.cutDirtyParams(g.params),function(b){a.products=b.compass_assets,g._params.totalItems=b.total_items,g.today_added_count=b.today_added_count,a.$emit("totalItemGot",h)})}])}();