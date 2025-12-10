function chkdata(cls) {
    var c = 1;
    var s = $(cls).map(function () { return this.id }).get();
    var y = $(cls).map(function () { return $(this).data('placeholder') }).get();
    var t = $(cls).map(function () { return this.tagName }).get();
    for (i = 0; i < s.length; i++) {
        if (t[i] == 'INPUT' || t[i] == 'TEXTAREA') {
            if (($('#' + s[i]).val() == '') && (!$('#' + s[i]).is(':disabled')) && (!$('#' + s[i]).hasClass('hidden'))) {
                showmobilenumber('Error!','Please Enter ' + y[i], s[i]);
                $('#' + s[i]).focus();
                c = 0;
                break;
            }
        }
        else if ((t[i] == 'SELECT') && (!$('#' + s[i]).is(':disabled')) && (!$('#' + s[i]).hasClass('hidden'))) {
            if ($('#' + s[i]).val() == 0) {
                showmobilenumber('Error!','Please select ' + y[i], s[i]);
                document.all(s[i]).focus();
                c = 0;
                break;
            }
        }
    }
    if (c != 0) {
        return true;
    }
    else {
        return false;
    }
}

function chk_vehicleno_and_mobileno(cls)
{
    var c = 1;
    var s = $(cls).map(function () { return this.id }).get();
    var y = $(cls).map(function () { return $(this).data('placeholder') }).get();
    for (i = 0; i < s.length; i++) {
        if(i == 0)
        {
            var u = $('#' + s[i]).val();
            if (u.length != 10) {
                showmobilenumber('Please type valid ' + y[i]);
                $('#' + s[i]).focus();
                c = 0;
                break;
            }
        }
        else {
            var u = $('#' + s[i]).val();
            if (u.length > 6) {
                var t = u.replace(/[^0-9]/g, "").length;
                var o = u.length - t;
                if (t < 2 || o < 2) {
                    showmobilenumber('Please type valid ' + y[i]);
                    $('#' + s[i]).focus();
                    c = 0;
                    break;
                }
            }
            else {
                alert('Please type valid ' + y[i]);
                $('#' + s[i]).focus();
                c = 0;
            }
        }
    }
    if (c != 0) {
        return true;
    }
    else {
        return false;
    }
}


function chk_vehicleno2(cls) {
    var c = 1;
    var s = $(cls).map(function () { return this.id }).get();
    var y = $(cls).map(function () { return $(this).data('placeholder') }).get();
    for (i = 0; i < s.length; i++) {
        if (i == 0) {
            var u = $('#' + s[i]).val();
            if (u.length == 9 || u.length == 10) {

            }
            else {
                alert('Please type valid ' + y[i]);
                $('#' + s[i]).focus();
                c = 0;
                break;
            }

        }
        else {
            var u = $('#' + s[i]).val();
            if (u.length > 6) {
                var t = u.replace(/[^0-9]/g, "").length;
                var o = u.length - t;
                if (t < 2 || o < 2) {
                    alert('Please type valid ' + y[i]);
                    $('#' + s[i]).focus();
                    c = 0;
                    break;
                }
            }
            else {
                alert('Please type valid ' + y[i]);
                $('#' + s[i]).focus();
                c = 0;
            }
        }
    }
    if (c != 0) {
        return true;
    }
    else {
        return false;
    }
}


function chk_vehicleno_and_mobileno1(cls) {
    var c = 1;
    var s = $(cls).map(function () { return this.id }).get();
    var y = $(cls).map(function () { return $(this).data('placeholder') }).get();
    for (i = 0; i < s.length; i++) {
        if (i == 0) {
            var u = $('#' + s[i]).val();
            if (u.length == 2) {
               
            }
            else {
                alert('Please type valid ' + y[i]);
                $('#' + s[i]).focus();
                c = 0;
                break;
            }
        }
        else {
            var u = $('#' + s[i]).val();
            if (u.length > 6) {
                var t = u.replace(/[^0-9]/g, "").length;
                var o = u.length - t;
                if (t < 2 || o < 2) {
                    alert('Please type valid ' + y[i]);
                    $('#' + s[i]).focus();
                    c = 0;
                    break;
                }
            }
            else {
                alert('Please type valid ' + y[i]);
                $('#' + s[i]).focus();
                c = 0;
            }
        }
    }
    if (c != 0) {
        return true;
    }
    else {
        return false;
    }
}

