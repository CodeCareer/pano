;
(function() {
    'use strict';
    angular.module('kt.pano')
        .controller('ktOrderObligatoryRightCtrl', function($scope, $state, $location, ktDataHelper, ktAssetFiltersService, ktAssetService) {
            var shared = $scope.shared
            var search = $location.search()

            shared.tabActive.tab0 = true
            $.extend(shared.params, search, { tab: 0 })
            ktDataHelper.pruneDirtyParams(shared.params, search, ['order', 'sort_by'])

            if (!shared.filterDatas) {
                ktAssetFiltersService.get(function(data) {
                    shared.filterDatas = data
                    shared.filters = data['0']
                    ktDataHelper.filterInit(shared.filters)(shared.params)

                })
            } else {
                shared.filters = shared.filterDatas['0']
                ktDataHelper.filterInit(shared.filters)(shared.params)
            }

            // var pendingID = ktAssetService.latestPendingID = _.uniqueId('ktAssetService_')

            ktAssetService.get(ktDataHelper.cutDirtyParams(shared.params), function(res) {
                // if (pendingID !== ktAssetService.latestPendingID) return

                $scope.assets = res.fame_assets
                shared._params.totalItems = res.total_items || 1
                $scope.$emit('totalItemGot', search)
            })
        })
})();
