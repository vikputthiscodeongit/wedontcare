<?php
    function init_cpt_entity() {
        register_post_type(
            "entity",
            array(
                "labels"       => array(
                    "name"          => __("Entities", "wdc"),
                    "singular_name" => __("Entity", "wdc")
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
    add_action("init", "init_cpt_entity");
