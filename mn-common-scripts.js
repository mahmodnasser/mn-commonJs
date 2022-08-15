
var serializeObj = function (obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

const removeAllOptions = (slcId, withDefault) => {
    $.each($(`#${slcId}`).find('option'), (idx, item) => { $(item).remove(); });
    if (withDefault)
        $(`#${slcId}`).append(new Option(_selectText, '', false, false));
};

function ConvertNumbersToEnglish(string) {
    return string.replace(/[\u0660-\u0669]/g, function (c) {
        return c.charCodeAt(0) - 0x0660;
    }).replace(/[\u06f0-\u06f9]/g, function (c) {
        return c.charCodeAt(0) - 0x06f0;
    });
};
function isHasArabic(text) {
    var pattern = /[\u0600-\u06FF\u0750-\u077F]/;
    result = pattern.test(text);
    return result;
};

function checkTimeIsValid(value) {
    var regexp = /([01][0-9]|[02][0-3]):[0-5][0-9]/;
    return (value.search(regexp) >= 0) ? true : false;
}

// get current date [object]
function GetCurrentDate() {
    var dtNow = new Date();
    var time = dtNow.toTimeString().slice(0, 5);
    var day = dtNow.getDate() > 9 ? dtNow.getDate() : '0' + dtNow.getDate()
        , month = dtNow.getMonth() + 1 > 9 ? dtNow.getMonth() : '0' + (dtNow.getMonth() + 1)
        , year = dtNow.getFullYear()
        , hours = dtNow.getHours()
        , minutes = dtNow.getMinutes()
        , seconds = dtNow.getSeconds()
        , date = `${day}/${month}/${year}`
        , dateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    var dtNowZero = dtNow;
    dtNowZero.setHours(0, 0, 0, 0);
    return {
        Day: day,
        Month: month,
        Year: year,
        Date: date,
        DateTime: dateTime,
        Time: time,
        Date: dtNow,
        DateWithoutTime: dtNowZero,
    };
};
// get date object from value
function GetElementDate(ele) {
    var arrDate = null;
    try {
        arrDate = $(ele).val().split('/');
    } catch (e) {
        try {
            arrDate = ele.split('/');
        } catch (e) {
            return null;
        }
    }
    return new Date(arrDate[2], arrDate[1] - 1, arrDate[0], 0, 0, 0, 0);
};


// Generate a new Guid
function GenerateNewGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};


/// validation URL entry
/// value (required): send a value and retun value is bool, [true] means input value is valid
function validateUrl(value) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
};

/* Validate Email
* <Return value>
*   true: email address is in a recognized format.
*   false: email address is not in a recognized format.
* </Return value>
*/
function validateEmail(email) {
    var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    return $.trim(email).match(pattern) ? true : false;
}


function readFile(ele, callbackFunc) {
    if (ele.files && ele.files[0]) {
        var FR = new FileReader();
        FR.addEventListener("load", function (e) {
            if (callbackFunc) {
                callbackFunc(e.target.result);
            }
        });
        FR.readAsDataURL(ele.files[0]);
    }
};

// Scroll to target element. Ex: scrollToTarget('#YourElement') | scrollToTarget('.YourElement')
function scrollToTarget(ele) {
    document.querySelector(ele).scrollIntoView(false);
};


function getQueryStringFormURL(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}


// xss attaker
function sanitizeHTML(text) {
    var element = document.createElement('div');
    element.innerText = text;
    return element.innerHTML;
}

// get common values from two arrays
function getCommonValuesFromArray(arr1, arr2) {
    return arr1.filter(function (n) { return arr2.indexOf(n) !== -1; });
}

// remove duplicate values
function removeDuplicated(arr) {
    var temp = arr.filter(function (value, index, array) {
        return array.indexOf(value) === index;
    });

    return temp;
}


//======================================================
//== Events 
//======================================================

function validationLength(ele, len) {
	
    len === undefined || len === null ? len = $(ele).attr('maxlength') : len;
    if ($(ele).val().length > len) {
        $(ele).val($(ele).val().slice(0, len));
    }
};

function validationMinValue(ele) {
    var actualValue = $(ele).val() ? parseInt($(ele).val()) : 0,
        minValue = $(ele).prop('min') ? parseInt($(ele).prop('min')) : 0;
    actualValue < minValue ? $(ele).val('0') : "";
}


// m.nasser => 11-06-2019 max input length validation
$(document).on('input', 'input[maxlength]', function () {
    validationLength(this);
});

// validation [min] attribute when input is nuumber
$(document).on('blur', 'input[type="number"][min]', function () {
    validationMinValue(this);
});

// allow integer numbers only(real numbers)
$(document).on('keypress paste', '.allowNumbersOnly', function (event) {
    if (event.type == 'paste') {
        if (event.originalEvent.clipboardData.getData('Text').match(/[^\d]/)) {
            event.preventDefault();
        }
    } else {
        if (event.which < 48 || event.which > 58) {
            return false;
        }
    }
});

