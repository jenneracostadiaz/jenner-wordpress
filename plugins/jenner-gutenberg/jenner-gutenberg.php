<?php
/**
 *  Plugin Name: Jenner's Blocks
 *  Description: Bloques nativos
 *  Version: 1.0
 *  Author: Jenner Acosta Diaz
 *  Licensie: GPL2
 */

 if(!defined('ABSPATH')) exit;
 /** Registrar Bloques, scripts u CSS */

 function jenner_registrar_bloques(){
    //Si Gutenberg no existe, salir
    if(!function_exists('register_block_type')){
        return;
    }

    //Registrar los bloques en el editor
    wp_register_script(
        'jenner-esitor-script', //nombre unico
        plugins_url('build/index.js', __FILE__), //archivo con los bloques
        array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'), //dependencias
        filemtime( plugin_dir_path(__FILE__) . 'build/index.js') //versión
    )
 }
 add_action( 'init', 'jenner_registrar_bloques' );