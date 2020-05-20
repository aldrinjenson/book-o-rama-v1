var dt = new Date();
var today = new Date();
var date =
  today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
console.log( date)

// To set two dates to two variables
var date1 = new Date('06/30/2019');
var date2 = new Date('07/30/2019');
var date3 = new Date(date)

var date4 = new Date('19/5/2020');
// console.log(date1 + '\n' + date2 + '\n' + date3)
console.log(date4)

// To calculate the time difference of two dates
var Difference_In_Time = date2.getTime() - date1.getTime();

// To calculate the no. of days between two dates
var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

//To display the final no. of days (result)
console.log(
  'Total number of days between dates  ' +
    date1 +
    ' and ' +
    date2 +
    ' is:  ' +
    Difference_In_Days,
);