function chk_vehicleno_and_mobileno2(cls) {
    var c = 1;
    var s = $(cls).map(function () { return this.id }).get();
    var y = $(cls).map(function () { return $(this).data('placeholder') }).get();
    for (i = 0; i < s.length; i++) {
        if (i == 0) {
            var u = $('#' + s[i]).val();
            if (u.length >= 1) {

            }
            else {
                alert('Please type valid ' + y[i]);
                $('#' + s[i]).focus();
                c = 0;
                break;
            }
        }
        else {
            var u = $('#' + s[i]).val();
            if (u.length > 6) {
                var t = u.replace(/[^0-9]/g, "").length;
                var o = u.length - t;
                if (t < 2 || o < 2) {
                    alert('Please type valid ' + y[i]);
                    $('#' + s[i]).focus();
                    c = 0;
                    break;
                }
            }
            else {
                alert('Please type valid ' + y[i]);
                $('#' + s[i]).focus();
                c = 0;
            }
        }
    }
    if (c != 0) {
        return true;
    }
    else {
        return false;
    }
}

function chk_vehicleno_and_mobileno3(cls) {
    var c = 1;
    var s = $(cls).map(function () { return this.id }).get();
    var y = $(cls).map(function () { return $(this).data('placeholder') }).get();
    for (i = 0; i < s.length; i++) {
        if (i == 0) {
            var u = $('#' + s[i]).val();
            if (u.length == 4) {

            }
            else {
                alert('Please type valid ' + y[i]);
                $('#' + s[i]).focus();
                c = 0;
                break;
            }
        }
        else {
            var u = $('#' + s[i]).val();
            if (u.length > 6) {
                var t = u.replace(/[^0-9]/g, "").length;
                var o = u.length - t;
                if (t < 2 || o < 2) {
                    alert('Please type valid ' + y[i]);
                    $('#' + s[i]).focus();
                    c = 0;
                    break;
                }
            }
            else {
                alert('Please type valid ' + y[i]);
                $('#' + s[i]).focus();
                c = 0;
            }
        }
    }
    if (c != 0) {
        return true;
    }
    else {
        return false;
    }
}

function chk_mobileno(cls) {
    var c = 1;
    var s = $(cls).map(function () { return this.id }).get();
    var y = $(cls).map(function () { return $(this).data('placeholder') }).get();
    var idsToFocus = [];
    for (var i = 0; i < s.length; i++) {
        var u = $('#' + s[i]).val();
        if (u.length != 10 && u != "") {
            showmobilenumber('Error!','Please type valid ' + y[i], [s[i]]);
            c = 0;
            break;
        }
        idsToFocus.push(s[i]);
    }
    if (c != 0) {
        return true;
    }
    else {
        return false;
    }
}


function chk_vehicleno(cls)
{
    var c = 1;
    var s = $(cls).map(function () { return this.id }).get();
    var y = $(cls).map(function () { return $(this).data('placeholder') }).get();
    for (i = 0; i < s.length; i++) {
        var u = $('#' + s[i]).val();
        if (u.length > 6) {
            var t = u.replace(/[^0-9]/g, "").length;
            var o = u.length - t;
            if (t < 2 || o < 2) {
                alert('Please type valid ' + y[i]);
                $('#' + s[i]).focus();
                c = 0;
                break;
            }
        }
        else {
            alert('Please type valid ' + y[i]);
            $('#' + s[i]).focus();
            c = 0;
        }
    }
    if (c != 0) {
        return true;
    }
    else {
        return false;
    }
}


