<?php
get_header();
 
if ( have_posts() ) : 
    while ( have_posts() ) : the_post();
        ?>
        <main class="container">
            <?php 
                the_title( '<h1>', '</h1>' ); 
                the_content();
            ?>
        </main>
        <?php
    endwhile;
else :
    get_template_part( 'template-parts/page', 'error' );
endif;
 
get_footer();
?>