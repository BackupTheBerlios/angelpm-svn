package com.collabnote;

import com.vaadin.Application;
import com.vaadin.ui.HorizontalLayout;
import com.vaadin.ui.Label;
import com.vaadin.ui.MenuBar;
import com.vaadin.ui.VerticalLayout;
import com.vaadin.ui.Window;

public class CollabnoteApplication extends Application {
    @Override
    public void init() {
        setTheme("reindeer");

        Window mainWindow = new Window("Collabnote");

        VerticalLayout mainExpand = new VerticalLayout();
        mainWindow.setContent(mainExpand);
        mainWindow.setSizeFull();
        mainWindow.getContent().setSizeFull();

        HorizontalLayout topnav = new HorizontalLayout();
        topnav.setHeight("50px");
        topnav.setWidth("100%");
        Label label = new Label("collabnote");
        label.setHeight("40px");
        topnav.addComponent(label);
        mainExpand.addComponent(topnav);

        final MenuBar menubar = new MenuBar();
        menubar.setWidth("100%");
        MenuBar.MenuItem fileMenu = menubar.addItem("File", null, null);
        MenuBar.MenuItem editMenu = menubar.addItem("Edit", null, null);

        MenuBar.MenuItem newItem = fileMenu.addItem("New", null, null);

        mainExpand.addComponent(menubar);

        setMainWindow(mainWindow);
    }
}
