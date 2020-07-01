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

//Declare variables from options.html
let urlInput = document.getElementById('url');
let testButton = document.getElementById('btnTest');
let feedbackElement = document.getElementById('msg');
let saveTimer = false;

// Enable/Disable Test Button
function setTestButtonEnable(enabled) {
    testButton.disabled = !enabled;
    if (enabled) {
        testButton.classList.remove("disabled");
    } else {
        testButton.classList.add("disabled");
    }
}

//
function setFeedback(message, isError) {
    feedbackElement.innerHTML = message;
    if (isError) {
        feedbackElement.classList.add("error");
    } else {
        feedbackElement.classList.remove("error");
    }
}

// Sync the url URL to the screen
chrome.storage.sync.get('url', function (data) {
    if (data && data.urlInput) {
        urlInput.value = data.urlInput;
    }
    setTestButtonEnable(urlInput.value.trim() !== "");
});

// Sync the url value to local storage as we type
urlInput.addEventListener('keyup', function () {
    clearTimeout(saveTimer);
    setFeedback('');
    saveTimer = setTimeout(function () {
        chrome.storage.sync.set({'url': urlInput.value.trim() === "" ? null : urlInput.value}, function () {
            console.log('URL saved ' + urlInput.value);
            setTestButtonEnable(urlInput.value.trim() !== "");
        });
    }, 500);
}, false);

// Test the url
testButton.addEventListener('click', function () {
    if (urlInput.value.trim() === "") {
        setFeedback('URL is empty', true);
    } else {
        setFeedback('Testing URL...');
        setTestButtonEnable(false);
        urlInput.disabled = true;
        fetch(urlInput.value, {}).then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            setFeedback('Success!!');
        })
            .catch(function (error) {
                setFeedback('Looks like there was a problem: ' + error, true);
            }).finally(function () {
            setTestButtonEnable(true);
            urlInput.disabled = false;
        });

    }
}, false);