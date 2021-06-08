<?php
    function init_cpt_show() {
        register_post_type(
            "show",
            array(
                "labels"       => array(
                    "name"          => __("Shows", "wdc"),
                    "singular_name" => __("Show", "wdc")
                ),
                "show_ui"      => true,
                "show_in_rest" => true,
                "supports"     => array(
                    "title",
                    "thumbnail"
                ),
                "rewrite"      => array(
                    "with_front" => false
                )
            )
        );
    }
    add_action("init", "init_cpt_show");
