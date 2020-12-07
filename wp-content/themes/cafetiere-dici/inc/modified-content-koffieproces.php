<?php

/**
 * This file contains the modified loop for the coffee process post type
 */

 $args = array(
     'post_type' => 'koffieproces',
     'orderby' => 'date',
     'order' => 'ASC'
 );

 $query = new WP_Query( $args );

 if ( $query->have_posts() ) :
    while ( $query->have_posts() ) : $query->the_post();
        ?>
        <div class="pure-g koffie-proces">
                <div class="pure-u-1 pure-u-md-3-24 img-box">
                <?php
                if ( has_post_thumbnail() ) :
                    the_post_thumbnail();
                else: 
                    ?>
                    <span class="image-placeholder">No image</span>
                    <?php
                endif;
                ?>
                </div>
                <div class="pure-u-1 pure-u-md-14-24 proces-uitleg">
                    <h3><?php the_title(); ?></h3>
                    
                    <?php 
                    the_content();
                    
                    ?>
                </div>
            </div>
        <?php
        endwhile;
            wp_reset_postdata();
        else:
            ?>
            <p class="no-posts"><?php _e( 'Oops, het lijkt erop dat er nog geen post aanwezig is.' ); ?></p>
            <?php
        endif;


?>