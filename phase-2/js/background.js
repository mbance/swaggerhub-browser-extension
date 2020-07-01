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
 * Upon install of the extension:
 */
chrome.runtime.onInstalled.addListener(function (details) {
    /**
     * Remove all existing rules
     */
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        /**
         * and replace with a new rule:
         */
        chrome.declarativeContent.onPageChanged.addRules([
            {
                /**
                 * Which executes when the page's URL matches that of the SwaggerHub API editor
                 */
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {urlMatches: "https://swaggerhub.es.8x8.com/*/*"}
                    })
                ],
                /**
                 * And shows the extension's page action
                 */
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }
        ]);
    });
    if (details.reason === "install") {
        alert('Opening options page to configure extension settings for initial use');
        console.log('First-time installation: Opening options for first-time configuration...');
        chrome.runtime.openOptionsPage();
    }
    else if (details.reason === "update") {
        let thisVersion = chrome.runtime.getManifest().version;
        alert("Chrome has been updated from " + details.previousVersion + " to " + thisVersion + ". " + "Opening options to reconfigure settings...");
        chrome.runtime.openOptionsPage();
    }
});
// noinspection JSUnusedLocalSymbols
/**
 * Listen for click of Chrome Extension icon, on click: inject script
 * @param tab - part of Chrome library, gives access to content within tab and other tab information
 */
chrome.pageAction.onClicked.addListener(function (tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tab) {
        chrome.tabs.sendMessage((tab[0].id), {text: 'report_back'})
    })
});
/**
 *Listen for command to open extension using shortcut keys
 */
chrome.commands.onCommand.addListener(function (command) {
    console.log('Command:', command);
});

/**
 * Listens for page refresh and executes content script
 */
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    chrome.tabs.executeScript(null,{file:"../content.js"});
});