<?php
/**
 * Photo Gallery for photo gallery page.
 *
 *
 * @package MM4 You
 */

function mm4_you_photo_gallery() {
    if( is_page_template('page-photo-gallery.php') ) {
        if( function_exists('get_field') ) {
            if( have_rows('images') ): ?>

                <div id="gallery-main">
                    <ul>

                    <?php while ( have_rows('images') ) : the_row(); ?>

                        <li>
                            <?php $imageArr = get_sub_field('gallery_image');
                            $image = wp_get_attachment_image_src($imageArr[id], 'gallery-main'); ?>
                            <img src="<?php echo $image[0] ?>" alt="<?php echo $imageArr[alt]; ?>">
                        </li>

                    <?php endwhile; ?>

                    </ul>
                    <button class="carousel-btn" id="prev" aria-controls="galery-main" aria-label="Previous">Previous</button>
                    <button class="carousel-btn" id="next" aria-controls="gallery-main" aria-label="Next">Next</button>
                </div>
            <?php endif;

            if( have_rows('images') ): ?>

                <div id="gallery-thumbs">
                    <ul>

                    <?php while ( have_rows('images') ) : the_row(); ?>

                        <li>
                            <a href="#">
                                <?php $imageArr = get_sub_field('gallery_image');
                                $image = wp_get_attachment_image_src($imageArr[id], 'gallery-thumb'); ?>
                                <img src="<?php echo $image[0] ?>" alt="<?php echo $imageArr[title]; ?>">
                            </a>
                        </li>

                    <?php endwhile; ?>

                    </ul>
                </div>

            <?php endif;
        }
    }
}