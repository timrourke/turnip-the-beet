<div id="primary" class="content-area">
	<main id="main" class="site-main" role="main">

		<section id="field-notes" class="field-notes">
		  <div class="col-group">

		    <?php if ($blog_posts) : ?>
		    <?php  

		      for ($count = 0; $count < count($blog_posts) - 1; $count++) {

		        $post = $blog_posts[$count];

		        if (($count + 1) % 3 == 0) {
		          $post_class = "col-last";
		        } else {
		          $post_class = "";
		        }
		    ?>
		    <div class="col-1-3 <?php echo $post_class; ?>">
		      <article class="blog__excerpt">
		        <figure class="blog-post__featuredImage">
		          <img src="../images-build/blog/<?php echo $post->featuredImage; ?>-original.jpg" alt="<?php echo $post->title; ?>">
		        </figure>
		        <header class="blog-post__meta">
		          <a href="/blog/?post=<?php echo $count + 1; ?>"><h3 class="post-title"><?php echo $post->title; ?></h3></a>
		          <div class="meta-row">
		            <span class="post-date"><?php echo date("F j, Y", strtotime($post->date)); ?></span>
		            <span class="sep">&nbsp;~&nbsp;</span>
		            <span class="post-weather"><?php echo $post->weather; ?></span>
		          </div>
		        </header>
		        <div class="blog-post__content blog-post__content--excerpt">
		          <?php echo $post->excerpt; ?>
		        </div>
		        <footer class="blog-post__footer">
		          <a class="permalink" href="/blog/?post=<?php echo $count + 1; ?>">Read more <span class="icon-arrow">→</span></a>
		        </footer>
		      </article>
		    </div>
		    <?php
		      }
		    ?>
		    <?php endif; ?>

		  </div>
		</section>

	</main><!-- #main -->
</div><!-- #primary -->
