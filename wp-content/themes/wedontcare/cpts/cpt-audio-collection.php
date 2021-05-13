<?php
    function init_cpt_audio_collection() {
        register_post_type("audio_collection",
            array(
                "labels" => array(
                    "name"          => __("Audio collections", "wdc"),
                    "singular_name" => __("Audio collection", "wdc")
                ),
                "public"       => true,
                "show_in_rest" => true,
                "supports"     => array(
                    "title",
                    "editor",
                    "thumbnail"
                ),
                "rewrite"      => array(
                    "slug" => "collections",
                    "with_front" => false
                )
            )
        );
    }
    add_action("init", "init_cpt_audio_collection");
