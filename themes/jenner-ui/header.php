<!DOCTYPE html>
<html <?php language_attributes(); ?> >
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="profile" href="http://gmpg.org/xfn/11" />
  <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?> >
  <header class="main-header">
    <nav class="main-header__container container">
      <?php 
        if ( function_exists( 'the_custom_logo' ) ) {
          echo '<div class="main-header__brand">';
            the_custom_logo();
          echo '</div>';
          
        }
      ?>
      <button onclick="themeMode()" class="btn-theme-mode">
        <svg class="svg-icon btn-theme-mode__svg"><use href="<?php echo get_template_directory_uri( ) ?>/assets/icons/symbols.svg#sun" /></svg>
        <p class="btn-theme-mode__txt-switch txt-switch">Modo <span class="txt-switch__light">Claro</span> / <span class="txt-switch__dark">Oscuro</span></p>
      </button>
    </nav>
  </header>