function chk_eng_chasis(cls) {
    var c = 1;
    var s = $(cls).map(function () { return this.id }).get();
    var y = $(cls).map(function () { return $(this).data('placeholder') }).get();
    for (i = 0; i < s.length; i++) {
        var u = $('#' + s[i]).val();
        if (u.length >= 5) {
            var t = u.replace(/[^0-9]/g, "").length;
            var o = u.length - t;
            if (t < 2 || o < 2) {
                showmobilenumber('Please type valid ' + y[i], s[i]);
                $('#' + s[i]).focus();
                c = 0;
                break;
            }
        }
        else {
            alert('Please type valid ' + y[i]);
            $('#' + s[i]).focus();
            c = 0;
        }
    }
    if (c != 0) {
        return true;
    }
    else {
        return false;
    }
}

function chk_eng_chasis1(cls) {
    var c = 1;
    var s = $(cls).map(function () { return this.id }).get();
    var y = $(cls).map(function () { return $(this).data('placeholder') }).get();
    for (i = 0; i < s.length; i++) {
        var u = $('#' + s[i]).val();
        if (u.length >= 4) {
            var t = u.replace(/[^0-9]/g, "").length;
            var o = u.length - t;
            if (t < 2 || o < 2) {
                showmobilenumber('Please type valid ' + y[i], s[i]);
                $('#' + s[i]).focus();
                c = 0;
                break;
            }
        }
        else {
            showmobilenumber('Please type valid ' + y[i], s[i]);
            $('#' + s[i]).focus();
            c = 0;
        }
    }
    if (c != 0) {
        return true;
    }
    else {
        return false;
    }
}


function chk_pan(txtpanno) {    
    var pann = $('#' + txtpanno).val().toUpperCase();
    if (pann != "") {
        var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
        if (regex.test(pann)) {
            return true
        }
        else {
            showmobilenumber('Error!','Please type valid Pan card', txtpanno);
            /* $('#' + txtpanno).focus();*/
            return false;
        }
    }
    else {
        return true;
    }

}
function chk_aadhar(txtaadhar) {
    var aadhar = $('#' + txtaadhar).val();
    if (aadhar != "") {
        if (aadhar.length < 12) {
            showmobilenumber('Please type valid Aadhar card', txtaadhar);
            $('#' + txtaadhar).focus();
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return true;
    }
}

function chk_pincode(txtpinco) {
    var pinco = $('#' + txtpinco).val();
    var placeholder = $('#' + txtpinco).data('placeholder');
    if (pinco.length < 6) {
        // Display error message in a popup
        showmobilenumber('Please type a valid ' + placeholder, txtpinco);
        return false;
    } else {
        return true;
    }
}

function chk_chasis(txtchasis) {
    var chasis = $('#' + txtchasis).val();

    if (chasis.length < 6) {
        showmobilenumber('Please Enter Minimum 6 digits', txtchasis);
        $('#' + txtchasis).focus();
        return false;
    }
    else {
        return true;
    }
}

function chk_engine(txtengine) {
    var engine = $('#' + txtengine).val();

    if (engine.length < 6) {
        showmobilenumber('Please Enter Minimum 6 digits', txtengine);
        $('#' + txtengine).focus();
        return false;
    }
    else {
        return true;
    }
}

function chk_pinno(txtpino) {
    var pino = $('#' + txtpino).val();
    if (pino.length < 4) {
        alert('Please type valid pinno');
        $('#' + txtpino).focus();
        return false;
    }
    else {
        return true;
    }
}

function chk_validemail(txtemail)
{
    var email = $('#' + txtemail).val();
    if (email != "") {
        var pos1 = email.indexOf('@');
        var pos2 = allIndexOf(email, '.');
        if ((email.search('@') > 0) && (email.search("'") < 0) && ((pos1 + 1) < pos2[pos2.length - 1]) && ((email.length - 1) != pos2[pos2.length - 1])) {
            return true;
        }
        else {
            showmobilenumber('Error!','Please type valid email-id', txtemail);
            $('#' + txtemail).focus();
            return false;
        }
    }
    else {
        return true;
    }
}

function allIndexOf(str, toSearch) {
    var indices = [];
    for (var pos = str.indexOf(toSearch) ; pos !== -1; pos = str.indexOf(toSearch, pos + 1)) {
        indices.push(pos);
    }
    return indices;
}

function chk_uploadedfile(txtid,stat)
{
    var nme = document.getElementById(txtid);
    if (nme.value.length < 4) {
        alert('Please select file!');
        nme.focus();
        return false;
    }
    else {
        var files = $("#" + txtid).get(0).files;
        var extension = $("#" + txtid).val().split('.').pop().toUpperCase();
        if (stat == 1) {
            if (extension != "JPG" && extension != "JPEG" && extension != "PNG") {
                alert('Please select Image File');
                return false;
            }
        }
        else if (stat == 2) {
            if (extension != "PDF") {
                alert('Please select Pdf File');
                return false;
            }
        }
        else if (stat == 3) {
            if (extension != "XLS" && extension != "XLSX") {
                alert('Please select Excel File');
                return false;
            }
        }
        return true;
    }
}

function clearall(className) {
    var id = $(className).map(function () { return this.id }).get();
    for (var i = 0; i < id.length; i++) {
        if ($('#' + id[i] + '').get(0).nodeName == "INPUT" || $('#' + id[i] + '').get(0).nodeName == "TEXTAREA") {
            if ($('#' + id[i] + '').is(':checkbox'))
                $('#' + id[i] + '').prop('checked', false);
            else if (!$('#' + id[i] + '').is(':radio'))
                $('#' + id[i] + '').val('');
        }
        else {
            $('#' + id[i] + '').val('0');
        }
    }
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode < 48 || charCode > 57)
        return false;

    return true;
}
// function restrictAlphabets(e) {
//     if ((event.keyCode > 64 && event.keyCode < 91) || (event.keyCode > 96 && event.keyCode < 123) || event.keyCode == 8)
//         return true;
//     else {
//         alert("Please enter only char");
//         return false;
//     }
// }

