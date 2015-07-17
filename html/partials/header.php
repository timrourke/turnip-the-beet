<!doctype html>
<html class="no-js" lang="en-US">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Rise Up Farming! | Turnip the Beet Farm</title>
        <meta name="description" content="We grow organic vegetables with love and a cattle dog in the foothills of Lorane, Oregon.">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="apple-touch-icon-precomposed" sizes="57x57" href="../favicon/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="../favicon/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="../favicon/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="../favicon/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon-precomposed" sizes="60x60" href="../favicon/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon-precomposed" sizes="120x120" href="../favicon/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon-precomposed" sizes="76x76" href="../favicon/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon-precomposed" sizes="152x152" href="../favicon/apple-touch-icon-152x152.png" />
        <link rel="icon" type="image/png" href="../favicon/favicon-196x196.png" sizes="196x196" />
        <link rel="icon" type="image/png" href="../favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/png" href="../favicon/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="../favicon/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" type="image/png" href="../favicon/favicon-128.png" sizes="128x128" />
        <meta name="application-name" content="&nbsp;"/>
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="../favicon/mstile-144x144.png" />
        <meta name="msapplication-square70x70logo" content="../favicon/mstile-70x70.png" />
        <meta name="msapplication-square150x150logo" content="../favicon/mstile-150x150.png" />
        <meta name="msapplication-wide310x150logo" content="../favicon/mstile-310x150.png" />
        <meta name="msapplication-square310x310logo" content="../favicon/mstile-310x310.png" />

        <link rel="stylesheet" href="../css/style.css">
    </head>
    <body class="<?php echo $bodyClass; ?>">
      <div style="display:none !important;">
        <?php include(__DIR__ . '/../svg/defs/svg/sprite.defs.svg'); ?>
      </div>
      <!--[if lt IE 8]>
          <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
      <![endif]-->
      
      <div id="js-nav-drawer" class="nav-drawer">
        <nav id="main-navigation" class="site-navigation site-navigation--main" role="navigation">
          <ul id="primary-menu" class="site-navigation__menu">
            <li class="site-navigation__menu-item"><a href="/" class="site-navigation__menu-link">Home</a></li>
            <li class="site-navigation__menu-item"><a href="/about/" class="site-navigation__menu-link">About Us</a></li>
            <li class="site-navigation__menu-item"><a href="/blog/" class="site-navigation__menu-link">Field Notes</a></li>
            <li class="site-navigation__menu-item"><a href="/our-customers/" class="site-navigation__menu-link">Our Customers</a></li>
            <li class="site-navigation__menu-item"><a href="/our-food/" class="site-navigation__menu-link">Our Food</a></li>
          </ul>
        </nav><!-- #site-navigation -->  
      </div>

      <button id="js-menu-toggle" class="menu-toggle" aria-controls="primary-menu" aria-expanded="false">
        <div class="menu-toggle__top"></div>
        <div class="menu-toggle__middle"></div>
        <div class="menu-toggle__bottom"></div>           
      </button>

      <div id="page" class="hfeed site">
      	<a class="skip-link screen-reader-text" href="#content">Skip to content</a>

      	<header id="masthead" class="js-front-page-waypoint site-header" role="banner">
      		<div class="site-branding">
      			<h1 class="site-title">
              <a href="/" rel="home">
                <span class="screen-reader-text">Turnip the Beet</span>
                <img src="images-build/logo/new-logo-prototype-480.png" sizes="25vw" srcset="../images-build/logo/new-logo-prototype.png 1200w, ../images-build/logo/new-logo-prototype-1024.png 1024w, ../images-build/logo/new-logo-prototype-800.png 800w, ../images-build/logo/new-logo-prototype-640.png 640w, ../images-build/logo/new-logo-prototype-480.png 480w, ../images-build/logo/new-logo-prototype-320.png 320w" alt="Turnip the Beets Farm" class="site-logo">
              </a>
            </h1>
      		</div><!-- .site-branding -->

          <?php if ( $bodyClass == "home" ) : ?>
          <aside class="site-intro">
            <p>We grow organic food with hard work, love, and a cattle dog in the lovely foothills of Lorane,&nbsp;Oregon.</p>
            <a href="#food" class="site-intro__link">Find our Food <span class="icon-arrow">→</span></a>
          </aside>
          <?php elseif ( $bodyClass == "blog blog-single-post" && $postIndex !== false ) : ?>
            <div class="blog-post__meta">
              <h3 class="section-title">Field Notes</h3>
              <h1 class="post-title"><?php echo $post->title; ?></h1>
              <div class="meta-row">
                <span class="post-date"><?php echo date("F j, Y", strtotime($post->date)); ?></span>
                <span class="sep">&nbsp;~&nbsp;</span>
                <span class="post-weather"><?php echo $post->weather; ?></span>
              </div>
            </div>
            <style>
              .site-header__background {
                position:absolute;
                top:0;
                left:0;
                width:100%;
                height:100%;
                z-index:-1;
                background-position:center center;
                background-size: cover;
                background-repeat: no-repeat;
                background-image:linear-gradient(to bottom, rgba(5,30,60,0.7), rgba(5,30,60,0.25)), linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255, 255,255,0)), url('../images-build/blog/<?php echo $post->featuredImage; ?>-original.jpg');
              }
            </style>
          <?php elseif ( $bodyClass == "blog" && $postIndex == false ) :?>
            <h1 class="page-title">Field Notes</h1>
          <?php endif; ?>

          <div class="site-header__background"></div>

      	</header><!-- #masthead -->
        
      	<div id="content" class="site-content">
