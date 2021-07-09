<?php
    // Template name: Shows

    get_header();
?>

<div class="container container--align-center">
    <div class="row">
        <div class="section-title text text--center">
            <h1>Shows</h1>
        </div>
    </div>

    <div class="row">
        <?php
            $query_args = array(
                "post_type" => "show",
                "post_status" => "publish",
                "posts_per_page" => -1,
                "order" => "ASC"
            );

            $the_query = new WP_Query($query_args);
        ?>
        <ul class="shows">
            <?php
                $shows_shown = false;

                if ($the_query->have_posts()) {
                    while ($the_query->have_posts()) {
                        $the_query->the_post();

                        $attrs = get_field("show_attrs");
                        // var_dump($attrs);

                        // Date
                        $date_current = idate("U");
                        $date_show = strtotime($attrs["date"]);
                        $date_hidden = $date_show + 86000 + 43200;
                        // var_dump($date_current);
                        // var_dump($date_show);
                        // var_dump($date_hidden);

                        if ($date_current > $date_hidden) {
                            continue;
                        }

                        $shows_shown = true;

                        $date_pretty = date("d M", $date_show);

                        // Tag
                        $tag_open = "span class='show__item'";
                        $tag_close = "span";

                        if (!empty($attrs["url"])) {
                            $tag_open = "a class='show__item' href='" . $attrs["url"] . "' target='_blank' rel='noopener'";
                            $tag_close = "a";
                        }
                        ?>
                        <li class="show">
                            <<?php echo $tag_open; ?>>
                                <time datetime="<?php echo $date_show; ?>"><?php echo $date_pretty; ?></time>
                                <span class="seperator"> - </span>
                                <span><?php echo $attrs["venue"]; ?></span>
                            </<?php echo $tag_close; ?>>
                        </li>
                        <?php
                        wp_reset_postdata();
                    }
                }

                if (!$shows_shown) {
                    ?>
                    <li class="show">
                        <span class="show__item">
                            <span>TBA</span>
                        </span>
                    </li>
                    <?php
                }
            ?>
        </ul>
    </div>
</div>

<?php get_footer(); ?>
