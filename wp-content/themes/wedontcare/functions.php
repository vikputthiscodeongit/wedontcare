<?php
    //
    // Define constants
    define("THEME_DIR", get_template_directory_uri());
    define("THEME_DIR_PATH", get_template_directory());
    define("SITE_URL", get_site_url());


    // Post types
    include "cpts/cpt-entity.php";
    include "cpts/cpt-music.php";
    include "cpts/cpt-show.php";


    //
    // Update WordPress's is_email() to comply with the RFC 5322 specification.
    function is_valid_email($is_email, $email, $context) {
        $is_email = false;

        // Use a RegEx instead of FILTER_VALIDATE_EMAIL because FILTER_VALIDATE_EMAIL validates email addresses against the superseded RFC 822 specification. See also https://stackoverflow.com/a/201378/6396604 & https://emailregex.com/.
        // Don't put the RegEx in a variable to prevent my editor's syntax highlighting from going bananas.
        if (preg_match('/^(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){255,})(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){65,}@)(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22))(?:\.(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-[a-z0-9]+)*)|(?:\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\]))$/iD', $email)) {
            $is_email = true;
        }

        return $is_email;
    }
    add_filter("is_email", "is_valid_email", 99, 3);


    //
    // Updates
    add_filter("auto_update_theme", "__return_true");


    //
    // Disable XML-RPC - https://www.scottbrownconsulting.com/2020/03/two-ways-to-fully-disable-wordpress-xml-rpc/
    function remove_xmlrpc_methods($methods) {
        return array();
    }
    add_filter("xmlrpc_methods", "remove_xmlrpc_methods");


    //
    // https://www.dev4press.com/blog/wordpress/2015/canonical-redirect-problem-and-solutions/
    // function disable_canonical_redirects() {
    //     remove_action("template_redirect", "redirect_canonical");
    // }
    // add_action("after_setup_theme", "disable_canonical_redirects");


    //
    //
    function edit_wp_head() {
        remove_action("wp_head", "rsd_link");
        remove_action("wp_head", "wlwmanifest_link");
        remove_action("wp_head", "wp_generator");
    }
    add_action("after_setup_theme", "edit_wp_head");


    //
    //
    function add_theme_features() {
        add_theme_support("post-thumbnails");
        add_theme_support("automatic-feed-links");
        add_theme_support("html5", array("comment-form", "comment-list", "gallery", "caption"));
        add_theme_support("title-tag");
    }
    add_action("after_setup_theme", "add_theme_features");


    //
    // Add extra MIME types
    function extra_mime_types($mimes) {
        $mimes["svg"] = "image/svg";
        $mimes["webp"] = "image/webp";

        return $mimes;
    }
    add_filter("upload_mimes", "extra_mime_types");


    //
    // Remove default image sizes
    function remove_image_sizes() {
        remove_image_size("1536x1536");
    }
    add_action("init", "remove_image_sizes");


    //
    // Add extra image sizes
    function add_image_sizes() {
        add_image_size("small", 360, 360);
    }
    add_action("after_setup_theme", "add_image_sizes");


    //
    // Remove links from admin bar
    function remove_admin_bar_links() {
        global $wp_admin_bar;

        // WordPress Core
        $wp_admin_bar->remove_menu("wp-logo"); // WordPress logo & its sub-menu items
        $wp_admin_bar->remove_menu("new-user"); // New - user
    }
    add_action("wp_before_admin_bar_render", "remove_admin_bar_links", 999);


    //
    // Hide admin bar on the front end
    add_filter("show_admin_bar", "__return_false");


    //
    // Remove meta boxes from the editor
    function remove_meta_boxes() {
        remove_post_type_support("page", "page-attributes");
    }
    add_action("init", "remove_meta_boxes");


    //
    // Register custom styles & scripts
    function add_styles_scripts() {
        $style_version = date("Ymd_His", filemtime(plugin_dir_path(__FILE__) . "/dist/css/style.css"));
        $bundle_version  = date("Ymd_His", filemtime(plugin_dir_path(__FILE__) . "/dist/js/bundle-main.js"));

        wp_enqueue_style("style", THEME_DIR . "/dist/css/style.css", false, $style_version);
        wp_enqueue_script("bundle#defer", THEME_DIR . "/dist/js/bundle-main.js", false, $bundle_version);
    }
    add_action("wp_enqueue_scripts", "add_styles_scripts");


    //
    // Add async/defer attribute to custom scripts - https://stackoverflow.com/a/40553706, somewhat modified.
    if (!is_admin()) {
        function add_async_defer_attribute($tag, $handle) {
            if (
                strpos($handle, "async") ||
                strpos($handle, "defer")
            ) {
                if (strpos($handle, "async")) {
                    return str_replace("<script ", "<script async ", $tag);
                }
                if (strpos($handle, "defer")) {
                    return str_replace("<script ", "<script defer ", $tag);
                }
            } else {
                return $tag;
            }
        }
        add_filter("script_loader_tag", "add_async_defer_attribute", 10, 2);
    }


    //
    // Add classes to <body>
    function add_body_classes($classes) {
        if (
            is_front_page() ||
            is_page_template("tpl-music-overview.php") ||
            is_page_template("tpl-shows.php") ||
            is_page_template("tpl-social.php")
        ) {
            $classes[] = "cover-fullvh";
        }

        if (is_front_page()) {
            array_push($classes, "cover-fullvh--fixed-min", "covers-fullvh");
        }

        if (
            is_page_template("tpl-music-overview.php") ||
            is_page_template("tpl-shows.php") ||
            is_page_template("tpl-social.php")
        ) {
            $classes[] = "cover-fullvh--dynamic";
        }

        if (is_page_template("tpl-music-overview.php")) {
            $classes[] = "bg-light";
        }

        return $classes;
    }
    add_filter("body_class", "add_body_classes");


    //
    // Grant users with editor role access to Flamingo submissions
    function change_flamingo_user_rights($meta_caps) {
        $meta_caps = array_merge($meta_caps, array(
            "flamingo_edit_inbound_message" => "edit_pages",
            "flamingo_edit_inbound_messages" => "edit_pages"
        ));

        return $meta_caps;
    }
    add_filter("flamingo_map_meta_cap", "change_flamingo_user_rights");


    //
    // Only load WPCF7 assets when needed
    add_filter("wpcf7_load_css", "__return_false");
    add_filter("wpcf7_load_js", "__return_false");

    function load_wpcf7_scripts() {
        if (is_front_page()) {
            wpcf7_enqueue_styles();
            wpcf7_enqueue_scripts();
        }
    }
    add_action("wp_enqueue_scripts", "load_wpcf7_scripts");
