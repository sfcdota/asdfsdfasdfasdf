$("#u-person-form-selection").hide();
$("#checkbox").hide();
$("#errortelephonenumberinput").hide();
$("#errortininput").hide();
$("#errorsuminput").hide();
$("#errornameinput").hide();
$("#errorsurnameinput").hide();
$("#errorpersonselect").hide();
$("#errorpersonselect").text("Выберите тип плательщика");
$("#tin").prop('maxlength', "12");
$("#telephone").prop('maxlength', "12");
var temptinnumber;
var calculation = function()
{
    if($("#sum").val())
    {
        if(!/^(\d*[.]?\d*)?$/.test($("#sum").val()))
        {
            $("#errorsuminput").height("60px");
            $("#errorsuminput").text("В поле суммы нужно ввести число. Символ точки - разделитель дробной и целой части");
            $("#calculation").val("");
            $("#errorsuminput").show();
        }
        else
        {
            $("#errorsuminput").hide();
            $("#sum").val(parseFloat($("#sum").val()).toFixed(2));
            $("#errorsuminput").height("20px");
            if($("#tax").val() == "НДС: 17%")
                $("#calculation").val("Итог: " + ($("#sum").val()*1.17).toFixed(2));
            else if($("#tax").val() == "НДС: 13%")
                $("#calculation").val("Итог: " + ($("#sum").val()*1.13).toFixed(2));
            else
            {
                $("#errorpersonselect").show();
            }
        }
    }
    else
    {
        $("#errorpersonselect").hide();
    }
}






$("#person").change(function ()
{
    if($("select#person").val() == "")
    {
        $("#tax").val("НДС:");
        $("u-person-form-selection").hide();
        $("#errortininput").hide();
        $("#checkbox").hide();
        $("#u-person-form-selection").prop('required', false);
        $("#tin").prop('maxlength', "12");
        if($("#sum").val())
            {
                $("#errorpersonselect").show();
                $("#calculation").val("");
            }
    }
    else if($("select#person").val() == "Физическое лицо")
    {
        $("#tax").val("НДС: 13%");
        $("#tin").prop('maxlength', "12");
        $("#u-person-form-selection").hide();
        $("#checkbox").hide();
        $("#u-person-form-selection").prop('required', false);
        $("#errorpersonselect").hide();
        $("#errortininput").hide();
        calculation();
        if($("#tin").val().length != 12 && $("#tin").val())
        {
            $("#errortininput").text("Некорректный ввод. ИНН физических лиц состоит из 12 цифр");
            $("#errortininput").height("40px");
            $("#errortininput").show();
        }
    }
    else if($("select#person").val() == "Юридическое лицо")
    {
        $("#tax").val("НДС: 17%");
        $("#tin").prop('maxlength', "10");
        $("#u-person-form-selection").prop('required', true);
        $("#errorpersonselect").hide();
        $("#checkbox").show();
        calculation();
        if($("#tin").val().length != 10 && $("#tin").val())
        {
            $("#errortininput").text("Некорректный ввод. ИНН юридических лиц состоит из 10 цифр");
            $("#errortininput").height("40px");
            $("#errortininput").show();
        }
        $("#u-person-form-selection").show();
    }
})


$("#simple-tax-checkbox").change(function ()
{
    if($("#simple-tax-checkbox").is(':checked'))
    {
        temptinnumber = $("#tin").val();
        $("#tin").val("");
        $("#tin").prop('required', false);
        $("#tin").prop('disabled', true);
        $("#errortininput").hide();
    }
    if(!$("#simple-tax-checkbox").is(':checked'))
    {
        $("#tin").val(temptinnumber);
        $("#tin").prop('required', true);
        $("#tin").prop('disabled', false);
        if($("#tin").val().length != 10 && temptinnumber)
        {
            $("#errortininput").text("Некорректный ввод. ИНН юридических лиц состоит из 10 цифр");
            $("#errortininput").height("40px");
            $("#errortininput").show();
        }
    }
})


$("#inputname").change(function(){
    if(!/^([А-Я][а-я]*)?$/.test($("#inputname").val()))
    {
        $("#errornameinput").show();
        $("#errornameinput").text("Введите имя корректно");
    }
    else
    {
        $("#errornameinput").hide();
    }
})

