var submenu_open = {'p': null,
'submenu': null};
var opened_context_menu = null;

function get_iframe (id) {
if (document.getElementById(id).contentDocument) {
    return document.getElementById(id).contentDocument;
} else {
    return document.frames[id].document;
}
}

function setup_context_menu (container, context_menu) {
$(container).bind("contextmenu", function(evt) {
    $(context_menu).find(".collab-menuitem").hover(function() {
        $(this).addClass("collab-menuitem-hover");
    },
    function() {
        $(this).removeClass("collab-menuitem-hover");
    });

    $(context_menu).find(".collab-menuitem").click(function() {
        $(context_menu).hide();
        $("#dialog-overlay").hide();
    });

    opened_context_menu = $(context_menu);
    return open_context_menu(context_menu, evt);
    });
}

function open_context_menu(context_menu, evt) {
    var offset = $("iframe#collab-editor-iframe").offset();
    $(context_menu).css({'left': evt.pageX + offset.left,
            'top': evt.pageY + offset.top});
    $(context_menu).show();

    $("#dialog-overlay").show();
    $("#dialog-overlay").click(function() {
        $("#dialog-overlay").hide();
        $(context_menu).hide();
    });
    return false;
}

function load_editor_iframe(iframe, url, callback) {
    iframe.attr("src", url);
    iframe.load(callback);
}

function init_editor_toolbar(tool_bar_id) {
    var tool_bar = $(tool_bar_id);

    tool_bar.jacg({radius: '0px', start: '#FAFAFA',
            end: '#E5E5E5'});
    tool_bar.find(".collab-toolbar-button").hover(function() {
        $(this).addClass("collab-toolbar-button-hover");
    },
    function() {
        $(this).removeClass("collab-toolbar-button-hover");
    });

    tool_bar.find(".collab-toolbar-button").mousedown(function() {
        $(this).addClass("collab-toolbar-button-active");
    });
    tool_bar.find(".collab-toolbar-button").mouseup(function() {
        $(this).removeClass("collab-toolbar-button-active");
    });
    tool_bar.find(".collab-toolbar-button").mouseleave(function() {
        $(this).removeClass("collab-toolbar-button-active");
    });

    tool_bar.find(".collab-toolbar-menu-button").hover(function() {
        $(this).addClass("collab-toolbar-menu-button-hover");
    },
    function() {
        $(this).removeClass("collab-toolbar-menu-button-hover");
    });

    tool_bar.find(".collab-toolbar-menu-button").mousedown(function() {
        $(this).toggleClass("collab-toolbar-menu-button-active");
    });

    tool_bar.find(".collab-toolbar-toggle-button").mousedown(function() {
        $(this).toggleClass("collab-toolbar-button-checked");
    });
}

function init_editor_menubar (menu_bar_id) {
    var menu_bar = $(menu_bar_id);

    menu_bar.find(".collab-toolbar-menu-button").hover(function() {
        $(this).addClass("collab-toolbar-menu-button-hover");
    },
    function() {
        $(this).removeClass("collab-toolbar-menu-button-hover");
    });

    menu_bar.find(".collab-toolbar-menu-button").click(function() {
        $(this).toggleClass("collab-toolbar-menu-button-active");
    });

    attach_menu("#file-menu", "#file-menu-content");
    attach_menu("#edit-menu", "#edit-menu-content");
    attach_menu("#view-menu", "#view-menu-content");
    attach_menu("#insert-menu", "#insert-menu-content");
    attach_menu("#format-menu", "#format-menu-content");
    attach_menu("#table-menu", "#table-menu-content");
    attach_menu("#help-menu", "#help-menu-content");

    attach_submenu("#file-menu", "#file-menu-content",
        "#mi-new", "#file-new-submenu");
    attach_submenu("#file-menu", "#file-menu-content",
        "#mi-download", "#file-download-submenu");
}

function attach_submenu(parent_menu_link, parent_menu,
    menu_link_id, menu_content_id) {
    $(menu_link_id).hover(function() {
        $(this).addClass("collab-menuitem-open");

        var offset = $(this).offset();
        var w = $(this).outerWidth();
        $(menu_content_id).css({'left': offset.left + w,
                'top': offset.top});

        $(menu_content_id).show();
        setup_submenu(parent_menu_link, parent_menu,
            menu_link_id, menu_content_id);

        submenu_open.p = menu_link_id;
        submenu_open.submenu = menu_content_id;

        $("#dialog-overlay").show();
        $("#dialog-overlay").click(function() {
            $(menu_link_id).removeClass("collab-menuitem-open");
            $(menu_content_id).hide();
            $(this).hide();
        });
    },
    function() {
    });
}

function setup_submenu (parent_menu_link, parent_menu,
    menu_link_id, menu_id) {
    $(menu_id).find(".collab-menuitem").hover(function() {
        $(this).addClass("collab-menuitem-hover");
    },
    function() {
        $(this).removeClass("collab-menuitem-hover");
    });

    $(menu_id).find(".collab-menuitem").each(function() {
        setup_editor_submi(parent_menu_link, parent_menu,
            this, menu_link_id);
    });
}

function setup_editor_submi (parent_menu_link, parent_menu,
    item_id, menu_link_id) {
    $(item_id).click(function() {
        $(this).parent().hide();
        $(parent_menu_link).removeClass("collab-toolbar-menu-button-active");
        $(parent_menu).hide();
        $(menu_link_id).removeClass("collab-menuitem-open");
        $("#dialog-overlay").hide();
    });
}

function attach_menu (menu_id, menu_content) {
    $(menu_id).click(function() {
        var offset = $(this).offset();
        var h = $("#notebook-menu-bar").outerHeight();
        $(menu_content).css({'left': offset.left,
                'top': offset.top + h});

        $(menu_content).show();
        setup_menu(menu_id, menu_content);

        $("#dialog-overlay").show();
        $("#dialog-overlay").click(function() {
            $(menu_id).removeClass("collab-toolbar-menu-button-active");
            $(menu_content).hide();
            $(this).hide();
        });
    });
}

function setup_menu (menu_link_id, menu_id) {
    $(menu_id).find(".collab-menuitem").hover(function() {
        $(this).addClass("collab-menuitem-hover");
        if (submenu_open.submenu != null && submenu_open.p != "#" + $(this).attr("id")) {
            $(submenu_open.p).removeClass("collab-menuitem-open");
            $(submenu_open.submenu).hide();
        }
    },
    function() {
        $(this).removeClass("collab-menuitem-hover");
    });

    $(menu_id).find(".collab-menuitem").each(function() {
        setup_editor_mi(this, menu_link_id);
    });
}

function setup_editor_mi (item_id, menu_link_id) {
    $(item_id).click(function() {
        if (!$(this).hasClass("collab-submenu")) {
            $(this).parent().hide();
            $(menu_link_id).removeClass("collab-toolbar-menu-button-active");
            $("#dialog-overlay").hide();
        }
    });
}
