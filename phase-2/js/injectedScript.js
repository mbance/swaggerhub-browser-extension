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
 * @param {{env:string}} env - Variable to access environment of the web page
 * @param {{editor:string}} editor - Variable to access the editor
 */
try {
    console.clear();
    console.log('Extracting YAML');
    let yamlContent = document.getElementsByClassName("ace_editor")[0].env.editor.getValue();
    let apiName = document.getElementsByClassName("title")[0].innerText.split("\n")[0];
    let version = document.getElementsByClassName("version-btn")[0].innerText;
    let username = document.getElementsByClassName("topbar-username")[0].innerText;
    console.log('Extracted Successfully.');
    // console.log('yaml_content: \r\n' + yamlContent);
    // console.log('apiName: \r\n' + apiName);
    // console.log('apiVersion: \r\n' + version);
    // console.log('Username: \r\n' + username);
    let obj = { apiName, version, username, yamlContent };
    let dataJSON = JSON.stringify(obj);
    // console.log(dataJSON);
    console.log('Linting... Waiting for response:');

    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        console.log(xhr.responseText);

    let response = xhr.responseText;
    let response_obj = JSON.parse(response);
    console.log(response_obj);
    });

    xhr.open('POST', 'https://cloud8-acceptance.8x8.com/apidoclinter/public/api/v1/lint');
    xhr.setRequestHeader("Content-Type", "application/JSON");
    xhr.send(dataJSON);
}
catch (err) {
    console.log(err);
}