function fun_AllowOnlyAmountAndDot(txt) {
    if (event.keyCode > 47 && event.keyCode < 58 || event.keyCode == 46) {
        var txtbx = document.getElementById(txt);
        var amount = document.getElementById(txt).value;
        var present = 0;
        var count = 0;

        if (amount.indexOf(".", present) || amount.indexOf(".", present + 1));
        {
            // alert('0');
        }

        /*if(amount.length==2)
        {
          if(event.keyCode != 46)
          return false;
        }*/
        do {
            present = amount.indexOf(".", present);
            if (present != -1) {
                count++;
                present++;
            }
        }
        while (present != -1);
        if (present == -1 && amount.length == 0 && event.keyCode == 46) {
            event.keyCode = 0;
            //alert("Wrong position of decimal point not  allowed !!");
            return false;
        }

        if (count >= 1 && event.keyCode == 46) {

            event.keyCode = 0;
            //alert("Only one decimal point is allowed !!");
            return false;
        }
        if (count == 1) {
            var lastdigits = amount.substring(amount.indexOf(".") + 1, amount.length);
            if (lastdigits.length >= 2) {
                //alert("Two decimal places only allowed");
                event.keyCode = 0;
                return false;
            }
        }
        return true;
    }
    else {
        event.keyCode = 0;
        //alert("Only Numbers with dot allowed !!");
        return false;
    }

}

function convertNumberToWords(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + parseInt(n_array[j]);
                    n_array[i] = 0;
                }
            }
        }
        value = "";
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Thousand ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "Hundred and ";
            } else if (i == 6 && value != 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.split("  ").join(" ");
    }
    return words_string;
}

function checkQuote() {
    if (event.keyCode == 39 || event.keyCode == 34) {
        event.keyCode = 0;
        return false;
    }
}

