<?php
    // Template name: Shows

    get_header();
?>

<div class="container container--flex container--center">
    <h1>Shows</h1>

    <?php
        $query_args = array(
            "post_type" => "show",
            "post_status" => "publish",
            "posts_per_page" => -1,
            "order" => "ASC"
        );

        $the_query = new WP_Query($query_args);

        if ($the_query->have_posts()) {
            ?>
            <ul class="show__list">
                <?php
                    while ($the_query->have_posts()) {
                        $the_query->the_post();

                        $attrs = get_field("show_attrs");
                        // var_dump($attrs);

                        // Date
                        $date_show = strtotime($attrs["date"]) + 86400;
                        $date_hidden = idate("U") + 43200;
                        // var_dump($date_show);
                        // var_dump($date_hidden);

                        if ($date_hidden > $date_show) {
                            continue;
                        }

                        $date_pretty = date("d M", strtotime($attrs["date"]));

                        // Tag
                        $tag_open = "span class='show'";
                        $tag_close = "span";

                        if (!empty($attrs["url"])) {
                            $tag_open = "a class='show' href='" . $attrs["url"] . "' target='_blank' rel='noopener'";
                            $tag_close = "a";
                        }
                        ?>
                        <li class="show__item">
                            <<?php echo $tag_open; ?>>
                                <time datetime="<?php echo $date_show; ?>"><?php echo $date_pretty; ?></time>
                                <span class="seperator"> - </span>
                                <span><?php echo $attrs["venue"]; ?></span>
                            </<?php echo $tag_close; ?>>
                        </li>
                        <?php
                    }

                    wp_reset_postdata();
                ?>
            </ul>
            <?php
        }
    ?>
</div>

<?php get_footer(); ?>
