Template.documentWorkspace.onRendered(function () {
    $.getScript("https://apis.google.com/js/client.js?onload=checkAuth", function (data, textStatus, jqxhr) {
        console.log(data); // Data returned
        console.log(textStatus); // Success
        console.log(jqxhr.status); // 200
        console.log("Load was performed.");
        checkAuth();
    });
});

var CLIENT_ID = '195417595857-4rj9gnsg7d59m942l4g8cq8215koim31.apps.googleusercontent.com';

var SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];

/**
 * Check if current user has authorized this application.
 */
checkAuth = function () {
    gapi.auth.authorize(
        {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
        }, handleAuthResult);
};

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
handleAuthResult = function (authResult) {
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
        // Hide auth UI, then load client library.
        authorizeDiv.style.display = 'none';
        loadDriveApi();
    } else {
        // Show auth UI, allowing the user to initiate authorization by
        // clicking authorize button.
        authorizeDiv.style.display = 'inline';
    }
};

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
handleAuthClick = function (event) {
    gapi.auth.authorize(
        {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
        handleAuthResult);
    return false;
};

/**
 * Load Drive API client library.
 */
loadDriveApi = function () {
    gapi.client.load('drive', 'v2', listFiles);
};

/**
 * Print files.
 */
listFiles = function () {
    var request = gapi.client.drive.files.list({
        'maxResults': 10
    });

    request.execute(function (resp) {
        appendPre('Files:');
        var files = resp.items;
        if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                appendPre(file.title + ' (' + file.id + ')');
            }
        } else {
            appendPre('No files found.');
        }
    });
};

/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */
appendPre = function (message) {
    var pre = document.getElementById('output');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
};
