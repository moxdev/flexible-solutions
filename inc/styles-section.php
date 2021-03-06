<?php
/**
 * Displays the Styles Section on Product Pages
 *
 *
 * @package MM4 You
 */


function mm4_you_styles_section() {
  if ( function_exists( 'get_field' ) ) {

    $add_styles = get_field( 'add_styles_section' );

    if ( $add_styles ): ?>

    <section class="styles-section">
      <div class="styles-wrapper">

        <?php

        // check if the flexible content field has rows of data
        if( have_rows('styles_section') ):

             // loop through the rows of data
            while ( have_rows('styles_section') ) : the_row();

                if( get_row_layout() == 'styles_image_repeater' ):

                  $header  = get_sub_field('section_header');
                  $product = get_sub_field('product'); ?>

                  <div class="styles-image-repeater-wrapper">

                  <?php if ( $header ): ?>

                    <h2 class="entry-sub-title"><?php echo esc_html( $header ); ?></h2>

                  <?php endif;

                  if ( $product ): ?>

                    <?php if( have_rows('product') ): ?>

                        <div class="product-wrapper">

                        <?php while( have_rows('product') ): the_row();

                            $title = get_sub_field('title');
                            $sub   = get_sub_field('sub_title');
                            $img   = get_sub_field('image');

                            ?>

                            <div class="product-inner-wrapper">

                                <?php if( $title ): ?>

                                  <div class="title">
                                    <span><?php echo esc_html( $title ); ?></span>

                                    <?php if ($sub): ?>
                                      <span><?php echo esc_html( $sub ); ?></span>
                                    <?php endif ?>

                                  </div><!-- title -->

                                <?php endif; ?>

                                <?php if( $img ): ?>

                                  <div class="image-wrapper">
                                    <img src="<?php echo $img['sizes']['styles-image-square']; ?>" alt="<?php echo $img['alt']; ?>" description="<?php echo $img['description']; ?>">
                                  </div>

                                <?php endif; ?>

                            </div><!-- product-inner-wrapper -->

                        <?php endwhile; ?>

                        </div><!-- product-wrapper -->

                    <?php endif; ?>

                  <?php endif; ?>

                  </div><!-- styles-image-repeater-wrapper -->

                <?php elseif( get_row_layout() == 'styles_image_description_repeater' ):

                  $header  = get_sub_field('section_header');
                  $editor  = get_sub_field('text_editor');
                  $product = get_sub_field('product'); ?>

                  <div class="styles-image-description-repeater-wrapper">

                  <?php if ( $header ): ?>

                    <h2 class="entry-sub-title"><?php echo esc_html( $header ); ?></h2>

                  <?php endif; ?>

                  <?php if ( $editor ):

                    echo $editor;

                  endif; ?>

                  <?php if ( $product ): ?>

                    <?php if( have_rows('product') ): ?>

                        <div class="product-wrapper">

                        <?php while( have_rows('product') ): the_row();

                            $img   = get_sub_field('image');
                            $title = get_sub_field('title');
                            $sub   = get_sub_field('sub_title');
                            $desc   = get_sub_field('description');

                            ?>

                            <div class="product-inner-wrapper">

                              <?php if( $img ): ?>

                                <div class="image-wrapper">
                                  <img src="<?php echo $img['sizes']['styles-image-custom']; ?>" alt="<?php echo $img['alt']; ?>" description="<?php echo $img['description']; ?>">
                                </div>

                              <?php endif; ?>

                              <?php if( $title ): ?>

                                <div class="title">
                                  <span><?php echo esc_html( $title ); ?></span>

                                  <?php if ($sub): ?>
                                    <span><?php echo esc_html( $sub ); ?></span>
                                  <?php endif ?>

                                </div><!-- title -->

                              <?php endif; ?>

                              <?php if ( $desc ): ?>

                                <div class="description">
                                  <?php echo $desc; ?>
                                </div>

                              <?php endif ?>

                            </div><!-- product-inner-wrapper -->

                        <?php endwhile; ?>

                        </div><!-- product-wrapper -->

                    <?php endif; ?>

                  <?php endif; ?>

                  </div><!-- styles-image-description-repeater-wrapper  -->
                <?php elseif( get_row_layout() == 'styles_image_description_flex' ):

                  $header  = get_sub_field('section_header');
                  $editor  = get_sub_field('text_editor');
                  $product = get_sub_field('product'); ?>

                  <div class="styles-image-description-flex-wrapper">

                  <?php if ( $header ): ?>

                    <h2 class="entry-sub-title"><?php echo esc_html( $header ); ?></h2>

                  <?php endif; ?>

                  <?php if ( $editor ):

                    echo $editor;

                  endif; ?>

                  <?php if ( $product ): ?>

                    <?php if( have_rows('product') ): ?>

                        <div class="product-wrapper">

                        <?php while( have_rows('product') ): the_row();

                            $img   = get_sub_field('image');
                            $title = get_sub_field('title');
                            $sub   = get_sub_field('sub_title');
                            $desc   = get_sub_field('description');

                            ?>

                            <div class="product-inner-wrapper">

                              <?php if( $img ): ?>

                                <div class="image-wrapper">
                                  <img src="<?php echo $img['sizes']['styles-image-custom']; ?>" alt="<?php echo $img['alt']; ?>" description="<?php echo $img['description']; ?>">
                                </div>

                              <?php endif; ?>

                              <?php if( $title ): ?>

                                <div class="title">
                                  <span><?php echo esc_html( $title ); ?></span>

                                  <?php if ($sub): ?>
                                    <span><?php echo esc_html( $sub ); ?></span>
                                  <?php endif ?>

                                </div><!-- title -->

                              <?php endif; ?>

                              <?php if ( $desc ): ?>

                                <div class="description">
                                  <?php echo $desc; ?>
                                </div>

                              <?php endif ?>

                            </div><!-- product-inner-wrapper -->

                        <?php endwhile; ?>

                        </div><!-- product-wrapper -->

                    <?php endif; ?>

                  <?php endif; ?>

                  </div><!-- styles-image-description-flex-wrapper  -->

                <?php elseif( get_row_layout() == 'styles_image_section_repeater' ):

                  $header  = get_sub_field('section_header');
                  $editor  = get_sub_field('text_editor');
                  $product = get_sub_field('product'); ?>

                  <div class="styles-image-section-repeater-wrapper">

                    <?php if ( $header ): ?>

                      <h2 class="entry-sub-title"><?php echo esc_html( $header ); ?></h2>

                    <?php endif; ?>

                    <?php if ( $editor ):

                      echo $editor;

                    endif; ?>

                    <?php if ( $product ): ?>

                    <?php if( have_rows('product') ): ?>

                        <div class="product-section-wrapper">

                        <?php while( have_rows('product') ): the_row();

                            $img   = get_sub_field('image'); ?>

                            <div class="product-section-inner-wrapper">

                              <?php if( $img ): ?>

                                <img src="<?php echo $img['sizes']['styles-image-tall']; ?>" alt="<?php echo $img['alt']; ?>" description="<?php echo $img['description']; ?>">

                              <?php endif; ?>

                            </div><!-- product-section-inner-wrapper -->

                        <?php endwhile; ?>

                        </div><!-- product-section-wrapper -->

                    <?php endif; ?>

                  <?php endif; ?>

                  </div><!-- styles-image-section-repeater-wrapper -->

                <?php endif;

            endwhile;

        else :

            // no layouts found

        endif;

        ?>

      </div><!-- styles-wrapper -->
    </section><!-- styles-section -->

    <?php endif;
  }
}