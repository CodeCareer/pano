;
(function() {
    'use strict';
    angular.module('kt.pano')
        .controller('ktMarketCtrl', function($scope, $q, $state, $timeout, $location, ktDataHelper, ktMarketAnalyticsService, ktRateTrendService) {
            // shared.tabActive.tab1 = true
            var shared = $scope.shared
            var params = shared.params

            $.extend(params, $location.search())

            $scope.updateDate = moment().subtract(1, 'd').format('YYYY-MM-DD')
            ktDataHelper.filterUpdate(shared.filters, shared.params)

            var isAllDimension = params[params.dimension] === 'all' || !params[params.dimension]
            var defaultShowLength = 8
            var legendSelected = {}
            var getSelectedLegend = function(xAxis) {
                _.each(xAxis, function(v, i) {
                    legendSelected[v] = i <= defaultShowLength
                })
            }
            var rightGap = 40 // 图表主体距离右边距离
            var leftGap = 65
            var topGap = 50
            var bottomGap = isAllDimension ? 140 : 80

            var chartOptions = {
                tooltip: {
                    valueType: 'rmb' //自定义属性，tooltip标示，决定是否显示百分比数值
                },
                toolbox: {
                    show: false,
                },
                legend: {
                    left: isAllDimension ? leftGap - 25 : 'center',
                    // right: rightGap / 2,
                    textStyle: {
                        fontSize: 12,
                        color: '#626472' // 图例文字颜色
                    }
                },
                yAxis: [{
                    nameGap: 20
                }],
                grid: {
                    show: true,
                    top: topGap,
                    left: leftGap,
                    right: rightGap, // 距离右面的距离
                    bottom: bottomGap, // 距离底部的距离
                    borderWidth: 0,
                    backgroundColor: '#fafafa',
                }
            }

            var weekAmountChart = $scope.weekAmountChart = {
                chartOptions: {
                    filterVisble: false
                },
                _params: {},
                xAxis: params.dimension,
                yAxisFormat: 'rmb',
                yAxis: 'amount',
                xAxisFormat: null,
                list: []
            }

            var durationAmountChart = $scope.durationAmountChart = {
                chartOptions: {
                },
                _params: getStartEnd(),
                xAxis: params.dimension,
                yAxisFormat: 'rmb', //percent2 意思不需要*100
                yAxis: 'amount',
                xAxisFormat: null,
                list: []

            }

            var weekRateChart = $scope.weekRateChart = {
                chartOptions: {
                },
                xAxis: params.dimension,
                yAxisFormat: 'percent2', //percent2 意思不需要*100
                yAxis: 'rate',
                _filters: [{
                    name: '期限：',
                    options: [
                        {
                            name: '1M',
                            value: 1
                        }, {
                            name: '3M',
                            value: 3
                        }, {
                            name: '6M',
                            value: 6
                        }, {
                            name: '1Y',
                            value: 12
                        }, {
                            name: '2Y',
                            value: 24
                        }
                    ]
                }],
                _getParamName: function(index) {
                    return _.find(this._filters[index].options, { value: this._params.life }).name
                },
                _params: {
                    life: 12
                },
                xAxisFormat: null,
                list: []

            }

            var durationRateChart = $scope.durationRateChart = {
                _params: getStartEnd(),
                chartOptions: {},
                xAxis: params.dimension,
                yAxisFormat: 'percent2', //percent2 意思不需要*100
                yAxis: 'rate',
                xAxisFormat: null,
                list: []

            }

            // 自定义缩放组件的位置初始化，百分比
            function getStartEndPercent(data) {
                var l = data.xAxis.length
                var start = l > 2 ? 100 - (100 / (l - 1)) * 3 / 2 : 25
                var end = l > 2 ? 100 - (100 / (l - 1)) / 2 : 75

                if (end - start < 5) {
                    start = end - 5
                }

                return {
                    start: start,
                    end: end
                }
            }

            // 用于联动表格的日期初始化显示
            function getStartEnd() {
                var start = moment(params.start_at)
                var end = moment(params.end_at)
                var isGtTwoWeeks = end.weeks() - start.weeks() > 1

                return {
                    start_at: isGtTwoWeeks ? moment(params.end_at).days(0).subtract(2, 'w').add(1, 'd').format('YYYY-MM-DD') : moment(params.start_at).days(0).add(1, 'd').format('YYYY-MM-DD'),
                    end_at: isGtTwoWeeks ? moment(params.end_at).days(0).subtract(1, 'w').add(1, 'd').format('YYYY-MM-DD') : moment(params.end_at).days(6).add(1, 'd').format('YYYY-MM-DD'),
                }
            }

            function customDataZoom(chart, options) {
                var updatePromise

                return $.extend(true, {}, {
                    show: true,
                    attr: {
                        group: 'group1'
                    },
                    styles: {
                        position: 'absolute',
                        left: leftGap - 1,
                        right: rightGap - 1,
                        bottom: bottomGap,
                        // height: isAllDimension ? 220 : 280,
                        top: topGap,
                    },
                    onZoom: function(e) {
                        if (e.triggerType === 'manual') return

                        var xAxis = chart.getOption().xAxis[1]
                        var l = xAxis.data.length
                        var startDate = xAxis.data[((l - 1) * e.start.toFixed(2) / 100) | 0]
                        var endDate = moment(xAxis.data[((l - 1) * e.end.toFixed(2) / 100) | 0]).day(0).add(1, 'w').format('YYYY-MM-DD')

                        $timeout.cancel(updatePromise)
                        updatePromise = $timeout(function() {
                            $scope.durationAmountChart.udpateDataView({
                                start_at: startDate,
                                end_at: endDate
                            }, true)

                            $scope.durationRateChart.udpateDataView({
                                start_at: startDate,
                                end_at: endDate
                            }, true)
                        }, 500)
                    }
                }, options || {})
            }

            /*function dataZoom(chart, options) {
                var updatePromise
                return [$.extend({
                    show: true,
                    realtime: false,
                    throttle: 500,
                    top: 50,
                    showDataShadow: false,
                    showDetail: false,
                    fillerColor: 'rgba(144,197,237,0.2)', // 填充颜色
                    handleColor: 'rgba(70,130,180,0.4)',
                    handleSize: 3,
                    textStyle: {
                        color: 'transparent'
                    },
                    left: 65,
                    height: isAllDimension ? 220 : 280,
                    start: 0,
                    end: 100,
                    backgroundColor: 'rgba(0,0,0,0)', // 背景颜色
                    dataBackgroundColor: 'rgba(0,0,0,0)', // 数据背景颜色
                    xAxisIndex: 1,
                    onZoom: function(e) {
                        if (e.triggerType === 'manual') return

                        var xAxis = this.getOption().xAxis[1]
                        var l = xAxis.data.length
                        var startDate = xAxis.data[((l - 1) * e.start.toFixed(2) / 100) | 0]
                        var endDate = moment(xAxis.data[((l - 1) * e.end.toFixed(2) / 100) | 0]).day(0).add(1, 'w').format('YYYY-MM-DD')
                            // console.log(e.start, e.end, Math.ceil((l - 1) * e.start.toFixed(2) / 100), ((l - 1) * e.end.toFixed(2) / 100) | 0, startDate, endDate)

                        chart.dispatchAction({
                            type: 'dataZoom',
                            triggerType: 'manual', //自定义属性，避免死循环
                            // 可选，dataZoom 组件的 index，多个 dataZoom 组件时有用，默认为 0
                            // dataZoomIndex: number,
                            // 开始位置的百分比，0 - 100
                            start: e.start,
                            // 结束位置的百分比，0 - 100
                            end: e.end,
                            // 开始位置的数值
                            // startValue: number,
                            // 结束位置的数值
                            // endValue: number
                        })

                        $timeout.cancel(updatePromise)
                        updatePromise = $timeout(function() {
                            $scope.durationAmountChart.udpateDataView({
                                start_at: startDate,
                                end_at: endDate
                            }, true)

                            $scope.durationRateChart.udpateDataView({
                                start_at: startDate,
                                end_at: endDate
                            }, true)
                        }, 500)

                        // console.log(e.start, e.end, e.startValue)
                        // console.log(startDate, endDate, (l - 1) * e.end.toFixed(2) / 100, (l - 1) * e.start.toFixed(2) / 100)
                    },
                    type: 'slider'
                }, options || {})]
            }*/

            weekAmountChart.udpateDataView = function(paramObj) {
                var _self = this
                $.extend(_self._params, paramObj || {})

                ktMarketAnalyticsService.get(ktDataHelper.cutDirtyParams($.extend(true, {}, params, {
                    chart: 'circulation_group_by_week_and_from',
                }, _self._params)), function(data) {
                    _self.data = ktDataHelper.chartDataPrune(data.stat)
                    updateView()
                })

                function updateView() {
                    var data = _self.data
                    var legend = _.map(data.data, 'name')
                    getSelectedLegend(legend) //只需要生成一次，其他chart与其相同

                    var caculateOptions = ktDataHelper.chartOptions('#weekAmountChart', legend)

                    _self.chartOptions = $.extend(true, {}, chartOptions, _self.chartOptions, caculateOptions, {
                        legend: {
                            data: legend,
                            selected: legendSelected,
                        },
                        customDataZoom: customDataZoom(echarts.getInstanceByDom($('#weekAmountChart')[0]), $.extend(getStartEndPercent(data), {
                            styles: {
                                bottom: caculateOptions.grid.bottom
                            }
                        })),
                        tooltip: {
                            // show: false,
                            // showContent: false,
                            // triggerOn: 'click',
                            // trigger: 'item',
                            axisPointer: {
                                axis: 'auto',
                                type: 'line',
                            },
                            titleSuffix: '所在周发行量',
                            // noUnit: true,
                            xAxisFormat: _self.xAxisFormat,
                            yAxisFormat: _self.yAxisFormat //自定义属性，tooltip标示，决定是否显示百分比数值
                        },
                        yAxis: [{
                            name: '发行量（单位：万元）'
                        }],
                        xAxis: [{
                            type: 'category',
                            name: '周',
                            nameLocation: 'end',
                            nameGap: 10,
                            boundaryGap: false,
                            data: data.xAxis
                        }, {
                            type: 'category',
                            axisLabel: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            boundaryGap: false,
                            data: data.xAxis
                        }],

                        series: _.map(data.data, function(v) {
                            return {
                                name: v.name,
                                xAxisIndex: 0,
                                stack: '总量',
                                itemStyle: {
                                    emphasis: {
                                        shadowColor: 'rgba(0,0,0,.5)'
                                    }
                                },
                                areaStyle: { normal: {} },
                                type: 'line',
                                smooth: false,
                                data: v.data
                            }
                        })
                    })
                }
            }

            durationAmountChart.udpateDataView = function(paramObj, silent) {
                var _self = this
                $.extend(_self._params, paramObj || {})

                ktMarketAnalyticsService.get(ktDataHelper.cutDirtyParams($.extend(true, {}, params, {
                    chart: 'circulation_group_by_life_days_and_from',
                }, _self._params)), function(data) {
                    _self.data = ktDataHelper.chartDataPrune(data.stat)
                    updateView()
                })

                function initChartOptions() {
                    var data = _self.data
                    var caculateOptions = ktDataHelper.chartOptions('#durationAmountChart', _.map(data.data, 'name'))

                    return $.extend(true, {}, chartOptions, _self.chartOptions, caculateOptions, {
                        tooltip: {
                            xAxisFormat: _self.xAxisFormat,
                            yAxisFormat: _self.yAxisFormat //自定义属性，tooltip标示，决定是否显示百分比数值
                        },
                        yAxis: [{
                            name: '发行量（单位：万元）'
                        }],
                        xAxis: [{
                            type: 'category',
                            name: '期限',
                            nameLocation: 'end',
                            nameGap: 10,
                            boundaryGap: true,
                            data: ktDataHelper.chartAxisFormat(data.xAxis, 'MY')
                        }],

                    })
                }

                function updateView() {
                    var initOptions = silent ? {} : initChartOptions()
                    var data = _self.data

                    _self.chartOptions = $.extend(true, {}, initOptions, {
                        legend: {
                            data: _.map(data.data, 'name'),
                            selected: legendSelected,
                        },
                        /*yAxis: [{
                            max: ktDataHelper.getAxisMax(data.data),
                            min: ktDataHelper.getAxisMin(data.data),
                        }],*/
                        series: _.map(data.data, function(v) {
                            return {
                                name: v.name,
                                itemStyle: {
                                    emphasis: {
                                        barBorderWidth: 1,
                                        barBorderColor: 'rgba(0,0,0,.5)'
                                    }
                                },
                                stack: '总量',
                                type: 'bar',
                                barWidth: 30,
                                data: v.data
                            }
                        })
                    })
                }
            }


            weekRateChart.udpateDataView = function(paramObj) {
                var _self = this
                $.extend(_self._params, paramObj || {})

                ktMarketAnalyticsService.get(ktDataHelper.cutDirtyParams($.extend(true, {}, params, {
                    chart: 'rate_group_by_week_and_from',
                }, _self._params)), function(data) {
                    _self.data = ktDataHelper.chartDataPrune(data.stat)
                    updateView()
                })

                function updateView() {
                    var data = _self.data
                    var legend = _.map(data.data, 'name')

                    var caculateOptions = ktDataHelper.chartOptions('#weekRateChart', legend)

                    _self.chartOptions = $.extend(true, {}, chartOptions, _self.chartOptions, caculateOptions, {
                        legend: {
                            data: legend,
                            selected: legendSelected,
                        },
                        customDataZoom: customDataZoom(echarts.getInstanceByDom($('#weekRateChart')[0]), $.extend(getStartEndPercent(data), {
                            styles: {
                                bottom: caculateOptions.grid.bottom
                            }
                        })),
                        tooltip: {
                            axisPointer: {
                                axis: 'auto',
                                type: 'line',
                            },
                            titleSuffix: '所在周收益率',
                            xAxisFormat: _self.xAxisFormat,
                            yAxisFormat: _self.yAxisFormat //自定义属性，tooltip标示，决定是否显示百分比数值
                        },
                        yAxis: [{
                            name: '收益率（单位：%）',
                            max: ktDataHelper.getAxisMax(data.data),
                            min: ktDataHelper.getAxisMin(data.data),
                        }],
                        xAxis: [{
                            type: 'category',
                            name: '周',
                            nameLocation: 'end',
                            nameGap: 10,
                            boundaryGap: false,
                            data: data.xAxis
                        }, {
                            type: 'category',
                            axisLabel: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            boundaryGap: false,
                            data: data.xAxis
                        }],

                        series: _.map(data.data, function(v) {
                            return {
                                name: v.name,
                                type: 'line',
                                markLine: {
                                    data: ktDataHelper.getMarkLineCoords(v.data)
                                },
                                smooth: false,
                                data: v.data
                            }
                        })
                    })
                }
            }

            durationRateChart.udpateDataView = function(paramObj, silent) {
                var _self = this
                $.extend(_self._params, paramObj || {})

                ktMarketAnalyticsService.get(ktDataHelper.cutDirtyParams($.extend(true, {}, params, {
                    chart: 'rate_group_by_life_days_and_from',
                }, _self._params)), function(data) {
                    _self.data = ktDataHelper.chartDataPrune(data.stat)
                    updateView()
                })

                function initChartOptions() {
                    var data = _self.data
                    var caculateOptions = ktDataHelper.chartOptions('#durationRateChart', _.map(data.data, 'name'))

                    return $.extend(true, {}, chartOptions, _self.chartOptions, caculateOptions, {
                        tooltip: {
                            axisPointer: {
                                axis: 'auto',
                                type: 'line',
                            },

                            xAxisFormat: _self.xAxisFormat,
                            yAxisFormat: _self.yAxisFormat //自定义属性，tooltip标示，决定是否显示百分比数值
                        },
                        yAxis: [{
                            name: '收益率（单位：%）',
                        }],
                        xAxis: [{
                            type: 'category',
                            name: '期限',
                            nameLocation: 'end',
                            nameGap: 10,
                            boundaryGap: false,
                            data: ktDataHelper.chartAxisFormat(data.xAxis, 'MY')
                        }],

                    })
                }

                function updateView() {
                    var data = _self.data
                    var initOptions = silent ? {} : initChartOptions()

                    _self.chartOptions = $.extend(true, {}, initOptions, {
                        legend: {
                            data: _.map(data.data, 'name'),
                            selected: legendSelected,
                        },
                        yAxis: [{
                            max: ktDataHelper.getAxisMax(data.data),
                            min: ktDataHelper.getAxisMin(data.data),
                        }],
                        series: _.map(data.data, function(v) {
                            return {
                                name: v.name,
                                type: 'line',
                                markLine: {
                                    data: ktDataHelper.getMarkLineCoords(v.data)
                                },
                                smooth: false,
                                data: v.data
                            }
                        })
                    })
                }
            }

            weekAmountChart.udpateDataView()
            durationAmountChart.udpateDataView()
            weekRateChart.udpateDataView()
            durationRateChart.udpateDataView()
                // echarts.connect('group1')
                // 资产管理类数据
            $scope.assetManger = {}
            ktRateTrendService.get(function(data) {
                // [].unshift.apply(data.stat.keys, ['资管管理人', '平台'])
                $scope.assetManger = data.stat
            })

        })
})();