var clicked = false;
function CheckBrowser() {
    if (clicked == false) {
        //Browser closed
    }
    else {
        //redirected 
        clicked = false;
    }
}

function bodyUnload() {
    if (clicked == false)//browser is closed
    {
        var request = GetRequest();
        request.open("POST", "../logoutt.aspx", false);
        request.send();
        alert('This is close');
    }
}
function GetRequest() {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlhttp;
}

function chkgrideorn() {
    if ($('.Grid').length != 0)
        return true;
    else {
        alert('No Rows');
        return false;
    }
}

function changeddl(index) {
    var ids = $('.chkid').map(function () { return this.id }).get();
    var lbls = $('.chklbl').map(function () { return this.id }).get();
    var grds = $('.Grid').map(function () { return this.id }).get();
    for (i = 0; i < ids.length; i++) {
        if (i != index)
            $('#' + ids[i]).val(0);
    }
    for (i = 0; i < grds.length; i++)
        $('#' + grds[i]).parent().html('');
    for (i = 0; i < lbls.length; i++)
        $('#' + lbls[i]).html('0');
}

function settooltip() {
    var tableidd = $('.Grid').map(function () { return this.id }).get();
    for (i = 0; i < tableidd.length; i++) {
        var childheadlen = $("#" + tableidd[i]).find('tr')[0].cells.length;
        var rowlen = $("#" + tableidd[i]).find('tbody')[0].children.length;
        for (j = 0; j < rowlen; j++) {
            for (z = 0; z < childheadlen; z++) {
                if (!$("#" + tableidd[i]).children(':nth-child(1)').children(':nth-child(' + (j + 1) + ')').children(':nth-child(' + (z + 1) + ')').children(':nth-child(1)').hasClass('search_textbox')) {
                    if ($("#" + tableidd[i]).children(':nth-child(1)').children(':nth-child(' + (j + 1) + ')').children(':nth-child(' + (z + 1) + ')').children().length != 0) {
                        if ($("#" + tableidd[i]).children(':nth-child(1)').children(':nth-child(' + (j + 1) + ')').children(':nth-child(' + (z + 1) + ')').children()[0].tagName != 'A') {
                            var data = $("#" + tableidd[i]).children(':nth-child(1)').children(':nth-child(' + (j + 1) + ')').children(':nth-child(' + (z + 1) + ')').text();
                            if(data != '')
                                $("#" + tableidd[i]).children(':nth-child(1)').children(':nth-child(' + (j + 1) + ')').children(':nth-child(' + (z + 1) + ')').attr('title', data);
                        }
                    }
                    else {
                        var data = $("#" + tableidd[i]).children(':nth-child(1)').children(':nth-child(' + (j + 1) + ')').children(':nth-child(' + (z + 1) + ')').text();
                        if (data != '')
                            $("#" + tableidd[i]).children(':nth-child(1)').children(':nth-child(' + (j + 1) + ')').children(':nth-child(' + (z + 1) + ')').attr('title', data);
                    }
                }
            }
        }
    }
}

function hidegrd_and_lbl() {
    var lbls = $('.chklbl').map(function () { return this.id }).get();
    var grds = $('.Grid').map(function () { return this.id }).get();
    for (i = 0; i < grds.length; i++)
        $('#' + grds[i]).parent().html('');
    for (i = 0; i < lbls.length; i++)
        $('#' + lbls[i]).html('0');
}

function grdsrch() {
    var gid = $('.Grid').attr('id');
    if ($('#' + gid).length != 0) {
        $('.search_textbox').each(function (i) {
            $(this).quicksearch("#" + gid + " tr:not(:has(th))", {
                'testQuery': function (query, txt, row) {
                    return $(row).children(":eq(" + i + ")").text().toLowerCase().indexOf(query[0].toLowerCase()) != -1;
                }
            });
        });
    }
}

function suclogout(y) { }
function failogout(y) { }

