// "use strict";

var $ = require('jQuery');

$(() => {
    let count = 0;

    $('#next').on('click', () => { next() });
    $('#answer').on('click', () => { check_the_answer() });

    //答え合わせボタンの機能
    function check_the_answer() {

        // labelをyour_choiceリストに格納
        let your_choice = document.getElementsByName("label");

        // your_choiceを1つずつ取り出して処理
        for (let choice of your_choice) {

            // labelのdata-answerをanswerに格納
            let answer = choice.dataset.answer;

            // answerによりcalassを追加して背景色を変える
            if (answer === "correct") {
                choice.classList.add("green");
            } else {
                choice.classList.add("red");
            }
        }
    }

    // 次の問題ボタン
    function next() {
        // ボタンを押した回数
        count += 1;
        del();
        get_data(count);
    }

    // startボタン
    $('#button').on('click', function () {
        // startボタンを消して、次の問題ボタン、答えボタンを追加
        $('#button').remove();
        $('#add_button').css({'display': 'block'});
        get_data(0)
    });


    function get_data(count) {
        let option_array = [];
        let label_array = [];

        // json読み込み
        $.ajax({ url: '/data.json', dataType: 'json' })
            //jsonが読み込まれた時の処理
            .done(function (json_data) {

                // ボタンを押した回数を文字列に変換
                let count_str = String(count);

                // jsonからボタンを押した回数の部分のデータを読み込み
                json_data[count_str].option.forEach(function (item) {
                    // チェックボックスとラベルを読み込んデータから作成
                    option_array.push(`<input type="checkbox" name="option" id="${item.label}" data-answer=${item.answer}>`);
                    label_array.push(`<label for="${item.label}" name="label" data-answer="${item.answer}">${item.text}</label>`);
                });
                // 問題文を取り込み
                let quiz_text = `<p>${json_data[count_str].quiz}</p>`;

                let i = 0;
                let option = "";

                // チェックボックスのリストとラベルのリストを一つの変数にまとめる
                for (let item of option_array) {
                    option += `<div>${item}${label_array[i]}</div>`;
                    i += 1;
                }

                // 問題文と選択肢をまとめる
                quiz_text = `<div id="container">${quiz_text}${option}</div>`

                // 作成した文をhtmlへ書き込み
                document
                    .getElementById("article")
                    .insertAdjacentHTML("beforeend", quiz_text);
            })
            //jsonの読み込みに失敗した時の処理
            .fail(function () {
                window.alert('JSON読み込みエラー');
            });
    }

    function del() {
        $("#container").remove();
    }

});