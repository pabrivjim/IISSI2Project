"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";

// Aux function to get the div in which to display messages
// It's centralized here so we can change it easily in the case its ID changes
const msgsDivID = "errors";
const msgsSuccessDivID = "successDiv";

function getErrorsDiv() {
    return document.getElementById(msgsDivID);
}

function getSuccessDiv() {
    return document.getElementById(msgsSuccessDivID);
}

const messageRenderer = {

    showMessageAsAlert: function (message, bootClass) {
        let html = `<div class="alert alert-${bootClass} alert-dismissible col-md-12">
                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                        ${message}
                    </div>`;
        let errorsDiv = getErrorsDiv();

        if (errorsDiv === null) {
            console.error('You tried to render the following message, however, a ' +
                `<div id="${msgsDivID}"> could not be found in your view to show it there:`);
            console.error(message);
            return;
        }

        let messageElem = parseHTML(html);
        errorsDiv.appendChild(messageElem);
    },

    showMessageAsAlertSuccess: function (message, bootClass) {
        let html = `<div class="alert alert-${bootClass} alert-dismissible col-md-12">
                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                        ${message}
                    </div>`;
        let successDiv = getSuccessDiv();

        if (successDiv === null) {
            console.error('You tried to render the following message, however, a ' +
                `<div id="${msgsSuccessDivID}"> could not be found in your view to show it there:`);
            console.error(message);
            return;
        }

        let messageElem = parseHTML(html);
        successDiv.appendChild(messageElem);
    },

    showErrorMessage: function (message) {
        this.showMessageAsAlert(message, "danger");
    },

    showWarningMessage: function (message) {
        this.showMessageAsAlert(message, "warning");
    },

    showSuccessMessage: function (message) {
        this.showMessageAsAlertSuccess(message, "success");
    },
}

export { messageRenderer };