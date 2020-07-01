/*
* Copyright (c) 2019. by 8x8. Inc.
*  _____      _____
* |  _  |    |  _  |
*  \ V /__  __\ V /   ___ ___  _ __ ___
*  / _ \\ \/ // _ \  / __/ _ \| '_ ` _ \
* | |_| |>  <| |_| || (_| (_) | | | | | |
* \_____/_/\_\_____(_)___\___/|_| |_| |_|
*
* All rights reserved.
*
* This software is the confidential and proprietary information
* of 8x8 Inc. ("Confidential Information").  You
* shall not disclose such Confidential Information and shall use
* it only in accordance with the terms of the license agreement
* you entered into with 8x8 Inc.
*/

'use strict';

/**
 * Content script to communicate between web page and chrome extension to exchange information
 * @param file - takes the file as a parameter to use an input to inject
 * @param node - node to inject script into
 */
function injectScript(file, node) {
    let th = document.getElementsByTagName(node)[0];
    let s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
}

/**
 *Listens for reported back message before injecting the script into the DOM (body of the document)
 */
chrome.runtime.onMessage.addListener(
    function (request) {
        if (request.text === "report_back") {
            injectScript(chrome.extension.getURL('js/injectedScript.js'), 'body');
        }
    }
);