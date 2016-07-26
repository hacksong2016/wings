FlowRouter.route('/profile/love', {
    name: "love",
    action: function(params, queryParams) {
        BlazeLayout.render("template", {
            content: 'profile_love'
        });
    }
});
Template.profile_love = Template.fromString(`
<section class="wrapper">
  <div id="loveChart" style="width:100%;height:600px;"></div>
</section>
`);
Template.profile_love.onCreated(function() {
    this.subscribe('schools');
});
Template.profile_love.helpers({});
Template.profile_love.events({});
Template.profile_love.onRendered(function() {
    this.$("#loveChart").height($(window).height() - 60);
    const echarts = require('echarts');
    var loveChart = echarts.init(document.getElementById('loveChart'));
    option = {
        backgroundColor: '#404a59',
        title: {
            text: '森林天使全国留守儿童救助数据',
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
                return params.name + '<br>累计捐赠：' + params.value[2] + '元';
            }
        },
        legend: {
            orient: 'vertical',
            y: 'bottom',
            x: 'right',
            data: ['已捐助的金额'],
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
            name: '已捐助的金额',
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
            const invest = schools[0].invest;
            let max = 21;
            let step = 10;
            while (max > 20) {
                max = invest / step;
                step = step + 5;
                // console.log(step);
            }
            // console.log(max);
            let list = [];
            for (s of schools) {
                let geoCoord = s.coord.split(',');
                list.push({
                    name: s.name,
                    value: geoCoord.concat(s.invest),
                });
            }
            loveChart.setOption({
                visualMap: {
                    max: invest,
                },
                series: [{
                    name: '已捐助的金额',
                    data: list,
                    symbolSize: function(val) {
                        return val[2] / step;
                    },
                }]
            });
        }
    });
});
