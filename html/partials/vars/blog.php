<?php

	/*
	 *  Variables
	 *
	 *  Page: Blog
	 *
	 */

	$bodyClass = 'blog';

	if (isset($_GET['post'])) {
	    $postIndex = $_GET['post'];
	}else{
	    // Fallback behaviour goes here
	}

  $blog_posts = file_get_contents(__DIR__ . '/../../data/blog-posts.json');

  $blog_posts = json_decode($blog_posts);

  $post = $blog_posts[$postIndex - 1];

  $post->content = str_replace("\n", "</p><p>", $post->content);

?>
