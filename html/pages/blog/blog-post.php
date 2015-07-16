<section id="field-notes" class="field-notes">
  <article class="blog__post">
    
    <div class="blog-post__content blog-post__content--full">
      <p><?php echo $post->content; ?></p>
    </div>
    <footer class="blog-post__footer">
      
    </footer>
  </article>
</section>

<?php 

	

?>
<nav class="post-navigation">
	<ul>
		<?php if ( $postIndex - 1 > 0 ) : ?>
		<li class="post-navigation__prevPost">
			<a href="/blog/?post=<?php echo $postIndex - 1; ?>"><span class="icon-arrow">←</span> Previous <br>
				<h5><?php echo $blog_posts[$postIndex - 1]->title; ?></h5>
			</a>
		</li>
		<?php endif; ?>
		<?php if ( $postIndex + 1 <= count($blog_posts) ) : ?>
		<li class="post-navigation__nextPost">
			<a href="/blog/?post=<?php echo $postIndex + 1; ?>">Next <span class="icon-arrow">→</span>
				<h5><?php echo $blog_posts[$postIndex]->title; ?></h5>
			</a>
		</li>
		<?php endif; ?>
	</ul>
</nav>