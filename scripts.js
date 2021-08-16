function reverseString(str){
    return str.split('').reverse().join('');
}

function isPalindrome(str){
    var reverse = reverseString(str);
    return (str === reverse);
}

function dateToStr(date){
    var dateStr = {day: '', month: '', year: ''};

    if(date.day < 10){
        dateStr.day = '0' + date.day;
    }else{
        dateStr.day = date.day.toString();
    }
    
    if(date.month < 10){
        dateStr.month = '0' + date.month;
    }else{
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

function getAllDateFormats(date){
    var dateStr = dateToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllFormats(date){
    var listOfPalindromes = getAllDateFormats(date);

    var bool = false;
    for(var value of listOfPalindromes){
        if(isPalindrome(value)){
            bool = true;
            break;
        }
    }
    return bool;
}

function isLeapYear(year){
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }
    return false;
}

function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month === 2){
        //checking for FEB
        if(isLeapYear(year)){
            //checking for leap year
            if(day > 29){
                day = 1;
                month++;    
            }
        }else{
            if(day > 28){
                day = 1;
                month++;
            }
        }
    }else{
        //checking for other months
        if(day > daysInMonth[month - 1]){
            day = 1;
            month++;
        }
    }

    if(month > 12){
        //checking end of year
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    };

}

function getNextPalindrome(date){
    var count = 0;
    var nextDate = getNextDate(date);

    while(1){
        count++;
        var isPalin = checkPalindromeForAllFormats(nextDate);
        if(isPalin){
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [count, nextDate];
}

var inputDate = document.querySelector("#date_field");
var checkButton = document.querySelector("#submit_btn");
var result = document.querySelector(".result");

function clickHandler(){
    var bdayStr = inputDate.value;

    if(bdayStr !== ''){
        var listOfDate = bdayStr.split('-');
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };

        var flag = checkPalindromeForAllFormats(date);

        if(flag){
            result.innerHTML = "<h3>Yeah ! Your Birthday is Palindrome 🥳</h3>";
        }else{
            var [count, nextDate] = getNextPalindrome(date);
            result.innerHTML = `<h3>The next Palindrome date is <span>${nextDate.day}-${nextDate.month}-${nextDate.year}</span>, 
            You missed it by <span>${count}</span> days ! 😮</h3>`;
        }
    }else{
        result.innerHTML = "<h3>Please Select The Date ☝</h3>";
    }
}

checkButton.addEventListener("click", clickHandler);