module.exports = function (_, fs) {
    var api = {
        /*
            INPUT:
            {
                text: <string>,
                answers: [
                    text: <string>,
                    isCorrect: <bool>
                ]
            } 
            OUTPUT:
            {
                resut: <bool>
            }
        */
        add: function (data, callback) {
            api.getAll(data, function (err, result) {
                if (err) { callback(err, null); }
                else {
                    result.push(_.extend(data, _.max(result, function (obj) { return obj.id; } + 1)));
                    fs.writeFile('./questionnaire.json', result.toString(), function (err) {
                        if (err) { callback(err); }
                        else { callback(null, { resut: true }); }
                    })
                }
            });
        },
        /*
            INPUT:
            { } 
            OUTPUT:
            [
                {
                    id: <int>,
                    text: <string>,
                    answers: [
                        text: <string>,
                        isCorrect: <bool>
                    ]
                }
            ]
        */
        getAll: function (data, callback) {
            fs.readFile('./questionnaire.json', 'utf8', function (err, result) {
                if (err) { callback(err, null); }
                else {
                    var data = JSON.parse(result.replace(/^\uFEFF/, ''));
                    callback(null, data);
                }
            });
        },
        /*
            INPUT:
            {
                id: <int>
            }
            OUTPUT:
            {
                id: <int>,
                text: <string>,
                answers: [
                    text: <string>,
                    isCorrect: <bool>
                ]
            }
        */
        getById: function (data, callback) {
            api.getAll(data, function (err, result) {
                if (err) { callback(err, null); }
                else {
                    var ret = _.findWhere(result, { id: +data.id });
                    if (!ret) { callback('Question was not found', null); }
                    else { callback(null, ret); }
                }
            });
        },
        /*
            INPUT:
            {
                id: <int>,
                text: <string>
            }
            OUTPUT:
            {
                isCorrect: <bool>
            }
        */
        checkAnswer: function (data, callback) {
            api.getById(data, function (err, result) {
                if (err) { callback(err, null); }
                else {
                    if (!result) { callback('Question was not found', null); }
                    else {
                        var answer = _.findWhere(result.answers, { text: data.text });
                        if (!answer) { callback('Answer was not found', null); }
                        else {
                            callback(null, { isCorrect: answer.isCorrect });
                        }
                    }
                }
            })
        },
        /*
            INPUT:
            { } 
            OUTPUT:
            [
                {
                    id: <int>
                }
            ]
        */
        getAllIds: function (data, callback) {
            api.getAll(data, function (err, result) {
                if (err) { callback(err, null); }
                else {
                    result = _.map(result, function (obj) {
                        return obj.id;
                    })
                    callback(null, result);
                }
            })
        },
        /*
            INPUT:
            {
                id: <int>
            } 
            OUTPUT:
            {
                resut: <bool>
            }
        */
        remove: function (data, callback) {
            api.getAll(data, function (err, result) {
                if (err) { callback(err, null); }
                else {
                    var question = _.findWhere(result, { id: +data.id });
                    if (!question) { callback('Question was not found', null); }
                    else {
                        result.splice(result.indexOf(question), 1);
                        fs.writeFile('./questionnaire.json', result.toString(), function (err) {
                            if (err) { callback(err); }
                            else { callback(null, { resut: true }); }
                        })
                    }
                }
            });
        }
    };
    return api;
}