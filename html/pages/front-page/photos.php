<?php

  $images_list = array();
  $unique_filenames = array();

  echo __DIR__;

  foreach(glob('./images-build/photo-stream/*.*') as $filename){
     $images_list[] = $filename;
  }

  $previous_filename = "";

  foreach($images_list as &$image) {

    $instances_of_original = substr_count($image, 'original');

    if ($image != $previous_filename && $instances_of_original == 1) {

        $index_of_original = strrpos($image, '-original');
        $length_of_original = strlen(substr($image, $index_of_original, strlen($image)));
        $filename_start = strrpos($image, '/', -1);
        $filename_length = strlen($image);

        $unique_filenames[] = substr($image, $filename_start, $filename_length - $length_of_original - $filename_start);
    }

    $previous_filename = $image;

  }

  $srcset_list = array();

  for ($i = 0; $i < count($unique_filenames); $i++) {

    $previous_width = "";

    $srcset_list[$i] = array();

    foreach(glob('./images-build/photo-stream' . $unique_filenames[$i] . '*.*') as $srcset_item){

      $image_width = getimagesize($srcset_item)[0];

      if ($image_width != $previous_width) {
          $srcset_list[$i][] = $srcset_item . ' ' . $image_width;
      }

      $previous_width = $image_width;
    }
  }

?>

<section id="photos" class="js-front-page-waypoint photos-promo">
  <h1 class="section-title">Photos</h1>
  <div class="photo-grid col-group">

  </div>

  <?php
    echo '<script>';
    $jsonOutput = json_encode($srcset_list, JSON_PRETTY_PRINT);
    echo 'var srcsetArray = ' . $jsonOutput . ';';
    echo '</script>';
  ?>
</section>
