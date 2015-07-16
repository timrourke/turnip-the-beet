<?php

	/*
	 *  Variables
	 *
	 *  Page: Blog
	 *
	 */

	$bodyClass = 'blog blog-single-post';

  $blog_posts = file_get_contents(__DIR__ . '/../../data/blog-posts.json');

  $blog_posts = json_decode($blog_posts);

  if (isset($_GET['post'])) {
	    $postIndex = $_GET['post'];

	    $post = $blog_posts[$postIndex - 1];

  		$post->content = str_replace("\n", "</p><p>", $post->content);
	}else{
		$postIndex = false;
		$bodyClass = "blog";
	    // Fallback behaviour goes here
	}

?>
