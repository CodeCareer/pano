;
(function() {
    'use strict';
    angular.module('kt.pano')
        .controller('ktProductAssetManageCtrl', function($scope, $state, $location, ktSweetAlert, ktDataHelper, ktCompassAssetFiltersService, ktCompassAssetService) {
            var shared = $scope.shared

            shared.tabActive.tab1 = true
            $.extend(shared.params, $location.search(), { credit_right_or_eq: 'am' })

            if (!shared.filterDatas) {
                ktCompassAssetFiltersService.get(function(data) {
                    shared.filterDatas = data
                    shared.filters = data['1']
                    var filterInit = ktDataHelper.filterInit(shared.filters)
                    filterInit(shared.params)
                })
            } else {
                shared.filters = shared.filterDatas['1']
                ktDataHelper.filterUpdate(shared.filters, shared.params)
            }

            ktCompassAssetService.get(ktDataHelper.cutDirtyParams(shared.params), function(res) {
                $scope.products = res.compass_assets
                shared.params.totalItems = res.total_items
                shared.today_added_count = res.today_added_count
                $scope.$emit('totalItemGot')
            })
        })
})();
