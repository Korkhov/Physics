$(document).ready(function () {
    var qstIds;
    var passedQstIds = [];
    var currQstId;

    $('.start-test').click(function () {
        passedQstIds = [];
        $('.qst-curr-nmb').text(0);
        $('.start-menu').hide();
        $('.summary').hide();
        $.getJSON('question/getIds', function (data) {
            $('.qst-all-nmb').text(data.length);
            qstIds = data;
            setNextQst();
        });
    });

    $('.qst-ans').click(function () {
        var thisAnswer = $(this);
        var answerText = $(this).text();
        $.getJSON('question/checkAnswer', { id: currQstId, text: answerText }, function (data) {
            var currQstIndex = qstIds.indexOf(currQstId);
            if (data.result) {
                thisAnswer.addClass('btn-success');
                if (currQstIndex != -1) {
                    passedQstIds.push(currQstId);
                }
            }
            else {
                thisAnswer.addClass('btn-danger');
            }
            if (currQstIndex != -1) {
                qstIds.splice(currQstIndex, 1);
            }
            $('.next-qst').show();
        });
    });

    $('.next-qst-btn').click(function () {
        if (qstIds.length == 0) {
            $('.qst-corr-nmb').text(passedQstIds.length);
            $('.light-test').hide();
            $('.summary').show();
        }
        else {
            setNextQst();
        }
    })

    function setNextQst() {
        currQstId = qstIds[Math.floor(Math.random() * qstIds.length)];
        $('.qst-curr-nmb').text(parseInt($('.qst-curr-nmb').text()) + 1);
        $.getJSON('question/getById', { id: currQstId }, function (data) {
            $('.qst-txt').text(data.text);
            var answersCount = data.answers.length;
            for (var i = 0; i < answersCount; i++) {
                var answer = data.answers[Math.floor(Math.random() * data.answers.length)];
                $('.' + i + '-ans-btn').text(answer.text);
                $('.' + i + '-ans-btn').removeClass('btn-danger').removeClass('btn-success');
                data.answers.splice(data.answers.indexOf(answer), 1);
            }
            $('.next-qst').hide();
            $('.light-test').show();
        });
    }
});