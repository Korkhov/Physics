$(document).ready(function () {
    var qstIds;
    var passedQstIds = [];
    var currQstId;

    $('.start-test').click(function () {
        passedQstIds = [];
        $('.qst-curr-num').text(0);
        $('.start-menu').hide();
        $('.summary').hide();
        $.post('question/getAllIds', function (data) {
            if (data.err) { } else { data = data.data }
            $('.qst-all-num').text(data.length);
            qstIds = data;
            setNextQst();
        }, "json");
    });

    $('.qst-ans-btn').click(function () {
        var thisAnswer = $(this);
        var answerText = $(this).text();
        $.post('question/checkAnswer', { id: currQstId, text: answerText }, function (data) {
            if (data.err) { } else { data = data.data }
            var currQstIndex = qstIds.indexOf(currQstId);
            if (data.isCorrect) {
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
        }, "json");
    });

    $('.next-qst-btn').click(function () {
        if (qstIds.length == 0) {
            $('.qst-corr-num').text(passedQstIds.length);
            $('.test').hide();
            $('.summary').show();
        }
        else {
            setNextQst();
        }
    })

    function setNextQst() {
        currQstId = qstIds[Math.floor(Math.random() * qstIds.length)];
        $('.qst-curr-num').text(parseInt($('.qst-curr-num').text()) + 1);
        $.post('question/getById', { id: currQstId }, function (data) {
            if (data.err) { } else { data = data.data }
            $('.qst-txt').text(data.text);
            var answersCount = data.answers.length;
            for (var i = 0; i < answersCount; i++) {
                var answer = data.answers[Math.floor(Math.random() * data.answers.length)];
                $('.' + i + '-ans-btn').text(answer.text);
                $('.' + i + '-ans-btn').removeClass('btn-danger').removeClass('btn-success');
                data.answers.splice(data.answers.indexOf(answer), 1);
            }
            $('.next-qst').hide();
            $('.test').show();
        }, "json");
    }
});