$("#inputsurname").change(function(){
    if(!/^([А-Я][а-я]*)?$/.test($("#inputsurname").val()))
    {
        $("#errorsurnameinput").text("Введите фамилию корректно");
        $("#errorsurnameinput").show();
    }
    else
    {
        $("#errorsurnameinput").hide();
    }
})



$("#telephone").change(function()
{
    if(!/^[+]7\d{10}$/.test($("#telephone").val()))
    {
        $("#errortelephonenumberinput").height("60px");
        $("#errortelephonenumberinput").text("В поле контакнтого телефона необходим ввод вида +7xxxxxxxxxx, где x-цифра");
        $("#errortelephonenumberinput").show();
    }
    else
    {
        $("#errortelephonenumberinput").height("20px");
        $("#errortelephonenumberinput").hide();
    }
})

$("#tin").change(function()
{
    if(!/^\d*$/.test($("#tin").val()))
    {
        $("#errortininput").text("В поле ИНН можно использовать только цифры");
        $("#errortininput").height("40px");
        $("#errortininput").show();
    }
    else
    {
        if($("#tin").val().length != 10 && $("select#person").val() == "Юридическое лицо")
        {
        $("#errortininput").text("Некорректный ввод. ИНН юридических лиц состоит из 10 цифр");
        $("#errortininput").height("40px");
        $("#errortininput").show();
        }
        else    if($("#tin").val().length != 12 && $("select#person").val() == "Физическое лицо")
        {
            $("#errortininput").text("Некорректный ввод. ИНН физических лиц состоит из 12 цифр");
            $("#errortininput").height("40px");
            $("#errortininput").show();
        }
        else
            $("#errortininput").hide();
            $("#errortininput").height("20px");
    }
})
$("#sum").change(calculation);


$("#submitbutton").click(function()
{
    if($("select#person").val() == "")
        {
            $("#errorpersonselect").show();
        }


    if(!$("#simple-tax-checkbox").is(':checked'))
    {
        if(!$("#tin").val())
        {
            $("#errortininput").height("20px");
            $("#errortininput").text("Заполните поле ИНН");
            $("#errortininput").show();
        }
        else if(!/^\d*$/.test($("#tin").val()))
        {
            $("#errortininput").text("В поле ИНН можно использовать только цифры");
            $("#errortininput").show();
        }
        else
        {
            if($("#tin").val().length != 10 && $("select#person").val() == "Юридическое лицо")
            {
            $("#errortininput").text("Некорректный ввод. ИНН юридических лиц состоит из 10 цифр");
            $("#errortininput").height("40px");
            $("#errortininput").show();
            }
            else    if($("#tin").val().length != 12 && $("select#person").val() == "Физическое лицо")
            {
                $("#errortininput").text("Некорректный ввод. ИНН физических лиц состоит из 12 цифр");
                $("#errortininput").height("40px");
                $("#errortininput").show();
            }
        }
    }
    
    if(!$("#inputname").val())
        {
            $("#errornameinput").text("Заполните поле имя");
            $("#errornameinput").show();
        }
    if(!$("#inputsurname").val())
        {
            $("#errorsurnameinput").text("Заполните поле фамилия");
            $("#errorsurnameinput").show();
        }
    if(!$("#telephone").val())
        {
            $("#errortelephonenumberinput").height("20px");
            $("#errortelephonenumberinput").text("Заполните поле контактный телефон");
            $("#errortelephonenumberinput").show();
        }
    if(!$("#sum").val())
        {
            $("#errorsuminput").height("20px");
            $("#errorsuminput").text("Заполните поле сумма платежа");
            $("#errorsuminput").show();
        }
})



var isReadyToSubmit = function()
{
    return $("#errortelephonenumberinput").is(':hidden') && $("#errortininput").is(':hidden') && $("#errorsuminput").is(':hidden') &&
     $("#errorpersonselect").is(':hidden') && $("#errornameinput").is(':hidden') && $("#errorsurnameinput").is(':hidden') &&
     $("#person").val() && $("#inputname").val() && $("#inputsurname").val() && $("#telephone").val() && $("#sum").val() && 
     ($("#tin").val() && !$("#simple-tax-checkbox").is(':checked') || $("#simple-tax-checkbox").is(':checked'));
}

$("#form").submit(function (event) {
    if(!isReadyToSubmit())
    {
    event.preventDefault();
    }
});