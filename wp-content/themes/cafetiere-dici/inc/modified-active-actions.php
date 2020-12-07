<?php

/**
 * This file contains the standard loop within wordpress.
 */

        if ( have_posts() ) : while ( have_posts() ) : the_post(); 
        ?>
            <div class="pure-g title actie_titel">
                <h1 class="pure-u-1 title"><?php the_title(); ?></h1>
            </div>
            
            <?php the_content(); ?>

            <div class="pure-g flex-center" wfd-id="17">
                <a class="pure-u-1 more" href="../">Ga terug naar de homepagina</a>
            </div>

        <?php 
        endwhile; 
        else : 
        ?>
            <p><?php echo esc_html_e( 'Op dit moment zijn er geen lopende acties.' ); ?></p>        
            <?php 
        endif; 


?>