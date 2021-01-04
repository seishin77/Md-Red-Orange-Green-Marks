// ==UserScript==
// @name         Red/Green check marks
// @namespace    Github
// @version      0.3
// @description  renders red/green check checkbox
// @author       Seishin77
// @match        http*://github.com/*
// @require      https://code.jquery.com/jquery-3.5.1.slim.min.js
// @grant        none
// @downloadURL https://github.com/seishin77/Md-Red-Orange-Green-Marks/raw/master/Red-Green%20check%20marks.user.js
// @updateURL   https://github.com/seishin77/Md-Red-Orange-Green-Marks/raw/master/Red-Green%20check%20marks.user.js
// ==/UserScript==

/* global $ */
function addStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var selector;
function activeMark(idx){
    const re = /(\[.\]) /;

    $(this).find(selector).each(activeMark);

    if(re.test($(this).text().trim()) === true){
        $(this).html('<input type="checkbox" disabled=""><label></label> ' + $(this).html().replace(re, "<span class='changed'>$1</span>"));
    }
}

(function() {
    'use strict';
    console.log("MROGM started");
    addStyle(
        'input[type="checkbox"]:disabled{display: none;}' +
        'input[type="checkbox"]:disabled + label{box-sizing: border-box;display: inline-block;width: 0.5rem;height: 0.5rem;' +
        'border-radius: 0.5rem;padding: 2px;background-color: #bf4040;position: relative;top: -0.15rem;margin-right: 0rem;}' +
        'input[type="checkbox"]:disabled + label.orange{background-color: #ffa600;}' +
        'input[type="checkbox"]:disabled + label.blue{background-color: #0095e8;}' +
        'input[type="checkbox"]:disabled:checked + label{background-color:#00e8b7;}' +
        'del+ins, span.changed{display:none;}'
    );

    $('ul.contains-task-list li').addClass('task-list-item');
    $('ul.contains-task-list li.task-list-item p').contents().unwrap();
    $('ul:not(.contains-task-list) li.task-list-item').first().parent().addClass('contains-task-list');

    $('input[type="checkbox"]:disabled').after($('<label>'));

    selector = 'ul.contains-task-list li';
    $(selector).each(activeMark);

    $('input[type="checkbox"]:disabled+label').each(
        function(idx){
            let p = $(this).parent('li').find('span.changed');
            if(p.length > 0){
                let t = $(p[0]).text();
                switch(t.substr(0,2).toLowerCase()){
                    case '[o':
                        $(this).addClass('orange');
                        $(this).parent('li').addClass('task-list-item').removeClass('removed-task-list-item');
                        break;
                    case '[b':
                        $(this).addClass('blue');
                        $(this).parent('li').addClass('task-list-item').removeClass('removed-task-list-item');
                        break;
                    default:
                        console.log('unknown case : '+ t);
                }
            }
        }
    );

    console.log("MROGM ended");
})();
