<?php
    // Template name: Landing

    get_header();
?>

<div class="container container--grid container--center">
    <div class="nav-item">
        <a class="nav-link text text--flashy" href="<?php echo get_site_url(); ?>/music/the-madness/" target="_self">The Madness!</a>
    </div>

    <div class="nav-item">
        <a class="nav-link" id="nav-link-latest" href="<?php echo get_site_url(); ?>/music" target="_self">Music</a>
    </div>

    <div class="nav-item">
        <a class="nav-link" href="https://www.youtube.com/channel/UCpj7LYWgu-L0JvmcjKiRCvQ" target="_blank" rel="noopener">YouTube</a>
    </div>

    <div class="nav-item">
        <a class="nav-link" href="https://www.instagram.com/growngeorge/" target="_blank" rel="noopener">Instagram</a>
    </div>

    <?php
        $content = get_field("landing_content");
        // var_dump($content);
    ?>
    <section class="content">
        <?php
            if (!empty($content)) {
                $video = $content["video"];

                $video_sources = $video["source"];

                if (count($video_sources) > 0) {
                ?>
                <div class="spinning-logo">
                    <video
                        class="video"
                        autoplay
                        controls
                        disablePictureInPicture
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
            // Check before doing it
            echo do_shortcode('[contact-form-7 id="102" title="Mailing sign up"]');
        ?>
    </section>
</div>

<?php get_footer(); ?>
