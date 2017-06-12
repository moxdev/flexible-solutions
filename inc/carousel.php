<?php
/**
 * Homepage carousel.
 *
 *
 * @package MM4 You
 */

function mm4_you_home_carousel_body_class( $classes ) {
    // Adds a class of group-blog to blogs with more than 1 published author.
    if ( is_page_template('frontpage-a.php') || is_page_template('frontpage-b.php') || is_page_template('frontpage-c.php') && function_exists('get_field') ) {
        if( get_field('add_image_carousel') == 'Yes' )
        $classes[] = 'has-carousel';
    }

    return $classes;
}
add_filter( 'body_class', 'mm4_you_home_carousel_body_class' );


function mm4_you_home_carousel_type_1() {
    if( is_page_template('frontpage-a.php') || is_page_template('frontpage-b.php') ) {
        if( function_exists('get_field') ) {

            $addCarousel = get_field('add_image_carousel');

            if( $addCarousel == 'Yes' && have_rows('slides') ): ?>

                <div id="home-carousel" class="carousel-type-1">
                    <ul>

                    <?php while ( have_rows('slides') ) : the_row(); ?>

                        <li>
                            <?php $text = get_sub_field('slide_caption');
                            $imageArr = get_sub_field('slide_image');
                            $image = wp_get_attachment_image_src($imageArr[id], 'front-page-slide-1'); ?>
                            <img src="<?php echo $image[0] ?>" alt="<?php echo $imageArr[title]; ?>">
                            <span><?php echo $text; ?></span>
                        </li>
                    <?php endwhile; ?>

                    </ul>

                    <?php $rows = get_field('slides');
                    $rowCount = count($rows); ?>

                    <ol class="carousel-nav">
                        <?php for ($i = 1; $i <= $rowCount; $i++) { ?>
                            <li><a href="#"><?php echo $i; ?></a></li>
                        <?php } ?>
                    </ol>
                </div>

            <?php endif;
        }
    }
}

function mm4_you_home_carousel_type_2() {
    if( is_page_template('frontpage-c.php') ) {
        if( function_exists('get_field') ) {

            $addCarousel = get_field('add_image_carousel');

            if( $addCarousel == 'Yes' && have_rows('slides') ): ?>

                <div id="home-carousel" class="carousel-type-2">
                    <ul>

                    <?php while ( have_rows('slides') ) : the_row(); ?>

                        <li>
                            <?php $imageArr = get_sub_field('slide_image');
                            $image = wp_get_attachment_image_src($imageArr[id], 'front-page-slide-2'); ?>
                            <img src="<?php echo $image[0] ?>" alt="<?php echo $imageArr[title]; ?>">
                        </li>

                    <?php endwhile; ?>

                    </ul>
                </div>

            <?php endif;
        }
    }
}

function mm4_you_home_carousel_type_2_controls() {
    if( is_page_template('frontpage-c.php') ) {
        if( function_exists('get_field') ) {

            $addCarousel = get_field('add_image_carousel');

            if( $addCarousel == 'Yes' && have_rows('slides') ):

                $rows = get_field('slides');
                $rowCount = count($rows); ?>

                <ol class="carousel-nav">
                    <?php for ($i = 1; $i <= $rowCount; $i++) { ?>
                        <li><a href="#"><?php echo $i; ?></a></li>
                    <?php } ?>
                </ol>

        <?php endif;
        }
    }
}

