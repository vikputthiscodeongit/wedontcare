<?php
    // Template name: Social

    get_header();
?>

<div class="container container--flex container--center container--md-x-between">

<?php
    $query_args = array(
        "post_type" => "entity",
        "post_status" => "publish",
        "posts_per_page" => -1,
        "order" => "ASC"
    );

    $the_query = new WP_Query($query_args);

    if ($the_query->have_posts()) {
        ?>
        <ul class="services">
            <?php
                while ($the_query->have_posts()) {
                    $the_query->the_post();

                    $socials = get_field("social");
                    ?>
                    <li class="service">
                        <a href="" target="_blank" rel="noopener">
                            <span class="sr-only"><?php the_title(); ?></span>

                            <img src="" alt="">
                        </a>
                    </li>
                    <?php
                }
            ?>
        </ul>
    <?php

$social = get_field("options", "options")["social"];
var_dump($social);
        foreach($social as $entity) {
            if (empty(array_filter($entity))) {
                continue;
            }

            var_dump(key($entity));

            foreach($entity as $service) {
                if (empty($service)) {
                    continue;
                }

                $service = key($entity);

                switch($service) {
                    case "YouTube":
                        $service = "YouTube";
                    default:
                        ucwords($service);
                }

                $logo = wp_get_attachment_image($social["logo"], "full", false, array("loading" => false));

                $link = $social["link"];
                ?>
                <div class="box box--<?php echo $service; ?> box--md-4">
                    <div class="media media--filter media--filter-grayscale">
                        <?php echo $logo; ?>

                        <a class="stretched-link" href="<?php echo $link; ?>" target="_self"></a>
                    </div>
                </div>
                <?php
            }
        }
    ?>
</div>

<?php get_footer(); ?>
