<?php

/**
 * This file is needed to setup the navigation menu of the website.
 */

class Walker_Nav_Primary extends Walker_Nav_menu {

    /**
     * Setting up the ul element of the menu
     * 
     */

    function start_lvl( &$output, $depth = 0, $args = null ) {

        if ( isset( $args->item_spacing ) && 'discard' === $args->item_spacing) {
            $t = "";
            $n = "";
        } else {
            $t = "\t";
            $n = "\n";
        }

        $indent = str_repeat( $t, $depth );

        $classes = array( 'pure-menu-children' );

        $mobile_icon = '<input class="menu-btn" type="checkbox" id="menu-btn">
        <label id="menu-btn" class="menu-icon" for="menu-btn"><span class="nav-icon"></span></label>';

        $class_names = join( ' ', apply_filters( 'nav_menu_submenu_css_class', $classes, $args, $depth) );
        $class_names = $class_names ? 'class="' . esc_attr( $class_names ) . '"' : '';

        // Add mobile icon ONLY if ul isn't representing a sub-menu
        if ($depth == 0) {
            $output .= "{$n}{$indent}<ul $class_names>{$n}";
        } else {
            $output .= "{$mobile_icon}{$n}{$indent}<ul $class_names>{$n}";
        }

    }
    
    /**
     * Setting up the menu items
     * 
     */

    function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {

        if ( isset( $args->item_spacing) && 'discard' === $args->item_spacing ) {
            $t = "";
            $n = "";
        } else {
            $t = "\t";
            $n = "\n";
        }

        $indent = ( $depth ) ? str_repeat( $t, $depth ) : '';

        $classes = empty( $item->classes ) ? array() : (array) $item->classes;
        $classes[] = ( in_array('current-menu-item', $classes ) ) ? 'pure-menu-item pure-menu-selected' : 'pure-menu-item';
        $classes[] .= ( $args->has_children ) ? 'pure-menu-has-children' : '';

        /**
         * Filters the arguments for a single nav menu item.
         *
         * @since 4.4.0
         *
         * @param stdClass $args  An object of wp_nav_menu() arguments.
         * @param WP_Post  $item  Menu item data object.
         * @param int      $depth Depth of menu item. Used for padding.
         */

         $args = apply_filters( 'nav_menu_item_args', $args, $item, $depth);

          /**
         * Filters the CSS classes applied to a menu item's list item element.
         *
         * @since 3.0.0
         * @since 4.1.0 The `$depth` parameter was added.
         *
         * @param string[] $classes Array of the CSS classes that are applied to the menu item's `<li>` element.
         * @param WP_Post  $item    The current menu item.
         * @param stdClass $args    An object of wp_nav_menu() arguments.
         * @param int      $depth   Depth of menu item. Used for padding.
         */
        $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args, $depth ) ); 
        $class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';

         /**
         * Filters the ID applied to a menu item's list item element.
         *
         * @since 3.0.1
         * @since 4.1.0 The `$depth` parameter was added.
         *
         * @param string   $menu_id The ID that is applied to the menu item's `<li>` element.
         * @param WP_Post  $item    The current menu item.
         * @param stdClass $args    An object of wp_nav_menu() arguments.
         * @param int      $depth   Depth of menu item. Used for padding.
         */

         $id = apply_filters( 'nav_menu_item_id', 'menu-item-' . $item->ID, $item, $args, $depth );
         $id = $id ? ' id="' . esc_attr( $id ) . '"' : '';

         $output .= $indent . '<li' . $id . $class_names . '>';

         $atts = array();
         $atts['class']     = 'pure-menu-link';
         $atts['title']     = ! empty( $item->attr_title ) ? $item->attr_title : '';
         $atts['target']    = ! empty( $item->target ) ? $item->target : '';

         if ( '_blank' === $item->target && empty( $item->xfn ) ) {
             $atts['rel'] = 'noopener noreferrer';
         } else {
             $atts['rel'] = $item->xfn;
         }

         $atts['href']          = ! empty( $item->url ) ? $item->url : '';
         $atts['aria-current']  = $item->current ? 'page' : '';

         /**
         * Filters the HTML attributes applied to a menu item's anchor element.
         *
         * @since 3.6.0
         * @since 4.1.0 The `$depth` parameter was added.
         *
         * @param array $atts {
         *     The HTML attributes applied to the menu item's `<a>` element, empty strings are ignored.
         *
         *     @type string $title        Title attribute.
         *     @type string $target       Target attribute.
         *     @type string $rel          The rel attribute.
         *     @type string $href         The href attribute.
         *     @type string $aria_current The aria-current attribute.
         * }
         * @param WP_Post  $item  The current menu item.
         * @param stdClass $args  An object of wp_nav_menu() arguments.
         * @param int      $depth Depth of menu item. Used for padding.
         */

         $atts = apply_filters( 'nav_menu_link_attributes', $atts, $item, $args, $depth );

         $attributes = '';
         foreach ( $atts as $attr => $value) {
             if ( is_scalar($value) && '' !== $value && false !== $value ) {
                 $value     = ( 'href' === $attr) ? esc_url( $value ) : esc_attr( $value );
                 $attributes .= ' ' . $attr . '="' . $value . '"';
             }
         }

         /** This filter is documented in wp-includes/post-template.php */
         $title = apply_filters( 'the_title', $item->title, $item->ID );

        /**
         * Filters a menu item's title.
         *
         * @since 4.4.0
         *
         * @param string   $title The menu item's title.
         * @param WP_Post  $item  The current menu item.
         * @param stdClass $args  An object of wp_nav_menu() arguments.
         * @param int      $depth Depth of menu item. Used for padding.
         */

         $title = apply_filters( 'nav_menu_item_title', $title, $item, $args, $depth );

         $item_output = $args->before;
         $item_output .= '<a' . $attributes . '>';
         $item_output .= $args->link_before . $title . $args->link_after;
         $item_output .= '</a>';
         $item_output .= $args->after;

          /**
         * Filters a menu item's starting output.
         *
         * The menu item's starting output only includes `$args->before`, the opening `<a>`,
         * the menu item's title, the closing `</a>`, and `$args->after`. Currently, there is
         * no filter for modifying the opening and closing `<li>` for a menu item.
         *
         * @since 3.0.0
         *
         * @param string   $item_output The menu item's starting HTML output.
         * @param WP_Post  $item        Menu item data object.
         * @param int      $depth       Depth of menu item. Used for padding.
         * @param stdClass $args        An object of wp_nav_menu() arguments.
         */

         $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );

    }

    /**
     * Add has_children check in case $args is not an array
     * Is later being used to add menu-item-has-children class to corresponding li element
     */

    function display_element( $element, &$children_elements, $max_depth, $depth = 0, $args, &$output ) {

        $id_field = $this->db_fields['id'];
        if ( is_object( $args[0] ) ) {
            $args[0]->has_children = ! empty( $children_elements[$element->$id_field] );
        }

        return parent::display_element( $element, $children_elements, $max_depth, $depth, $args, $output );

    }

    
}



?>