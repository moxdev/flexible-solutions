<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package MM4 You
 */
//require ('inc/contact.php');
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="hfeed site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'mm4-you' ); ?></a>

	<header id="masthead" class="site-header" role="banner">
		<div class="wrapper">
			<div class="site-branding">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><img src="<?php echo get_template_directory_uri() . '/imgs/logo.svg'?>" class="brand"></a>
			</div><!-- .site-branding -->

			<?php $ph = get_theme_mod('setting_phone');
			$fb = get_theme_mod('setting_facebook');
			$tw = get_theme_mod('setting_twitter');
			$goo = get_theme_mod('setting_google');
			$li = get_theme_mod('setting_linked_in');
			$yt = get_theme_mod('setting_you_tube');
			if($fb || $tw || $goo || $li || $yt) { ?>

			<ul class="social-media">
				<?php if($fb): ?><li><a href="<?php echo $fb; ?>" id="social-link-fb" target="_blank">Find Us on Facebook</a></li><?php endif; ?>
				<?php if($tw): ?><li><a href="<?php echo $tw; ?>" id="social-link-tw" target="_blank">Follow Us on Twitter</a></li><?php endif; ?>
				<?php if($goo): ?><li><a href="<?php echo $goo; ?>" id="social-link-goo" target="_blank">Visit Us on Google+</a></li><?php endif; ?>
				<?php if($li): ?><li><a href="<?php echo $li; ?>" id="social-link-linked" target="_blank">Visit Us on LinkedIn</a></li><?php endif; ?>
				<?php if($yt): ?><li><a href="<?php echo $yt; ?>" id="social-link-yt" target="_blank">View Our You Tube Channel</a></li><?php endif; ?>
			</ul>
			<?php }

			if ( has_nav_menu( 'primary' ) || has_nav_menu( 'aux' ) || has_nav_menu( 'footer' ) ) : ?>
				<button class="menu-toggle" aria-expanded="false"><?php esc_html_e( 'Primary Menu', 'mm4-you' ); ?></button>
			<?php endif;  ?>

		</div><!-- .wrapper -->
	</header><!-- #masthead -->

	<?php if( function_exists('mm4_you_home_carousel_type_1') ) {
		mm4_you_home_carousel_type_1();
	} ?>

	<?php if( function_exists('mm4_you_home_carousel_type_2') ) {
		mm4_you_home_carousel_type_2();
	} ?>

	<?php if( function_exists('mm4_you_photo_gallery') ) {
		mm4_you_photo_gallery();
	} ?>

	<?php if( has_post_thumbnail() && !is_page_template('frontpage-b.php') ):
		$img = get_the_post_thumbnail_url(); ?>

		<div class="featured-image-header" style='background-image: url("<?php echo $img; ?>"'>
			<?php

			if ( function_exists( 'get_field' ) ) {
				$feature_headline = get_field( 'featured_image_headline' );  ?>

					<span class="featured-image-headline"><?php echo esc_html( $feature_headline ); ?></span>

				 <?php
			}

			 ?>

		</div><!-- featured-image-header -->

	<?php endif; ?>

	<?php if ( has_nav_menu( 'primary' ) ) : ?>
		<nav id="site-navigation" class="main-navigation" role="navigation">
			<?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_id' => 'primary-menu', 'container' => '' ) ); ?>
		</nav><!-- #site-navigation -->
	<?php endif; ?>

	<div id="content" class="site-content">
		<div class="wrapper">
