
<?php

/**
 * This file contains the standard loop within wordpress.
 */


        if ( have_posts() ) : while ( have_posts() ) : the_post(); 
        ?>
            <div class="pure-g title">
                <h1 class="pure-u-1 title"><?php the_title(); ?></h1>
            </div>
            
            <?php the_content(); ?>

        <?php 
        endwhile; 
        else : 
        ?>
            <p><?php echo esc_html_e( 'Sorry, maar het lijkt erop dat er nog geen posts zijn.' ); ?></p>
        <?php 
        endif; 


?>