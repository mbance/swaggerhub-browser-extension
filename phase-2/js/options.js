/*
* Copyright (c) 2019. by 8x8, Inc.
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

let saveTimer = false;

/**
 * Namespace declaration
 * @type {{setTestButtonEnable: myFunctions.setTestButtonEnable, setFeedback: myFunctions.setFeedback}}
 */
let myFunctions = {
    /**
     * Function to enable /or disable the 'Test' button.
     * @param enabled is a boolean which either enables or disables the 'Test' button based whether condition is met.
     */
    setTestButtonEnable: function (enabled) {
        document.getElementById('btnTest').disabled = !enabled;
        if (enabled) {
            document.getElementById('btnTest').classList.remove("disabled");
        }
        else {
            document.getElementById('btnTest').classList.add("disabled");
        }
    },
    /**
     * Sets the feedback message displayed below the 'Test' button on the page.
     * Can display either potential error or success messages
     * @param message takes as a parameter to check whether an error should be displayed
     * @param isError checks whether an error has occurred and if so, it will print this as a feedback message
     */
    setFeedback: function (message, isError) {
        if (!message) {
            document.getElementById('msg').innerHTML = message;
            if (isError) {
                document.getElementById('msg').classList.add("error");
            }
            else {
                document.getElementById('msg').classList.remove("error");
            }
        }
        else {
            document.getElementById('msg').innerHTML = message;
        }
    }
};

/**
 * Sync the endpoint url value to local storage
 */
chrome.storage.sync.get('endpoint', function (data) {
    if (data && data.endpoint) {
        document.getElementById('url').value = data.endpoint;
    }
    myFunctions.setTestButtonEnable(document.getElementById('url').value.trim() !== "");
});

/**
 * Sync the endpoint url value to local storage as we type
 */
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('url').addEventListener('keyup', function () {
        clearTimeout(saveTimer);
        myFunctions.setFeedback('');
        saveTimer = setTimeout(function () {
            chrome.storage.sync.set({'endpoint': document.getElementById('url').value.trim() === "" ? null : document.getElementById('url').value}, function () {
                myFunctions.setTestButtonEnable(document.getElementById('url').value.trim() !== "");
            });
        }, 500);
    }, false);
});

/**
 * Test the url of the endpoint
 * Providing either a success or error message
 */
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btnTest').addEventListener('click', function () {
        if (document.getElementById('url').value.trim() === "") {
            myFunctions.setFeedback('URL endpoint is empty', true);
            $("#msg").css("backgroundColor", "red");
        }
        else {
            myFunctions.setFeedback('Testing URL endpoint...');
            myFunctions.setTestButtonEnable(false);
            $("#msg").css("color", "white");
            document.getElementById('url').disabled = true;
            fetch(document.getElementById('url').value, {}).then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                $("#msg").css("backgroundColor", "green");
                myFunctions.setFeedback('Success!');
            })
                .catch(function (error) {
                    let str = "More details";
                    let err = alert(error);
                    let txt = str.link(err);
                    myFunctions.setFeedback('Unable to fetch from endpoint. Please ensure you have entered a valid URL.' + txt, true);
                    $("#msg").css("backgroundColor", "red");
                })
                .finally(function () {
                    myFunctions.setTestButtonEnable(true);
                    document.getElementById('url').disabled = false;
                });
        }
    }, false);
});