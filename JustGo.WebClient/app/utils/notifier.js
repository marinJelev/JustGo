export function alertError(message, $selector) {
    var alertDiv = createAlertDiv()
        .addClass('alert-danger')
        .text(message);
    showAlert(alertDiv, $selector);
}

export function alertSuccess(message, $selector) {
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
    return $('<div class="alert alert-dismissible ">');
}

function showAlert(alertDiv, $selector) {
    $($selector).prepend(alertDiv);
    alertDiv.fadeOut(5000, function () {
        alertDiv.remove();
    });
}
