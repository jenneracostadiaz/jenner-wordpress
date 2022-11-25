<?php get_header(); ?>

<main class="home-page container">
    <?php the_content(); ?>
    <section class="value-proposal">
        <ul class="value-proposal__list">
            <li class="value-proposal__list__item">
                <h3>
                    <svg class="svg-icon">
                        <use href="<?php echo get_template_directory_uri( ) ?>/assets/icons/symbols.svg#sun" />
                    </svg>
                    Diseña
                </h3>
                <p>Explora tu lado creativo, nosotros nos encargamos de convertir todas tus ideas en realidad</p>
            </li>
            <li class="value-proposal__list__item">
                <h3>
                    <svg class="svg-icon">
                        <use href="<?php echo get_template_directory_uri( ) ?>/assets/icons/symbols.svg#sun" />
                    </svg>
                    Desarrolla
                </h3>
                <p>Todos tus planes y proyectos con sistemas eficientes y de alta tecnología para un mejor flujo de trabajo</p>
            </li>
            <li class="value-proposal__list__item">
                <h3>
                    <svg class="svg-icon">
                        <use href="<?php echo get_template_directory_uri( ) ?>/assets/icons/symbols.svg#sun" />
                    </svg>
                    Publica
                </h3>
                <p>Cumple todas tus metas, estamos acompañadote durante todo el proceso y el el futuro de tu marca.</p>
            </li>
        </ul>
    </section>
</main>

<?php get_footer(); ?>