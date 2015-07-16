<?php include('../partials/vars/blog.php'); ?>
<?php include('../partials/header.php'); ?>

  <?php 

	  if ( $postIndex ) {
	  	include('../pages/blog/blog-post.php'); 	
	  } else {
	  	include('../pages/blog/blog-index.php');
	  }
  
  ?>

<?php include('../partials/footer.php'); ?>
