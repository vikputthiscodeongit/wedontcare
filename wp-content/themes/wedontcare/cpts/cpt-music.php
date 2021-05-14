<?php
    function init_cpt_music() {
        register_post_type(
            "music",
            array(
                "labels"       => array(
                    "name"          => __("Music", "wdc"),
                    "singular_name" => __("Music", "wdc")
                ),
                "public"       => true,
                "show_in_rest" => true,
                "supports"     => array(
                    "title",
                    "editor",
                    "thumbnail"
                ),
                "rewrite"      => array(
                    "slug"       => "music",
                    "with_front" => false
                )
            )
        );
    }
    add_action("init", "init_cpt_music");

    function init_cpt_music_tax_type() {
        register_taxonomy(
            "music_type",
            "music",
            array(
                "labels"       => array(
                    "name"          => _x("Music types", "taxonomy general name"),
                    "singular_name" => _x("Music type", "taxonomy singular name")
                ),
                "description"  => "Music type",
                "public"       => true,
                "show_in_rest" => true,
            )
        );
   }
   add_action("init", "init_cpt_music_tax_type");
