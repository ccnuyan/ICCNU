import html from './WeekChart.html';
import toReadable from '../../../services/readableInterval.js';

var WeekChart = function (dom) {
    this.dom = $(html);
    dom.append(this.dom);
};

var WeekConfig = {
    '201602': {
        start: 871,
        end: 889,
        title: '2016秋季学期'
    }
};

WeekChart.prototype.update = function (courseid) {
    //echarts configuration
    var trend = svcs.courseService.getCourse(courseid).trend;

    var config = WeekConfig[TERM_CODE];

    var weekscount = config.end - config.start + 1;

    var xAx = [...Array(weekscount).keys()].map(function (num) {
        return (num + 1);
    });

    var yAx = [];

    for (var i = 0; i < weekscount; i++) {
        yAx.push(trend.Weeks[config.start + i] / 60 | 0);
    }

    var option = {
        title: {
            text: '每周学习时长变化曲线',
            subtext: config.title
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                return `第${params[0].name}周:<br/>${toReadable(params[0].data * 60)}`;
            }
        },
        toolbox: {
            show: true,
            feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: xAx,
                axisLabel: {
                    formatter: '{value}周'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    formatter: '{value}分钟'
                }
            }
        ],
        series: [
            {
                name: '学习时长',
                type: 'line',
                data: yAx,
                markPoint: {
                    data: [
                        {
                            type: 'max', name: '最大值',
                        },
                        {
                            type: 'min', name: '最小值',
                        }
                    ]
                }
            },
        ]
    };
    window.updateChart(option);
};


export default WeekChart;