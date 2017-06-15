<?php
/**
 * Displays the Materials Section Disclaimer on Product Pages
 *
 *
 * @package MM4 You
 */


function mm4_you_materials_disclaimer() {
  if ( function_exists( 'get_field' ) ) {

    $disclaimer = get_field( 'disclaimer' );

    if ( $disclaimer ) { ?>

      <div class="disclaimer">
        <p><?php echo esc_html( $disclaimer ); ?></p>
      </div>

     <?php

    }
  }
}