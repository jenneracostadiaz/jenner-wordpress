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
                'title' => 'Custom Blocks',
                'icon' => 'store'
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

    //Estilos para el editor (unicamente)
    wp_register_style(
        'jenner-editor-styles',
        plugins_url( 'styles/editor.css', __FILE__), // archivo css para el editor
        array('wp-edit-blocks'), // dependencias
        filemtime( plugin_dir_path(__FILE__) . 'styles/editor.css')
    );
    
    //Estilos para los bloques backend y frontend
    wp_register_style(
        'jenner-frontend-styles',
        plugins_url('styles/styles.css', __FILE__),
        array(),
        filemtime( plugin_dir_path(__FILE__) . 'styles/styles.css')
    );

    //Arreglo de bloques
    $blocks = [
        'jenner/boxes',
        'jenner/cover',
    ];

    foreach ($blocks as $block) {
        register_block_type( $block, array(
            'editor_script' => 'jenner-editor-script',
            'editor_styles' => 'jenner-editor-styles',
            'style' => 'jenner-frontend-styles'
        ) );
    }
}
add_action( 'init', 'jenner_registrar_bloques' );