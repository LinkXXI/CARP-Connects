/**
 * Created by Sergio on 11/19/2015.
 */
Template.eventStatsReport.helpers({
    'eventCount': function () {
        return events.find().count();
    },
    'taskCount': function () {
        return tasks.find().count();
    },
    'tasksPerEvent': function () {
        return tasksPerEvent;
    },
    'timestamp': function () {
        return new Date();
    }
});

var tasksPerEvent;

Template.eventStatsReport.eventStatsReportChart = function () {
    var seriesData = [];
    var eventCount = events.find().count();
    var taskCount = tasks.find().count();
    tasksPerEvent = parseInt(taskCount) / parseInt(eventCount);
    // round to 2 decimal places
    tasksPerEvent = Math.round(tasksPerEvent * 100) / 100;
    seriesData.push(['Events', eventCount]);
    seriesData.push(['Tasks', taskCount]);
    seriesData.push(['Tasks per Event', tasksPerEvent]);
    //console.log(seriesData);
    return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: "Event Statistics Report Chart"
        },
        xAxis: {
            categories: ['Events', 'Tasks']
        },
        tooltip: {
            pointFormat: '<b>{point.total}</b>'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.stackTotal}',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            type: 'column',
            name: 'Events vs. Tasks',
            data: seriesData
        }]
    };
};