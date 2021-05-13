<?php
    function init_cpt_audio_single() {
        register_post_type("audio_single",
            array(
                "labels" => array(
                    "name"          => __("Singles", "wdc"),
                    "singular_name" => __("Single", "wdc")
                ),
                "public"       => true,
                "show_in_rest" => true,
                "supports"     => array(
                    "title",
                    "editor",
                    "thumbnail"
                ),
                "rewrite"      => array(
                    "slug" => "singles",
                    "with_front" => false
                )
            )
        );
    }
    add_action("init", "init_cpt_audio_single");
