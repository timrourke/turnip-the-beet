<?php

	$blog_posts = file_get_contents('blog-posts.json');

	$blog_posts = json_decode($blog_posts);

	//var_dump($blog_posts);

?>

<section id="field-notes" class="js-front-page-waypoint field-notes-promo">
  <h1 class="section-title">Field Notes</h1>
  <div class="col-group">

	<?php if ($blog_posts) : ?>
	<?php  
		foreach ($blog_posts as &$post) {
	?>
    <div class="col-1-3">
      <article class="blog__excerpt">
        <header class="blog-post__meta">
          <h3 class="post-title"><?php echo $post->title; ?></h3>
          <div class="meta-row">
            <span class="post-date"><?php echo $post->date; ?></span>
            <span class="sep">&nbsp;~&nbsp;</span>
            <span class="post-weather"><?php echo $post->weather; ?></span>
          </div>
        </header>
        <div class="blog-post__content blog-post__content--excerpt">
          <?php echo $post->excerpt; ?>
        </div>
        <footer class="blog-post__footer">
          <a class="permalink" href="#">Read more <span class="icon-right-arrow">→</span></a>
        </footer>
      </article>
    </div>
    <?php
    	}
    ?>
	<?php endif; ?>

  </div>
</section>
