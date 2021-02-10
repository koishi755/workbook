"use strict";
let count = 1 ;
let url; 
let json_length;

// 画面を開いた時の処理
$(document).ready(function(){
    // jsonファイル読み込み
    $.ajax({url:'data.json', dataType:'json'})
    //jsonが読み込まれた時の処理
    .done(function(json_data){
        // jsonの要素数を取得        
        let keys_array = Object.keys(json_data);
        json_length =  keys_array.length;
        // jsonの要素数を10で割った数を求める
        let i = count_quiz(json_length);
        // json要素数の商分のボタンを追加
        create_start(i);

    })
    //jsonの読み込みに失敗した時の処理
    .fail(function(){
        window.alert('JSON読み込みエラー');
    });
});

function count_quiz(json_length){
    let i = json_length / 10;
    if (i < 1){
        i = 1
    }
    i = Math.floor(i);
    return i;
}

function create_start(i){
    let start = 1;
    let end = 10;
    for (let step = 0; step < i; step++) {

        
        let add = `<p class="start_quiz" name="start_quiz" data-start_quiz=${start} data-end_quiz=${end} onclick="start_quiz(${start})">start ${start}~${end}</p>`;
        document
        .getElementById("add_section")
        .insertAdjacentHTML("beforeend", add);
        start += 10;
        end += 10;
      }
}

function start_quiz(start){
    
    count = start
    let element = document.getElementsByName("start_quiz")[start-1]
    let end = element.dataset.end_quiz;

    let add = `<input type="button" title="test" value="次の問題" id="next" data-end_quiz=${end} onClick="next()" /><input type="button" value="答え" onClick="check_the_answer()"/>`;

    // startボタンを消して、次の問題ボタン、答えボタンを追加
    document
    .getElementById("add_section")
    .remove();

    
    document
    .getElementById("add_button")
    .insertAdjacentHTML("beforeend", add);

    url = "data.json"
    get_data(start)    
}

//答え合わせボタンの機能
function check_the_answer(){

    // labelをyour_choiceリストに格納
    let your_choice = document.getElementsByName("label");

    // your_choiceを1つずつ取り出して処理
    for (let choice of your_choice){

        // labelのdata-answerをanswerに格納
        let answer = choice.dataset.answer;

        // answerによりcalassを追加して背景色を変える
        if (answer === "correct"){
            choice.classList.add("green");
        }else{
            choice.classList.add("red");
        }
    }
}

// 次の問題ボタン
function next(){
    // ボタンを押した回数
    let element = document.getElementById("next")
    let end = element.dataset.end_quiz;
    end += 1 ;
    count += 1;
    del();
    if (count < end){
        get_data(count);
    }
    
}

// startボタン
$('#button').on('click', function() {
    let add = `<input type="button" title="test" value="次の問題" onClick="next()" /><input type="button" value="答え" onClick="check_the_answer()"/>`;
    
    // startボタンを消して、次の問題ボタン、答えボタンを追加
    document.getElementById('button').remove();
    document
    .getElementById("add_button")
    .insertAdjacentHTML("beforeend", add);

    url = "data.json"
    get_data(1)
});


function get_data(count){
    let option_array = [];
    let label_array = [];

    // json読み込み
    $.ajax({url:url, dataType:'json'})
    //jsonが読み込まれた時の処理
    .done(function(json_data){

        // ボタンを押した回数を文字列に変換
        let count_str = String(count);
        
        // jsonからボタンを押した回数の部分のデータを読み込み
        json_data[count_str].option.forEach(function(item){
            // チェックボックスとラベルを読み込んデータから作成
            option_array.push(`<input type="checkbox" name="option" id="${item.label}" data-answer=${item.answer}>`);
            label_array.push(`<label for="${item.label}" name="label" data-answer="${item.answer}">${item.text}</label>`);
        });
        // 問題文を取り込み
        let quiz_text = `<p>${count_str}. ${json_data[count_str].quiz}</p>`;
        
        let i = 0 ;
        let option = "";

        // チェックボックスのリストとラベルのリストを一つの変数にまとめる
        for (let item of option_array){
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
    .fail(function(){
        window.alert('JSON読み込みエラー');
    }); 
}

function del() {
    document.getElementById("container").remove();
}


