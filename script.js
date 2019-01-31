var qn = 0;
var no;
var myArray = []; 
var tipe = [];
function changesoal(no) {
    akhir = $('#jumlah_soal').text();
    if (no == 0) {

    } else
    if (no == akhir) {
        $('#nomor span').html(no);
        $('.no').removeClass('active');
        $('.no.no-' + no).addClass('active');
        $('#next-soal').hide();
        $('#last-soal').show();
    } else
    {
        $('#nomor span').html(no);
        $('.no').removeClass('active');
        $('.no.no-' + no).addClass('active');
        $('#next-soal').show();
        $('#last-soal').hide();
    }

    $('.ragu-check').removeClass('far fa-check-square');
    $('.ragu-check').removeClass('far fa-square');
    if ($('.no.active').hasClass('ragu-ragu')) {
        $('.ragu-check').addClass('far fa-check-square');
    } else {
        $('.ragu-check').addClass('far fa-square');
    }

}

function setIndividual_time(cqn) {
    if (cqn == undefined || cqn == null) {
        var cqn = '0';
    }
    if (cqn == '0') {
        ind_time[qn] = parseInt(ind_time[qn]) + parseInt(ctime);

    } else {

        ind_time[cqn] = parseInt(ind_time[cqn]) + parseInt(ctime);

    }

    ctime = 0;

    document.getElementById('individual_time').value = ind_time.toString();

    var iid = document.getElementById('individual_time').value;


    var formData = {individual_time: iid};
    $.ajax({
        type: "POST",
        data: formData,
        url: base_url + "index.php/quiz/set_ind_time",
        success: function (data) {
            console.log(data);
        },
        error: function (xhr, status, strErr) {
            //alert(status);
            console.log(status);
        }
    });

}
 
function save_time() {

    var formData = {temp_time: TotalSeconds};
    $.ajax({
        type: "POST",
        data: formData,
        url: base_url + "index.php/quiz/set_temp_time",
        success: function (data) {
            console.log(data);
        },
        error: function (xhr, status, strErr) {
            console.log(status);
        }
    });
}

function jawab(){
     $('.option').click(function () {
        $(this).closest('.options-group').find('.option').each(function () {
            $(this).removeClass('checked');
        }) 
        $(this).addClass('checked');
        nomor = $('.soal.active').find('.nomor').text();
        $('.no.no-' + nomor + ' span').html($('#option-' + $(this).val()).html());
        $('.no.no-' + nomor).addClass('done');
        no = nomor - 1;
        nomor = $(this).closest('.active').attr('id');
        nomor = nomor.replace('nomor-asli-', '');
        ragu = $('.btn-warning.ragu span').hasClass('glyphicon-check');
        if (ragu) {
            ragu = 'YA';
        } else {
            ragu = 'TIDAK';
        }

        var soal = $('input[name="question_type[]"]').map(function () {
            return this.value;
        }).get();
        var jawab = $('input[name="answer[' + no + '][]"]:checked').map(function () {
            return this.value;
        }).get();
       
        var qid = $('input[name="qid['+no+']"]').map(function(){
            return this.value;
        }).get();
        //data diganti MyArray untuk nyimpen satu-satu
        
        myArray[no] = jawab;
        tipe[no] = 1;
        var rid = document.getElementById('rid').value;
        var individual_time = document.getElementById('individual_time').value; 
        //
        // console.log(myArray);
         //console.log(qid);
         
          
          var str = $("form").serialize();
         $.ajax({
        type: "POST",
        data: {answer: myArray, question_type : tipe, individual_time:individual_time, rid: rid, qid: qid[0], nomor: no},
        //dataType: 'json',
        url: base_url + "index.php/quiz/save_answer/",
        success: function (data) {
            // signal 1
            $('#save_answer_signal2').css('backgroundColor', '#00ff00');
            setTimeout(function () {
                $('#save_answer_signal2').css('backgroundColor', '#666666');
            }, 5000);
           myArray=[];
           tipe = [];     
        },
        error: function (xhr, status, strErr) {
            alert("Terjadi error, silahkan refresh halaman dengan cara menekan F5");

            // signal 1
            $('#save_answer_signal2').css('backgroundColor', '#ff0000');
            setTimeout(function () {
                $('#save_answer_signal2').css('backgroundColor', '#666666');
            }, 5500);

        }
    });
    
      /*  $.post('../save_answer/', {
            // no : nomor,
            // option : $(this).text(),
            // ragu : ragu
            rid: $('#rid').val(),
            noq: $('#noq').val(),
            individual_time: $('#individual_time').val(),
            question_type: soal,
            answer: myArray,
        }, function (s) {
            //alert (s);
            console.log(myArray)
        }) */
    })
       
}

