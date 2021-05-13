<?php
  // Calculate some dates
  $date_current = strtotime("now");
  $date_clear   = mktime(0, 0, 0, 5, 14, 2020);
  // var_dump($date_current);
  // var_dump($date_clear);

  $clear = $date_current > $date_clear ? true : false;
  // var_dump($clear);
?>

<?php include "header.php"; ?>

<script>
  // Calculate some dates
  const album = {};

  album.currentDate = new Date(),
  album.releaseDate = new Date(2020, 10, 27, 0, 0, 0);

  album.released = album.currentDate > album.releaseDate ? true : false;
</script>

<?php
  if (!$clear) {
    ?>
    <noscript>
      <p>This page requires JavaScript.</p>
    </noscript>

    <script>
      (function() {
        if (!album.released) {
          window.location.href = "https://www.wedontca.re/music";
        }
      })();
    </script>
    <?php
  }
?>

<div class="container container--grid">
    <?php
        // $artwork = get_the_post_thumbnail($post->ID, )
        // $logo = $attrs["logo"];
        // $logo_el = wp_get_attachment_image($logo["ID"], "small", false, array("loading" => false));
        // $bg = $attrs["bg"];
        // var_dump($logo, $bg);
    ?>
    <div class="media">
        <div class="aspect-ratio aspect-ratio--square">
            <div class="content">
                <img src="https://via.placeholder.com/800x800" alt="'The Madness!' artwork">
            </div>
        </div>
    </div>

    <div class="streaming">
        <div class="streaming__top">
            <img src="https://via.placeholder.com/300x60" alt="'The Madness!' logo">
        </div>

        <div class="streaming__main">
            <ul class="services">
                <li class="service">
                    <a class="service__link" href="#" target="_blank" rel="noopener">
                        <div class="service__logo">
                            <img src="https://via.placeholder.com/240x60" alt="">
                        </div>

                        <div class="service__name sr-only">
                            <span>Streaming service</span>
                        </div>
                    </a>
                </li>

                <li class="service">
                    <a class="service__link" href="#" target="_blank" rel="noopener">
                        <div class="service__logo">
                        <img src="https://via.placeholder.com/240x60" alt="">
                        </div>

                        <div class="service__name sr-only">
                        <span>Streaming service</span>
                        </div>
                    </a>
                </li>

                <li class="service">
                    <a class="service__link" href="#" target="_blank" rel="noopener">
                        <div class="service__logo">
                        <img src="https://via.placeholder.com/240x60" alt="">
                        </div>

                        <div class="service__name sr-only">
                        <span>Streaming service</span>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>

<?php include "footer.php"; ?>
