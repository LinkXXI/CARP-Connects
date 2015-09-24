/**
 * Created by Sergio on 9/23/2015.
 */
Template.inviteReport.helpers({
    inviteCount: function () {
        return invitations.find().count();
    },
    inviteUsedCount: function () {
        return invitations.find({used: true}).count();
    },
    inviteNotUsedCount: function () {
        return invitations.find({used: {$ne: true}}).count();
    },
    timestamp: function () {
        return new Date();
    }
});

Template.registerHelper('formatDate', function(date) {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
});

Template.inviteReport.inviteReportChart = function () {
    var seriesData = [];
    var inviteUsedCount = invitations.find({used: true}).count();
    var inviteNotUsedCount = invitations.find({used: {$ne: true}}).count();
    seriesData.push(['Used', inviteUsedCount]);
    seriesData.push(['Unused', inviteNotUsedCount]);
    //console.log(seriesData);
    return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: "Invitation Report Chart"
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
            name: 'Invites Used',
            data: seriesData
        }]
    };
};