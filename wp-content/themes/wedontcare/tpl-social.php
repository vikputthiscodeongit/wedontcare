<?php
    // Template name: Social

    get_header();
?>

<div class="container container--align-center">
    <div class="row row--content-between">
        <?php
            $query_args = array(
                "post_type" => "entity",
                "post_status" => "publish",
                "posts_per_page" => 3,
                "order" => "ASC"
            );

            $the_query = new WP_Query($query_args);

            if ($the_query->have_posts()) {
                while ($the_query->have_posts()) {
                    $the_query->the_post();

                    $entity = get_field("entity");
                    // var_dump($entity);

                    $classes = "box box--4";

                    $id = $entity["id"];

                    if (!empty($id))
                        $classes .= " box--" . $id;

                    // Social
                    $social = $entity["social"];
                    // var_dump($social);

                    if (!empty($social)) {
                        $services = $social["service"];

                        foreach ($services as $service) {
                            $link = $service["url"];
                            $name = false;
                            $logo = false;

                            // Name
                            switch ($service["id"]) {
                                case "youtube":
                                    $name = "YouTube";

                                    break;
                                default:
                                    $name = ucwords($service["id"]);
                            }

                            // var_dump($name);

                            // Logo
                            $base_dir  = trailingslashit(THEME_DIR_PATH);
                            $dir       = "dist/images/static/social/";
                            $file_name = $service["id"] . "-white.png";
                            $files     = glob($base_dir . $dir . $file_name);
                            // var_dump($files);

                            if (count($files) === 1)
                                $logo = get_theme_file_uri($dir . basename($files[0]));

                            // var_dump($logo);
                            ?>
                            <div class="<?php echo $classes; ?>">
                                <?php
                                    if ($logo) {
                                        ?>
                                        <div class="media" style="--aspect-ratio: 1 / 1">
                                            <img src="<?php echo $logo; ?>" alt="<?php echo $name; ?> logo">

                                            <a class="stretched-link" href="<?php echo $link; ?>" target="_blank" rel="noopener"></a>
                                        </div>
                                        <?php
                                    }

                                    else if ($name) {
                                        ?>
                                        <span><?php echo $name; ?></span>
                                        <?php
                                    }
                                ?>
                            </div>
                            <?php
                        }
                    }
                }

                wp_reset_postdata();
            } else {
                ?>
                <div class="text text--center">
                    <p>Error message.</p>
                </div>
                <?php
            }
        ?>
    </div>
</div>

<?php get_footer(); ?>