function datatablee(id, name) {
    var table = $('#' + id + '').DataTable({
        responsive: false,
        "bInfo": false,
        dom: "<'row col-md-12 col-lg-12 col-xs-12 col-xs-12'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>tp",
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        buttons: [
            { extend: 'copy', className: 'btn-sm' },
            { extend: 'csv', title: name, className: 'btn-sm' },
            { extend: 'pdf', title: name, className: 'btn-sm' },
            { extend: 'print', className: 'btn-sm' }]
    });
    return table.rows().data().length;
}
function validation(cls) {
    var c = 1;
    var s = $(cls).map(function () { return this.id; }).get();
    var y = $(cls).map(function () { return $(this).data('placeholder'); }).get();
    var t = $(cls).map(function () { return this.tagName; }).get();
    var errorMessages = [];
    var errorInputId;

    for (var i = 0; i < s.length; i++) {
        var element = $('#' + s[i]);

        // Skip validation if the field is disabled
        if (element.is(':disabled')) {
            continue;
        }

        if (element.is(':visible')) {
            if ((t[i] == 'INPUT' || t[i] == 'TEXTAREA') && element.val() === '') {
                errorMessages.push('Please Enter ' + y[i]);
                errorInputId = s[i]; // Store the ID of the input with error
                c = 0;
                break;
            } else if (t[i] == 'SELECT' && element.val() == '0') {
                errorMessages.push('Please Select ' + y[i]);
                errorInputId = s[i]; // Store the ID of the input with error
                c = 0;
                break;
            }
        }
    }

    if (c != 0) {
        return true;
    } else {
        // Show error messages in the popup panel
        $('#errorText').html(errorMessages.join('<br>'));
        $('#popup').show();

        $(document).on('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                $('#okButton').trigger('click');
            }
        });

        // Handle OK button click to close the popup
        $('#okButton').one('click', function () {
            $('#popup').hide();
            if (errorInputId) {
                $('#' + errorInputId).focus(); // Set focus on the input with error
            }
        });

        return false;
    }
}

//function validation(cls) {
//    var c = 1;
//    var s = $(cls).map(function () { return this.id; }).get();
//    var y = $(cls).map(function () { return $(this).data('placeholder'); }).get();
//    var t = $(cls).map(function () { return this.tagName; }).get();
//    var errorMessages = [];
//    var errorInputId;

//    for (var i = 0; i < s.length; i++) {

//        var element = $('#' + s[i]);

//        if ($('#' + s[i]).is(':visible')) {
//            if ((t[i] == 'INPUT' || t[i] == 'TEXTAREA') && $('#' + s[i]).val() === '') {
//                errorMessages.push('Please Enter ' + y[i]);
//                errorInputId = s[i]; // Store the ID of the input with error
//                c = 0;
//                break;
//            } else if (t[i] == 'SELECT' && $('#' + s[i]).val() == '0') {
//                errorMessages.push('Please Select ' + y[i]);
//                errorInputId = s[i]; // Store the ID of the input with error
//                c = 0;
//                break;
//            }
//        }
//    }

//    if (c != 0) {
//        return true;
//    } else {
//        // Show error messages in the popup panel
//        $('#errorText').html(errorMessages.join('<br>'));
//        $('#popup').show();

//        $(document).on('keydown', function (e) {
//            if (e.key === 'Enter' || e.key === ' ') {
//                $('#okButton').trigger('click');
//            }
//        });

//        // Handle OK button click to close the popup and enable form inputs
//        $('#okButton').one('click', function () {
//            $('#popup').hide();
//            /* $('input, textarea, select').prop('disabled', false); // Enable form inputs */
//            if (errorInputId) {
//                $('#' + errorInputId).focus(); // Set focus on the input with error
//            }
//        });

//        return false;
//    }
//}


