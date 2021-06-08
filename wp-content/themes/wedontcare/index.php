<?php get_header(); ?>

<div class="container container--flex container--center">
    <div class="message" style="text-align: center;">
        <?php
            $previous_page = false;

            if (isset($_SERVER["HTTP_REFERER"])) {
                $previous_page = $_SERVER["HTTP_REFERER"];
            }

            $mailto_href = "mailto:webmaster@wedontcaregroup.com?subject=I landed on the index.php page on wedontca.re";

            if ($previous_page) {
                $mailto_href .= "The page I visited before I arrived on index.php was" . $previous_page . ".";
            }
        ?>

        <p>
            If you're seeing this page, something went wrong.
        </p>

        <p>
            <a href="<?php echo $mailto_href; ?>" target="_blank" rel="noopener">Please let me know about this error by clicking here.</a><br>
            You don't have to compose a message yourself, just hit the send-button :).
        </p>

        <a href="<?php echo SITE_URL; ?>" target="_self">Return to the home page</a>
    </div>
</div>

<?php get_footer(); ?>
