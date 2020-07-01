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

//Upon install of the extension:
chrome.runtime.onInstalled.addListener(function () {

    // Replace all existing rules
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {

        // With a new rule
        chrome.declarativeContent.onPageChanged.addRules([
            {
                // That executes when a page's URL matches the SwaggerHub API
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {urlMatches: '*://*.swaggerhub.es.8x8.com/*'},
                    })
                ],
                // And shows the extension's page action
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }
        ]);
    });
});