/**
 * Created by Sergio on 9/23/2015.
 */
Template.taskReport.helpers({
    notStartedTaskCount: function () {
        return tasks.find({status: "Not Started"}).count();
    },
    inProgressTaskCount: function () {
        return tasks.find({status: "In Progress"}).count();
    },
    completeTaskCount: function () {
        return tasks.find({status: "Complete"}).count();
    },
    allTaskCount: function () {
        // very hacky but it works
        notStartedTaskCount = Template.taskReport.__helpers.get('notStartedTaskCount').call();
        inProgressTaskCount = Template.taskReport.__helpers.get('inProgressTaskCount').call();
        completeTaskCount = Template.taskReport.__helpers.get('completeTaskCount').call();
        return notStartedTaskCount + inProgressTaskCount + completeTaskCount;
    },
    /*    allTaskCount: function () {
     return events.find(
     {
     tasks: {
     $elemMatch: {
     status: {$in: ["Not Started", "In Progress", "Complete"]}
     }
     }

     }
     ).count();
     },*/
    timestamp: function () {
        return new Date();
    }
});

Template.taskReport.taskReportChart = function () {
    var seriesData = [];
    var notStartedTaskCount = tasks.find({status: "Not Started"}).count();
    var inProgressTaskCount = tasks.find({status: "In Progress"}).count();
    var completeTaskCount = tasks.find({status: "Complete"}).count();
    seriesData.push(['Not Started', notStartedTaskCount]);
    seriesData.push(['In Progress', inProgressTaskCount]);
    seriesData.push(['Complete', completeTaskCount]);
    //console.log(seriesData);
    return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: "Task Breakdown Report Chart"
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Tasks',
            data: seriesData
        }]
    };
};