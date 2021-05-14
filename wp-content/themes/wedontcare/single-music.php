<?php
    get_header();

    $attrs = get_field("music_attrs");
?>

<div class="container container--grid">
    <?php
        $artwork = get_the_post_thumbnail($post->ID, "full", array("loading" => false));
        // var_dump($artwork);
    ?>
    <div class="media" style="--aspect-ratio: 1/1;">
        <?php echo $artwork; ?>
    </div>

    <div class="streaming">
        <?php
            $logo = $attrs["logo"];
            $logo = wp_get_attachment_image($logo["ID"], "small", false, array("class" => "streaming__logo", "loading" => false));
            // var_dump($logo);

            if (!empty($logo)) {
                ?>
                <div class="streaming__top">
                    <?php echo $logo; ?>
                </div>
                <?php
            }
        ?>

        <?php
            $services = get_field("music_streaming_services");
            var_dump($services);

            if (!empty($services)) {
                ?>
                <div class="streaming__main">
                    <ul class="services">
                        <?php
                            foreach ($services as $service => $url) {
                                $logo_file_name = str_replace("_", "-", $service);
                                var_dump($logo_file_name);
                                // $fileSearch = "God_of_War";
                                // $files = glob("/path/*" . $fileSearch . "*");

                                // if(count($files) > 0) echo "File Exists!";

                                $name_pretty = str_replace("_", " ", $service);
                                $name_pretty = ucwords($name_pretty);

                                if ($name_pretty === "Youtube")
                                    $name_pretty = "YouTube";

                                var_dump($name_pretty, $url);

                                if (empty($url))
                                    continue;
                                ?>
                                <li class="service">
                                    <a class="service__link" href="#" target="_blank" rel="noopener">
                                        <div class="service__logo">
                                            <img src="https://via.placeholder.com/240x60" alt="">
                                        </div>

                                        <div class="service__name sr-only">
                                            <span>Streaming service</span>
                                        </div>
                                    </a>
                                </li>
                                <?php
                            }
                        ?>
                    </ul>
                </div>
                <?php
            }
        ?>
    </div>

    <?php
        $bg = $attrs["bg"];
        $bg = wp_get_attachment_image($bg["ID"], "full");
        // var_dump($bg);
    ?>
</div>

<?php get_footer(); ?>
