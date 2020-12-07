<?php
/*
$query = new WP_Query( $args );

$args = array(

);

if ( $query->have_posts() ) :
    while ( $query->have_posts() ) : $query->the_post();
    ?>
    <h4><?php the_title(); ?></h4>
    <p><?php the_content(); ?></p>
    <?php
    endwhile;

    wp_reset_postdata();

else :
    ?>
    <p><?php _e( 'Het lijkt erop dat er nog geen content aanwezig is.' ); ?></p>
    <?php
endif;

?>