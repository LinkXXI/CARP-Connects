/**
 * Created by Sergio on 10/27/2015.
 */
formatDateShort = function(date){
    return moment(date).format('MMM Do YYYY, h:mm a');
};

formatDateMDYT = function(date){
    return moment(date).format('D/M/YYYY h:mm a');
};

formatCurrency = function(amount){
    return "$" + parseFloat(amount).toFixed(2);
};