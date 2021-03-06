<?php
/**
 * Highlight Boxes for the homepage.
 *
 *
 * @package MM4 You
 */


function mm4_you_highlight_boxes() {
    if(is_page_template('frontpage-a.php') || is_page_template('frontpage-b.php') ) {

        if( function_exists('get_field') ) {

            $rows          = get_field('highlights');
            $rowCount      = count($rows);
            $addHighlights = get_field('add_highlight_boxes');

            if( $addHighlights == 'Yes' && have_rows('highlights') ): ?>

                <div id="home-highlight-wrapper" class="highlight-<?php echo $rowCount; ?>">
                    <div id="home-highlight-inner-wrapper">
                        <div class="highlight-container">

                        </div>

                        <?php while( have_rows('highlights') ): the_row();

                            $title   = get_sub_field('highlight_title');
                            $desc    = get_sub_field('highlight_description');
                            $linkTxt = get_sub_field('highlight_link_text');
                            $url     = get_sub_field('highlight_url');
                            $img     = get_sub_field('highlight_image');
                            $img_url = $img['url'];

                            echo '<div class="home-highlight"';

                                if( $img ) {
                                    echo ' style="background-image:url("';
                                }

                            echo '>'; ?>

                                <div class="highlight-content-wrapper">

                                    <?php if($title): ?>
                                        <span class="highlight-title"><?php echo $title; ?></span>
                                    <?php endif;

                                    if($desc): ?>
                                        <span class="highlight-desc"><?php echo $desc; ?></span>
                                    <?php endif;

                                    if($url): ?>
                                        <span class="highlight-url"><a href="<?php echo $url; ?>"><?php echo esc_html( $linkTxt ); ?></a></span>
                                    <?php endif; ?>

                                </div><!-- highlight-content-wrapper -->
                            </div><!-- home-highlight -->
                        <?php endwhile; ?>

                    </div>
                </div>
            <?php endif;
        }
    }
}

/*
<?php if($img) : ?>
    <img src="<?php echo $img['sizes']['home-highlight-image']; ?>" alt="<?php echo $img['alt']; ?>" description="<?php echo $img['description']; ?>">
<?php endif;



<div class="home-highlight" style="background-image: url(<?php echo $img['url']; ?>)">

. 'if ($img) {style='background-image: url(<?php echo $img['url']; ?>)'} ?>"



THis works
echo "<div class='home-highlight' . 'if ($img) { style='background-color:#000'} >";


if( $img ) {
    echo ' style="background-image:url(' . $img['url']; . ');"';
}

*/