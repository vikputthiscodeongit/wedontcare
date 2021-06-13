<?php
    // Template name: Landing

    get_header();
?>

<div class="container container--grid container--center">
    <div class="nav-item">
        <a class="nav-link text text--flashy" href="<?php echo SITE_URL; ?>/music/the-madness/" target="_self">The Madness!</a>
    </div>

    <div class="nav-item">
        <a class="nav-link" href="<?php echo SITE_URL; ?>/music/" target="_self">Music</a>
    </div>

    <div class="nav-item">
        <a class="nav-link" href="<?php echo SITE_URL; ?>/social/" target="_self">Social</a>
    </div>

    <div class="nav-item">
        <a class="nav-link" href="<?php echo SITE_URL; ?>/shows/" target="_self">Shows</a>
    </div>

    <?php
        $content = get_field("landing_content");
        // var_dump($content);
    ?>
    <section class="content">
        <?php
            if (!empty($content)) {
                $video = $content["video"];

                $video_poster = $video["poster"]["sizes"]["medium"];
                $video_sources = $video["source"];

                if (count($video_sources) > 0) {
                    ?>
                    <div class="spinning-logo">
                        <video
                            class="video"
                            poster="<?php echo $video_poster; ?>"
                            autoplay
                            controls
                            disablePictureInPicture
                            disableRemotePlayback
                            loop
                            muted
                            playsinline
                        >
                            <?php
                                foreach ($video_sources as $source) {
                                    $file = $source["file"];
                                    // var_dump($file);

                                    $file_src = $file["url"];
                                    $file_type = $file["mime_type"];
                                    ?>
                                    <source src="<?php echo $file_src; ?>" type="<?php echo $file_type; ?>">
                                    <?php
                                }
                            ?>

                            Your browser sucks and does not support awesomeness.
                        </video>

                        <span class="sr-only">
                            We Don't Care
                        </span>
                    </div>
                    <?php
                }
            }
        ?>

        <?php
            echo do_shortcode('[contact-form-7 id="102" title="Mailing sign up"]');
        ?>
    </section>
</div>

<?php get_footer(); ?>
