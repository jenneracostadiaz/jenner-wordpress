<main class="contenedor error404">
    <div class="icon-error"><i class="fas fa-exclamation-triangle"></i></div>
    <h1><?php _e("Ooops... Error 404"); ?></h1>
    <p><?php _e("Lo sentimos, pero la página que busca no existe."); ?></p>
    <p><?php _e("Por favor verifique la dirección introducida e inténtelo de nuevo o"); ?> <a href="<?php echo esc_url( home_url('/') ); ?>"><?php _e("Ir a la Página de Inicio"); ?></a></p>
    <h4><?php _e("Otras Opciones:");?></h4>
    <p><?php _e("Ponerse en contacto con"); ?> <?php bloginfo( 'name' ); ?></p>
    <p><strong><?php _e("Posibles motivos por los que la página solicitada no se encuentre disponible:"); ?></strong></p>
    <ul>
        <li><?php _e("Puede que haya cambiado de dirección, la URL no existe."); ?></li>
        <li><?php _e("Es posible que ésta no exista, comprúebela de nuevo para ver si es correcta."); ?></li>
    </ul>
</main>