$(document).ready(function () {

   jawab();

    $('.ragu').click(function () {
        a = $(this).find('.ragu-check');
        if (a.hasClass('far fa-square')) {
            a.removeClass('far fa-square');
            a.addClass('far fa-check-square');
            nomor = $('.soal.active').find('.nomor').text();
            $('.no.no-' + nomor).addClass('ragu-ragu');
        } else {
            a.removeClass('far fa-check-square');
            a.addClass('far fa-square');
            nomor = $('.soal.active').find('.nomor').text();
            $('.no.no-' + nomor).removeClass('ragu-ragu');
        }
        $('.soal.active .option.checked').click();
    })

    $('.no').click(function () {
        nomor = $(this).find('p').html();
        $('.soal').removeClass('active');
        $('.soal.nomor-' + nomor).addClass('active');
        changesoal(nomor);
    })

    $(document).ready(function(){
        $('#summary-button').click(function(){
          if ($(this).hasClass('tombol-daftar-soal')) {
            $(this).removeClass('tombol-daftar-soal');
            $(this).addClass('tombol-daftar-soal-2');
            $('#summary').removeClass('daftar-soal');
            $('#summary').addClass('daftar-soal-2');
          } else {
            $(this).removeClass('tombol-daftar-soal-2');
            $(this).addClass('tombol-daftar-soal');
            $('#summary').removeClass('daftar-soal-2'); 
            $('#summary').addClass('daftar-soal');
          }
        })
    })
    

    $('#next-soal').click(function () {
        $('.soal.active').next().addClass('active');
        $('.soal.active').eq(0).removeClass('active');
        nomor = $('.soal.active').find('.nomor').text();
        changesoal(nomor);
    })
    $('#prev-soal').click(function () {
        $('.soal.active').prev().addClass('active');
        $('.soal.active').eq(1).removeClass('active');
        nomor = $('.soal.active').find('.nomor').text();
        changesoal(nomor);
    })

    $('#summary-button').click();

})
// var base_url = "http://ujian.nguprek.com/";
var base_url = "index.html";
var Timer;
var TotalSeconds;


function CreateTimer(TimerID, Time) {
    Timer = document.getElementById(TimerID);
    TotalSeconds = Time;

    UpdateTimer()
    window.setTimeout("Tick()", 1000);
}

function Tick() {
    if (TotalSeconds <= 0) {
        alert("Time's up!")
        return;
    }

    TotalSeconds -= 1;
    UpdateTimer()
    window.setTimeout("Tick()", 1000);
}

function UpdateTimer() {
    var Seconds = TotalSeconds;

    var Days = Math.floor(Seconds / 86400);
    Seconds -= Days * 86400;

    var Hours = Math.floor(Seconds / 3600);
    Seconds -= Hours * (3600);

    var Minutes = Math.floor(Seconds / 60);
    Seconds -= Minutes * (60);


    var TimeStr = ((Days > 0) ? Days + " days " : "") + LeadingZero(Hours) + ":" + LeadingZero(Minutes) + ":" + LeadingZero(Seconds)


    Timer.innerHTML = TimeStr;
}


function LeadingZero(Time) {

    return (Time < 10) ? "0" + Time : +Time;

}

//var myCountdown1 = new Countdown({time:1152, rangeHi:"hour", rangeLo:"second"});
setTimeout(submitform, '1152000');

function submitform() {
    alert('Time Over');
    // window.location = "http://ujian.nguprek.com/index.php/quiz/submit_quiz";
    window.location = "index.html";
}

function tutup() {
    $('#yakin-modal').hide();
}

function tutupRagu(){
    $('#ragu-modal').hide();
}

function selesai() {
    if ($('#yakin').is(":checked")) {
        window.location = "feedback.html";
    } else {
        alert('Silahkan Pilih Centang Terlebih Dahulu');
    }
}
var ctime = 0;
var ind_time = new Array();
    ind_time[0] =60;
        ind_time[1] =0;
        ind_time[2] =0;
        ind_time[3] =0;
        ind_time[4] =0;
        ind_time[5] =0;
        ind_time[6] =0;
        ind_time[7] =0;
        ind_time[8] =0;
        ind_time[9] =0;
    noq = "10";
//show_question('0');


function increasectime() {

    ctime += 1;

}
setInterval(increasectime, 1000);
setInterval(setIndividual_time, 30000);
setInterval(save_time, 10000);

$(document).ready(function () {
    $('#finish').text('11 January 2016 17:00:00');
    $('#last-soal').click(function () {
        if ($('.not-done').length > 0) {
            $('#ragu-modal').show();
        } else {
            if ($('.ragu-ragu').length > 0) {
                $('#ragu-modal').show();
            } else {
                $('#yakin-modal').show();
            }
        }
    })
});

var ctime = 0;
var ind_time = new Array();
    ind_time[0] =60;
        ind_time[1] =0;
        ind_time[2] =0;
        ind_time[3] =0;
        ind_time[4] =0;
        ind_time[5] =0;
        ind_time[6] =0;
        ind_time[7] =0;
        ind_time[8] =0;
        ind_time[9] =0;
    noq = "10";
//show_question('0');

function increasectime() {

    ctime += 1;

}
setInterval(increasectime, 1000);
setInterval(setIndividual_time, 30000);
setInterval(save_time, 10000);
