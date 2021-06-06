<?php
    // Template name: Shows

    get_header();
?>

<div class="container container--flex container--center">
    <h1>Shows</h1>

    <?php
        $shows = get_field("shows")["show"];
        // var_dump($shows);
    ?>
    <?php
        if ($shows) {
            foreach($shows as $show) {
                // var_dump($show);

                $date_raw = $show["date"];
                $date_pretty = date("d M", strtotime($show["date"]));
                ?>
                <div class="show">
                    <a class="show__link" href="<?php echo $show["url"]; ?>" target="_blank" rel="noopener">
                        <time datetime="<?php echo $date_raw; ?>"><?php echo $date_pretty; ?></time>
                        <span class="seperator"> - </span>
                        <span><?php echo $show["venue"]; ?></span>
                    </a>
                </div>
                <?php
            }
        }
    ?>
</div>

<?php get_footer(); ?>
