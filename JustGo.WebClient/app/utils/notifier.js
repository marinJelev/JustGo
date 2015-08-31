 function alertError(message, $selector) {
    var alertDiv = createAlertDiv()
        .addClass('alert-danger')
        .text(message);
    showAlert(alertDiv, $selector);
}

 function alertSuccess(message, $selector) {
    var alertDiv = createAlertDiv()
        .addClass('alert-success')
        .text(message);
    showAlert(alertDiv, $selector);
}

function alertInfo(message, $selector, link) {
    var alertDiv =createAlertDiv()
            .addClass('alert-info')
            .text(message),
        anchorTag = $('<a>').attr('href', link);
    alertDiv.append(anchorTag);
    showAlert(alertDiv, $selector);
}

function createAlertDiv() {
    return $('<div class="alert alert-dismissible alert-pesho">');
}

function showAlert(alertDiv, $selector) {
    $('body').append(alertDiv);
    alertDiv.fadeOut(5000, function () {
        alertDiv.remove();
    });
}

export default { alertError, alertSuccess };
