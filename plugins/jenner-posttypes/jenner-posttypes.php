<?php 

/**
 * Plugin Name: Jenner - Post Types
 * Plugin URI:
 * Description: Añade Post Types al sitio web
 * Version: 1.0.0
 * Author URI: https://jenner.pe
 * TextDomain: jennerpt
 */
if(!defined('ABSPATH')) die();


function cptui_register_my_cpts() {

	/**
	 * Post Type: Proyectos.
	 */

	$labels = [
		"name" => esc_html__( "Proyectos", "jennerui" ),
		"singular_name" => esc_html__( "Proyecto", "jennerui" ),
	];

	$args = [
		"label" => esc_html__( "Proyectos", "jennerui" ),
		"labels" => $labels,
		"description" => "Proyectos creados en la agencia",
		"public" => true,
		"publicly_queryable" => true,
		"show_ui" => true,
		"show_in_rest" => true,
		"rest_base" => "proyectos-api",
		"rest_controller_class" => "WP_REST_Posts_Controller",
		"rest_namespace" => "wp/v2",
		"has_archive" => false,
		"show_in_menu" => true,
		"show_in_nav_menus" => true,
		"delete_with_user" => false,
		"exclude_from_search" => false,
		"capability_type" => "post",
		"map_meta_cap" => true,
		"hierarchical" => true,
		"can_export" => false,
		"rewrite" => [ "slug" => "proyectos", "with_front" => true ],
		"query_var" => true,
		"menu_position" => 22,
		"menu_icon" => "dashicons-superhero",
		"supports" => [ "title", "editor", "thumbnail", "excerpt", "author", "page-attributes" ],
		"show_in_graphql" => false,
	];

	register_post_type( "proyectos", $args );
}

add_action( 'init', 'cptui_register_my_cpts' );



function cptui_register_my_taxes_categoria_proyectos() {

	/**
	 * Taxonomy: Categoría Proyectos.
	 */

	$labels = [
		"name" => esc_html__( "Categoría Proyectos", "jennerui" ),
		"singular_name" => esc_html__( "Categoría Proyecto", "jennerui" ),
	];

	
	$args = [
		"label" => esc_html__( "Categoría Proyectos", "jennerui" ),
		"labels" => $labels,
		"public" => true,
		"publicly_queryable" => true,
		"hierarchical" => true,
		"show_ui" => true,
		"show_in_menu" => true,
		"show_in_nav_menus" => true,
		"query_var" => true,
		"rewrite" => [ 'slug' => 'categoria_proyectos', 'with_front' => true, ],
		"show_admin_column" => true,
		"show_in_rest" => true,
		"show_tagcloud" => false,
		"rest_base" => "categoria_proyectos",
		"rest_controller_class" => "WP_REST_Terms_Controller",
		"rest_namespace" => "wp/v2",
		"show_in_quick_edit" => false,
		"sort" => false,
		"show_in_graphql" => false,
	];
	register_taxonomy( "categoria_proyectos", [ "proyectos" ], $args );
}
add_action( 'init', 'cptui_register_my_taxes_categoria_proyectos' );

function rest_proyectos( $data ) {
    $parsed_args=[
        'numberposts'      => -1,
        'orderby'          => 'date',
        'order'            => 'DESC',
        'post_type'        => 'proyectos',
    ];

    $get_posts = new WP_Query;
    $posts = $get_posts->query( $parsed_args );
    if (empty($posts)) {
        return new WP_Error( 'empty_terms', 'There are no posts to display', array('status' => 404) );
    }

    $response = new WP_REST_Response($posts);
    $response->set_status(200);

    $new_array = (object) array('Proyectos' => [], 'Usuarios' => [], 'Categorias' => []);
    $i = 0;

    foreach($posts as $post) {
        $new_array->Proyectos[$i]['id'] = $post->ID;
        $new_array->Proyectos[$i]['title'] = $post->post_title;
        $new_array->Proyectos[$i]['date'] = $post->post_date;
        $i++;
    }

    $usuarios = get_users();
    $a = 0;
    foreach ($usuarios as $usuario) {
        $new_array->Usuarios[$a]['id'] = $usuario->id;
        $new_array->Usuarios[$a]['userName'] = $usuario->display_name;
        $a++;
    }

	$tax_terms = get_terms('categoria_proyectos');
    $t = 0;
    foreach ($tax_terms as $tax_term) {
        $new_array->Categorias[$t]['id'] = $tax_term->term_id;
        $new_array->Categorias[$t]['name'] = $tax_term->name;
        $t++;
    }

    return $new_array;
}
   
add_action( 'rest_api_init', function () {
    register_rest_route( 'proyectos/filtros/v1', '/get', array(
      'methods' => 'GET',
      'callback' => 'rest_proyectos',
    ) );
} );