FlowRouter.route('/profile/need', {
    name: "need",
    action: function(params, queryParams) {
        BlazeLayout.render("template", {
            content: 'profile_need'
        });
    }
});
Template.profile_need = Template.fromString(`
<section class="wrapper">
  <div id="loveChart" style="width:100%;height:600px;"></div>
</section>
`);
Template.profile_need.onCreated(function() {
    this.subscribe('schools');
});
Template.profile_need.helpers({});
Template.profile_need.events({});
Template.profile_need.onRendered(function() {
    this.$("#loveChart").height($(window).height() - 60);
    const echarts = require('echarts');
    var loveChart = echarts.init(document.getElementById('loveChart'));
    option = {
        backgroundColor: '#404a59',
        title: {
            text: '森林天使全国留守儿童待关爱数据',
            subtext: 'data from slangel.com',
            sublink: '',
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                return params.name + '<br>有' + params.value[2] + '名需要救助的儿童';
            }
        },
        legend: {
            orient: 'vertical',
            y: 'bottom',
            x: 'right',
            data: ['需要救助的儿童'],
            textStyle: {
                color: '#fff'
            }
        },
        visualMap: {
            min: 0,
            max: 1000,
            splitNumber: 5,
            color: ['#d94e5d', '#eac736', '#50a3ba'],
            textStyle: {
                color: '#fff'
            }
        },
        geo: {
            map: 'china',
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#323c48',
                    borderColor: '#111'
                },
                emphasis: {
                    areaColor: '#2a333d'
                }
            }
        },
        series: [{
            name: '需要救助的儿童',
            data: [],
            type: 'effectScatter',
            coordinateSystem: 'geo',
            symbolSize: function(val) {
                return 1;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#f4e925',
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            zlevel: 1
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    loveChart.setOption(option);
    this.autorun(() => {
        if (this.subscriptionsReady()) {
            const schools = School.find({}, {
                sort: {
                    invest: -1
                }
            }).fetch();
            // console.log(schools[0]);
            const invest = schools[0].childrens;
            let max = 31;
            let step = 1;
            while (max > 30) {
                max = invest / step;
                step = step + 0.2;
                // console.log(step);
            }
            // console.log(max);
            let list = [];
            for (s of schools) {
                let geoCoord = s.coord.split(',');
                list.push({
                    name: s.name,
                    value: geoCoord.concat(s.childrens),
                });
            }
            loveChart.setOption({
                visualMap: {
                    max: invest,
                },
                series: [{
                    name: '需要救助的儿童',
                    data: list,
                    symbolSize: function(val) {
                        return val[2] / step;
                    },
                }]
            });
        }
    });
});
