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

<div class="box box--wide">
  <div class="media">
    <div class="aspect-ratio aspect-ratio--square">
      <div class="content">
        <img src="media/3_tm/tm_artwork.jpg" alt="'The Madness!' artwork">
      </div>
    </div>
  </div>
</div>

<div class="box box--small">
  <div class="streaming">
    <div class="streaming__top">
      <img src="media/3_tm/tm_logo.png" alt="'The Madness!' logo">
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

<ul class="stream-grid" aria-label="Stream 'Long Nights, Cold Nights' now!">
  <?php
    $file = file_get_contents("streaming_services.json");

    if ($file) {
      $data = json_decode($file, true);
      // var_dump($data);

      foreach ($data as $tile) {
        $tile_class = strtolower(str_replace(" ", "-", $tile["name"]));
        $tile_link  = !empty($tile["albumUrl"]) ? $tile["albumUrl"] : $tile["profileUrl"];

        if (!empty($tile_link)) {
          $tag_open  = "a class='stream-grid__tile stream-grid__tile--" . $tile_class . "' href='" . $tile_link . "' target='_blank' rel='noopener'";
          $tag_close = "a";
        } else {
          $tag_open  = "span class='stream-grid__tile stream-grid__tile--" . $tile_class . "'";
          $tag_close = "span";
        }
        ?>
        <li>
          <<?php echo $tag_open; ?>>
            <span class="sr-only"><?php echo $tile["name"]; ?></span>
          </<?php echo $tag_close; ?>>
        </li>
        <?php
      }
    }
  ?>
</ul>

<?php include "footer.php"; ?>
