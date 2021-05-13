<?php
    // Template name: Music overview

    get_header();
?>

<?php
    $query_args = array(
        "post_type" => "audio_collection",
        "post_status" => "publish",
        "posts_per_page" => 3
    );

    $the_query = new WP_Query($query_args);

    if ($the_query->have_posts()) {
        ?>
        <div class="container container--flex container--center container--md-x-between">
            <?php
                while ($the_query->have_posts()) {
                    $the_query->the_post();

                    $attrs = get_field("audio_collection_attrs");

                    if (empty($attrs["id"])) {
                        continue;
                    }

                    // var_dump($attrs);

                    $id = $attrs["id"];
                    $artwork = get_the_post_thumbnail($post->ID, "medium");
                    $link = get_permalink();
                    // var_dump($id, $artwork, $link);
                    ?>
                        <div class="box box--<?php echo $id; ?> box--md-4">
                            <div class="media media--filter media--filter-grayscale">
                                <div class="aspect-ratio aspect-ratio--square">
                                    <div class="content">
                                        <?php echo $artwork; ?>
                                    </div>
                                </div>

                                <a class="stretched-link" href="<?php echo $link; ?>" target="_self"></a>
                            </div>
                        </div>
                    <?php
                }

                wp_reset_postdata();
            ?>
        </div>
        <?php
    }
?>

<?php get_footer(); ?>