function restrictNonAlpha(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    // Allow backspace, tab, enter, escape, delete, and space keys
    if (charCode === 8 || charCode === 9 || charCode === 13 || charCode === 27 || charCode === 46 || charCode === 32) {
        return true;
    }

    // Allow alphabetic characters (a-z, A-Z)
    if ((charCode >= 65 && charCode <= 90) || // upper alpha (A-Z)
        (charCode >= 97 && charCode <= 122)) { // lower alpha (a-z)
        return true;
    }

    // If the character code is not allowed, prevent the key press
    return false;
}





   function showmobilenumber(header, message, ids) {
   const popupHeader = $('#modalHeader');
   const modalClose = document.getElementById("modalClose");
  $('#modalMessage').text(message);
  $('#modalHeader').text(header);

  $('#hs-modal').fadeIn(function () {
    $('body').css("overflow", "hidden");

    if (header.toLowerCase().includes('success!')) {
         popupHeader.removeClass().addClass("text-xl text-green-500 font-bold border-b border-gray-200 text-gray-800");
         modalClose.className = "py-2 px-4 text-sm font-medium rounded bg-green-600 text-white hover:bg-green-700"
         $("#modalClose").text("Ok");
    } else if (header.toLowerCase().includes('error!')) {
         popupHeader.removeClass().addClass("text-xl text-red-500 font-bold border-b border-gray-200 text-gray-800");
         modalClose.className = "py-2 px-4 text-sm font-medium rounded bg-red-600 text-white hover:bg-red-700"
        $("#modalClose").text("Cancel");
    }
  });

  $('#modalClose').one('click', function () {
    $('body').css("overflow", "auto");
    $('#hs-modal').fadeOut();
    if (ids) {
      $('#' + ids).focus();
    }
  });
}

function popupSuccesspanel(header, message,) {

    var popupHeader = $('#popup_header');
    $('#popup #popup_header').text(header);
    $('#popup #errorText').text(message);
    // Show the popup with a callback function
    $('#popup').fadeIn(function () {
        // Set the color of the header
        if (header == 'Success!') {
            popupHeader.css('color', 'green');
        } else {
            popupHeader.css('color', ''); // Reset to default color
        }
    });
    // Handle OK button click to close the popup
    $('#okButton').one('click', function () {
        $('#popup').hide();
        popupHeader.css('color', 'Red');
        $('#popup #popup_header').text('Error!');
    });
}


function validateImage(cls) {
    var ids = $(cls).map(function () { return this.id; }).get(); // Array of IDs of elements with class `cls`
    var idsToFocus = [];

    for (var i = 0; i < ids.length; i++) {
        var element = $('#' + ids[i]);
        var value = element.val(); // Get the value of the element as a string
        var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
        if (value != "") {
            if (element.is(':visible') && !allowedExtensions.exec(value)) {
                showmobilenumber('Please select valid image', ids[i]);
                return false; // Return false if validation fails for any visible element
            }

            idsToFocus.push(ids[i]); // Store IDs of valid elements to focus later if needed
        }
        else {
            return true;
        }
    }

    return true; // Return true if all validations pass 
}



function Aadharvalidationimg(id) {
    var element = $('#' + id); // Get the element by ID
    var value = element.val(); // Get the value of the element as a string
    var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

    // Check if the element is visible and not empty
    if (element.is(':visible') && value) {
        // If the file extension is not valid
        if (!allowedExtensions.exec(value)) {
            showmobilenumber('Please select a valid image', id);
            element.focus(); // Set focus to the element
            return false; // Return false if validation fails
        }
    }

    return true; // Return true if the input is empty or validation passes
}

function monthly_income(txtmon_income1_prospects_g) {
    // Get the value of the input element using its ID and convert it to a number
    var txtmon = parseFloat($('#' + txtmon_income1_prospects_g).val());

    // Check if the input is a valid number and less than 15000
    if (isNaN(txtmon) || txtmon < 15000) {
        // Show an error message and focus back on the input field
        showmobilenumber('Less than 15000 not eligible', txtmon_income1_prospects_g);
        /*  $('#' + txtmon_income1_prospects_g).focus();*/
        return false;  // Prevent further action
    } else {
        return true;  // Allow further action if the value is 15000 or above
    }
}
