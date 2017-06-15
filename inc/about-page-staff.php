<?php
/**
 * Displays the Materials Section Disclaimer on Product Pages
 *
 *
 * @package MM4 You
 */


function mm4_you_about_page_staff_section() {
  if ( function_exists( 'get_field' ) ) {

    $header        = get_field( 'section_header' );
    $staff_section = get_field( 'employee_information' );

    if ( $header ): ?>

    <section class="staff-section">
      <div class="staff-section-wrapper">

        <h2><?php echo esc_html( $header ); ?></h2>

        <?php if ( $staff_section): ?>

          <?php if( have_rows('employee_information') ): ?>

              <div class="employee-wrapper">

              <?php while( have_rows('employee_information') ): the_row();

                  $employee = get_sub_field('employee');

                  ?>

                  <div class="employee-inner-wrapper">

                      <?php if( $employee ):

                        echo $employee;

                      endif; ?>

                  </div><!-- employee-inner-wrapper -->

              <?php endwhile; ?>

              </div><!-- employee-wrapper -->

          <?php endif; ?>

        <?php endif ?>

      </div><!-- staff-section-wrapper -->
    </section><!-- staff-section -->

    <?php endif;
  }
}