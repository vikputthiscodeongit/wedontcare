<?php
    get_header();

    $attrs = get_field("music_attrs");

    $id = $attrs["id"];
?>

<div class="container container--grid container--lg-x-center">
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
            // var_dump($services);

            if (!empty($services)) {
                ?>
                <div class="streaming__main">
                    <ul class="services">
                        <?php
                            foreach ($services as $service => $url) {
                                // URL
                                if (empty($url))
                                    continue;

                                // var_dump($url);

                                // Name
                                $name_pretty = str_replace("_", " ", $service);
                                $name_pretty = ucwords($name_pretty);

                                if ($name_pretty === "Youtube")
                                    $name_pretty = "YouTube";

                                // var_dump($name_pretty);

                                // Logo
                                $logo = false;

                                $base_dir = trailingslashit(THEME_DIR_PATH);
                                $dir      = "dist/images/static/streaming/";
                                $pattern  = str_replace("_", "-", $service);
                                $logo_versions = glob($base_dir . $dir . $pattern . "*");
                                // var_dump($logo_versions);

                                if (count($logo_versions) > 0) {
                                    if (count($logo_versions) === 1) {
                                        $logo = get_theme_file_uri($dir . basename($logo_versions[0]));
                                    } else {
                                        $colors = ["color", "black", "white"];

                                        foreach ($colors as $color) {
                                            if ($logo)
                                                break;

                                            foreach ($logo_versions as $logo_version) {
                                                if ($logo)
                                                    break;

                                                if (strpos($logo_version, $color))
                                                    $logo = get_theme_file_uri($dir . basename($logo_version));
                                            }
                                        }
                                    }
                                }

                                // var_dump($logo);
                                ?>
                                <li class="service">
                                    <a class="service__link" href="<?php echo $url; ?>" target="_blank" rel="noopener">
                                        <?php
                                            if ($logo) {
                                                ?>
                                                <div class="service__logo">
                                                    <img src="<?php echo $logo; ?>" alt="">
                                                </div>
                                                <?php
                                            }
                                        ?>

                                        <?php
                                            $classes = "service__name";

                                            if (!$logo)
                                                $classes += " is-visible";
                                        ?>
                                        <div class="<?php echo $classes; ?>">
                                            <span><?php echo $name_pretty; ?></span>
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
        $bg = wp_get_attachment_image($bg["ID"], "full", false, array("loading" => false));
        // var_dump($bg);
    ?>
    <div class="background">
        <?php echo $bg; ?>
    </div>
</div>

<?php get_footer(); ?>
