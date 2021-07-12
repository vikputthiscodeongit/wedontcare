<?php
    // Template name: Front page

    get_header();
?>

<div class="container container--rows-gap">
    <div class="row row--top">
        <nav class="fp-nav fp-nav--top">
            <div class="fp-nav__item">
                <a class="fp-nav__link text text--flashy" href="<?php echo SITE_URL; ?>/music/the-madness/" target="_self">The Madness!</a>
            </div>

            <div class="fp-nav__item">
                <a class="fp-nav__link" href="<?php echo SITE_URL; ?>/music/" target="_self">Music</a>
            </div>
        </nav>
    </div>

    <div class="row row--mid fp-content">
        <?php
            $content = get_field("landing_content");
        ?>
        <div class="media" style="--aspect-ratio: 1 / 1">
            <?php
                if (!empty($content)) {
                    $video = $content["video"];

                    $video_poster = $video["poster"]["url"];
                    $video_sources = $video["source"];

                    if (count($video_sources) > 0) {
                        ?>
                        <video
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

                            Media should be played here, but isn't available because your web browser sucks.
                        </video>

                        <span class="sr-only">
                            We Don't Care
                        </span>
                        <?php
                    }
                } else {
                    ?>
                    <span>Media should be played here, but isn't available at the moment.</span>
                    <?php
                }
            ?>
        </div>

        <?php echo do_shortcode('[contact-form-7 id="102" title="Mailing sign up"]'); ?>
    </div>

    <div class="row row--bottom">
        <nav class="fp-nav fp-nav--bottom">
            <div class="fp-nav__item">
                <a class="fp-nav__link" href="<?php echo SITE_URL; ?>/social/" target="_self">Social</a>
            </div>

            <div class="fp-nav__item">
                <a class="fp-nav__link" href="<?php echo SITE_URL; ?>/shows/" target="_self">Shows</a>
            </div>
        </nav>
    </div>
</div>

<?php get_footer(); ?>
