function display_validate_status(elem_id, stat) {
    var msg_area = $(elem_id).parent();
    if (stat == "OK") {
        msg_area.addClass("form-ok-background");
    } else if (stat == "Failed") {
        msg_area.addClass("form-error-background");
    }
}

function validate_field(field_id, callback) {
    $(field_id).focusout(function(evt) {
        var status = callback(field_id);
        if (status) {
            display_validate_status(field_id, status);
        }
    });
}

function validate_username(username_id) {
    validate_field(username_id, function(uid) {
        var username = $(uid).val();

        $.post("/register/check_username/", {
            username: username
        }, function(data) {
            display_validate_status(uid, data);
        });
    });
}
