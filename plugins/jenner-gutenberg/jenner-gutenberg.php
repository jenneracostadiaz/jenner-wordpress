<?php
/**
 *  Plugin Name: Jenner's Blocks
 *  Description: Bloques nativos
 *  Version: 1.0
 *  Author: Jenner Acosta Diaz
 *  Licensie: GPL2
 */

 if(!defined('ABSPATH')) exit;

/** Categorias Personalizadas */
function jenner_categoria_personalizada($categories, $post) {
    return array_merge(
        $categories,
        array(
            array(
                'slug' => 'jenner', 
                'title' => 'Jenner Blocks',
                'icon' => 'editor-code'
            )
        )
    );
}
add_filter('block_categories', 'jenner_categoria_personalizada', 10, 2);

/** Registrar Bloques, scripts u CSS */
function jenner_registrar_bloques(){
    //Si Gutenberg no existe, salir
    if(!function_exists('register_block_type')){
        return;
    }

    //Registrar los bloques en el editor
    wp_register_script(
        'jenner-editor-script', //nombre unico
        plugins_url('build/index.js', __FILE__), //archivo con los bloques
        array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'), //dependencias
        filemtime( plugin_dir_path(__FILE__) . 'build/index.js') //versión
    );

    //Arreglo de bloques
    $blocks = [
        'jenner/boxes',
        'jenner/cover',
        'jenner/valueproposal',
    ];

    foreach ($blocks as $block) {
        register_block_type( $block, array(
            'editor_script' => 'jenner-editor-script',
        ) );
    }

    /** Registrar un bloque dinamico */
    register_block_type( 'jenner/proyectos', array(
        'editor_script' => 'jenner-editor-script',
        'render_callback' => 'jenner_proyectos_front_end'
    ) );
}
add_action( 'init', 'jenner_registrar_bloques' );

/** Consulta la base de datos para mosstrar los resultados */

function jenner_proyectos_front_end() {
    $proyectos = wp_get_recent_posts(array(
        'post_type' => 'proyectos',
        'post_status' => 'publish',
        'numberposts' => 10
    ));

    if(count($proyectos) == 0 ){
        return 'No hay Proyectos';
    }

    $cuerpo = '';
    $cuerpo .= '<section class="projects">';
    foreach($proyectos as $proy){
        $post = get_post($proy['ID']);
        setup_postdata($post);

        $link_external = get_field('link',$post);
        $mostrar_protafolio = get_field('mostrar_protafolio',$post);

        $cuerpo .= '<article class="projects__card card">';
        $cuerpo .=  '<header class="card__header">';
        $cuerpo .=  '<h2 class="card__header__title">'.get_the_title($post).'</h2>';
        $cuerpo .=  '<time class="card__header__time">'.get_the_time( 'M, Y', $post ).'</time>';
        $cuerpo .= '<div class="button-group">';
        if($link_external){
            $cuerpo .= '<a href='.$link_external.' class="btn-primary" target="_blank">';
            $cuerpo .= '    <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" > <path d="M4.66667 2V3.33333H1.33333V10.6667H8.66667V7.33333H10V11.3333C10 11.5101 9.92976 11.6797 9.80474 11.8047C9.67971 11.9298 9.51014 12 9.33333 12H0.666667C0.489856 12 0.320286 11.9298 0.195262 11.8047C0.0702379 11.6797 0 11.5101 0 11.3333V2.66667C0 2.48986 0.0702379 2.32029 0.195262 2.19526C0.320286 2.07024 0.489856 2 0.666667 2H4.66667ZM12 0V5.33333H10.6667V2.27533L5.47133 7.47133L4.52867 6.52867L9.72333 1.33333H6.66667V0H12Z" /> </svg>';
            $cuerpo .= '    Ver Online';
            $cuerpo .= '</a>';
        }
        if($mostrar_protafolio){
            $cuerpo .=  '<a href='.get_the_permalink($post).' class="btn-third">';
            $cuerpo .=  '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" > <path d="M8 15C6.14348 15 4.36301 14.2625 3.05025 12.9497C1.7375 11.637 1 9.85652 1 8C1 6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637 1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8C15 9.85652 14.2625 11.637 12.9497 12.9497C11.637 14.2625 9.85652 15 8 15ZM8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16Z" /> <path d="M8.93001 6.588L6.64001 6.875L6.55801 7.255L7.00801 7.338C7.30201 7.408 7.36001 7.514 7.29601 7.807L6.55801 11.275C6.36401 12.172 6.66301 12.594 7.36601 12.594C7.91101 12.594 8.54401 12.342 8.83101 11.996L8.91901 11.58C8.71901 11.756 8.42701 11.826 8.23301 11.826C7.95801 11.826 7.85801 11.633 7.92901 11.293L8.93001 6.588ZM9.00001 4.5C9.00001 4.76522 8.89466 5.01957 8.70712 5.20711C8.51958 5.39464 8.26523 5.5 8.00001 5.5C7.7348 5.5 7.48044 5.39464 7.29291 5.20711C7.10537 5.01957 7.00001 4.76522 7.00001 4.5C7.00001 4.23478 7.10537 3.98043 7.29291 3.79289C7.48044 3.60536 7.7348 3.5 8.00001 3.5C8.26523 3.5 8.51958 3.60536 8.70712 3.79289C8.89466 3.98043 9.00001 4.23478 9.00001 4.5Z" /> </svg>';
            $cuerpo .=  'Detalles';
            $cuerpo .=  '</a>';
        }
            
        $cuerpo .= '</div>';
        $cuerpo .=  '</header>';
        $cuerpo .= '<section class="card__image">';
        $cuerpo .= get_the_post_thumbnail($post, 'full');
        $cuerpo .= '</section>';
        $cuerpo .= '</article>';


        wp_reset_postdata();
    }
    $cuerpo .= '</section>';
    return $cuerpo;
}