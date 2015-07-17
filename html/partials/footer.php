      </div><!-- #content -->

      <footer id="colophon" class="js-front-page-waypoint site-footer" role="contentinfo">
        <div class="site-info col-group">
          
          <div class="col-1-2">
            <div class="footer__contact">
              <h2>Contact Us</h2>
              <div class="phone">
                <svg class="icon icon--big">
                  <use xlink:href="#social--icon-phone"></use> 
                </svg>
                <p class="phone-line">(541) 214-8657</p>
              </div>
              <div class="address">
                <svg class="icon icon--big">
                  <use xlink:href="#location--icon-map-marker"></use>
                </svg>
                <p class="address-line">79128 Territorial Road</p>
                <p class="address-line">Lorane, Oregon 97451</p>
              </div>
              <div class="social">
                <a href="https://www.facebook.com/turnipthebeetorganicfarm">
                  <svg class="icon icon--big">
                    <use xlink:href="#social--icon-facebook"></use>
                  </svg>
                  <span class="social__facebook">Find us on Facebook!</span>
                </a>  
              </div>
            </div>

            <div class="google-map">
              <h3>Come Say Hi</h3>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d547260.8046433368!2d-123.29291815112926!3d43.87309000796561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54c139b2fa901d49%3A0x33e4167a38df33d1!2s79128+Territorial+Hwy%2C+Lorane%2C+OR+97451!5e0!3m2!1sen!2sus!4v1437090633456" width="400" height="400" frameborder="0" style="border:0" allowfullscreen></iframe>
            </div>
          </div>

          <div class="col-1-2 col-last">
            <?php include(__DIR__ . '/../partials/contactform.php'); ?>
          </div>
        </div><!-- .site-info -->
        
        <div class="copyright">
          <p>&copy; <?php echo date('Y'); ?> Turnip the Beet Farm</p>
        </div>

      </footer><!-- #colophon -->
    </div><!-- #page -->

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="../js/vendor/jquery-1.11.3.min.js"><\/script>')</script>
    <script src="../js-build/global.min.js"></script>

    <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
    <script>
        (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
        function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
        e=o.createElement(i);r=o.getElementsByTagName(i)[0];
        e.src='https://www.google-analytics.com/analytics.js';
        r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
        ga('create','UA-XXXXX-X','auto');ga('send','pageview');
    </script>
  </body>
</html>
