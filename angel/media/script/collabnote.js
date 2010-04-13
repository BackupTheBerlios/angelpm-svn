function setup_dialog(link_id, dialog_id) {
    $(link_id).click(function() {
        show_dialog(dialog_id, $(this));
    });
}

function setup_menu_item(item_id, mdialog_id, drop) {
    $(item_id).mouseup(function() {
        show_dialog_menu(mdialog_id, $(this), drop);
    });
}

function setup_yesno_dialog(link_id, dialog_id, message) {
    $(link_id).click(function() {
        show_yes_no_dialog(dialog_id, message);
    });
}

function setup_center_dialog(link_id, dialog_id) {
    $(link_id).click(function() {
        show_center_dialog(dialog_id);
    });
}

function setup_dialog_button(dialog_id) {
}

function init_menu(menu_id) {
    var menu = $(menu_id);
    menu.jacg({radius: '0px', start: '#FFFFFF', end: '#DDDDDD'});
    menu.find(".im-menu-item").mousedown(function() {
        $(this).jacg({radius: '0px', start: '#ACACAC', end: '#DDDDDD'});
    });
    menu.find(".im-menu-item").mouseleave(function() {
        $(this).jacg({radius: '0px', start: '#FFFFFF', end: '#DDDDDD'});
    });
    menu.find(".im-menu-item").mouseup(function() {
        $(this).jacg({radius: '0px', start: '#FFFFFF', end: '#DDDDDD'});
    });
}

function load_window(container_id, url, callback) {
    $(container_id).load(url, callback);
}

function layout_window(container_selector, window_selector,
    window_content_selector, footer_size, header_size) {
    var window_layout, window_content_layout;
    var container = $(container_selector);
    var container_layout = container.layout({
            resizable: false,
            center__paneSelector: window_selector,
            center__onresize: function() {
                window_layout.resizeAll()
            },
    });

    window_layout = $(window_selector).layout({
            resizable: true,
            closable: false,
            slidable: false,
            spacing_open: 0,
            spacing_closed: 0,
            north__paneSelector: '.window-title-bar',
            center__paneSelector: '.window-content',
            south__paneSelector: '.window-footer',
            south__size: footer_size,
            center__onresize: function() {
                if (window_content_layout) {
                    window_content_layout.resizeAll();
                }
            },
    });

    if (window_content_selector) {
        window_content_layout = $(window_content_selector).layout({
                resizable: false,
                closable: false,
                slidable: false,
                spacing_open: 0,
                spacing_closed: 0,
                north__paneSelector: '.window-content-top',
                center__paneSelector: '.window-content-main',
        });
    }

    return container_layout;
}

function init_search_box(box_id) {
    $(box_id).focusin(function() {
        $(this).parent().css({'border': '2px solid #5D8C0B'});
    });
    $(box_id).focusout(function() {
        $(this).parent().css({'border': '2px solid #A7A7A7'});
    });
}

function resize_search_box(box_id) {
    var w = $(box_id).parent().width();
    $(box_id).css({'width': w - 25});
}

function add_scroll(container_id) {
    var c = $(container_id);
    c.jScrollPane();
    var w = c.parent().parent().parent().width();
    var h = c.parent().parent().height();
    c.parent().css({'width': w, 'height': h});
    c.css({'width': w, 'height': h});
    c.jScrollPane();
}

function show_dialog(dialog_id, elem) {
    var offset = elem.offset();
    var width = elem.outerWidth();
    var height = elem.height();

    var dialog = $(dialog_id);
    var dheight = dialog.height();
    dialog.css({'top': offset.top - dheight, 'left': offset.left + width});
    dialog.fadeIn(300);
    $("#dialog-overlay").show();

    $(".collabnote-dialog-button").jacg({radius: '3px', start: '#FFFFFF', end: '#DDDDDD'});

    dialog.find(".btn-cancel").click(function() {
        dialog.fadeOut(500);
        $("#dialog-overlay").hide();
    });

    $("#dialog-overlay").click(function() {
        dialog.fadeOut(500);
        $("#dialog-overlay").hide();
    });
}

function show_center_dialog(dialog_id) {
    var dialog = $(dialog_id);

    var offset = $("#notebook-content").offset();
    var width = $("#notebook-content").outerWidth() - dialog.outerWidth();
    var height = $("#notebook-content").outerHeight() - dialog.outerHeight();

    dialog.css({'top': height / 2 + offset.top,
            'left': width / 2 + offset.left});
    dialog.show();
    $("#dialog-overlay").show();

    $(".collabnote-dialog-button").jacg({radius: '3px', start: '#FFFFFF', end: '#DDDDDD'});

    dialog.find(".btn-cancel").click(function() {
        dialog.hide();
        $("#dialog-overlay").hide();
    });

    $("#dialog-overlay").click(function() {
        dialog.hide();
        $("#dialog-overlay").hide();
    });
}

function show_yes_no_dialog(dialog_id, message) {
    var dialog = $(dialog_id);
    dialog.find("#yes_no_message").html(message);

    var offset = $("#notebook-content").offset();
    var width = $("#notebook-content").outerWidth() - dialog.outerWidth();
    var height = $("#notebook-content").outerHeight() - dialog.outerHeight();

    dialog.css({'top': height / 2 + offset.top,
            'left': width / 2 + offset.left});
    dialog.show();
    $("#dialog-overlay").show();

    $(".collabnote-dialog-button").jacg({radius: '3px', start: '#FFFFFF', end: '#DDDDDD'});

    dialog.find(".btn-cancel").click(function() {
        dialog.hide();
        $("#dialog-overlay").hide();
    });

    $("#dialog-overlay").click(function() {
        dialog.hide();
        $("#dialog-overlay").hide();
    });
}

function show_dialog_menu(menu_id, elem, drop) {
    var offset = elem.offset();
    var height = elem.outerHeight();

    var dialog = $(menu_id);
    dialog.css({'top': offset.top + height - 1, 'left': offset.left});
    dialog.show();
    $("#dialog-overlay").show();

    $(".collabnote-dialog-button").jacg({radius: '3px', start: '#FFFFFF', end: '#DDDDDD'});

    dialog.find(".collabnote-dialog-menu-item").click(function() {
        dialog.hide();
        $("#dialog-overlay").hide();
        if (drop) {
            dialog.removeClass("collabnote-dialog-h");
            elem.removeClass("collabnote-drop-down-menu");
        }
    });

    $("#dialog-overlay").click(function() {
        dialog.hide();
        $("#dialog-overlay").hide();
        if (drop) {
            dialog.removeClass("collabnote-dialog-h");
            elem.removeClass("collabnote-drop-down-menu");
        }
    });

    if (drop) {
        dialog.addClass("collabnote-dialog-h");
        elem.addClass("collabnote-drop-down-menu");
    }
}

function add_message (payload) {
    var message = payload.toString();
    $("#im-message-list-container").append("<div>" + message + "</div>");
}
