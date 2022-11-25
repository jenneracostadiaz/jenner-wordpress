<?php
/**
 * JennerUI's functions and definitions
 *
 * @package JennerUI
 * @since JennerUI 1.0
 */
if ( ! isset( $content_width ) ) {
	$content_width = 800; /* pixels */
}

if ( ! function_exists( 'jennerui_setup' ) ) :

	function jennerui_setup() {

        add_theme_support( 'wp-block-styles' );
        add_editor_style( 'editor-style.css' );

		add_theme_support( 'title-tag' );
		add_theme_support( 'dark-editor-style' );
        add_theme_support( 'automatic-feed-links' );
		add_theme_support( 'post-thumbnails' );
        add_theme_support( 'align-wide' );
        add_theme_support( 'automatic-feed-links' );
        add_theme_support( 'responsive-embeds' );
        add_theme_support( 'editor-styles' );
        add_theme_support( 'html5', array( 'style','script' ) );
        add_theme_support( 'custom-logo', array(
            'height'               => 50,
            'width'                => 50,
            'flex-height'          => true,
            'flex-width'           => true,
            'header-text'          => array( 'site-title', 'site-description' ),
            'unlink-homepage-logo' => true,
        ) );
        /*
        * Soporte para Medios
        */
        add_theme_support( 'post-formats', array( 'aside', 'gallery', 'quote', 'image', 'video' ) );

		register_nav_menus( array(
			'primary'   => __( 'Primary Menu', 'jennerui' ),
		) );

        /** CSS */
        wp_enqueue_style('mainCSS', get_template_directory_uri() . '/assets/css/main.min.css', array(), wp_get_theme()->get('Version'));
        wp_enqueue_style('style', get_stylesheet_uri(), array('mainCSS'), wp_get_theme()->get('Version') );
        /** JS */
        wp_enqueue_script('darkmode', get_template_directory_uri() . '/assets/js/components/darkmode.js', array('jquery'), wp_get_theme()->get('Version'), true);
        wp_enqueue_script('app', get_template_directory_uri() . '/assets/js/app.js', array('darkmode'), wp_get_theme()->get('Version'), true);

        /** Intercionalización */
        load_theme_textdomain( 'jennerui', get_template_directory() . '/languages' );

	}
endif; // jennerui_setup
add_action( 'after_setup_theme', 'jennerui_setup' );
