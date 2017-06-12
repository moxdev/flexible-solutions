<?php
/**
 * Contact page sidebar.
 *
 *
 * @package MM4 You
 */

function mm4_you_contact_page_sidebar() {
    if(is_page_template('page-contact.php')) {

        $add    = get_theme_mod('setting_address');
        $city   = get_theme_mod('setting_city');
        $state  = get_theme_mod('setting_state');
        $zip    = get_theme_mod('setting_zip');
        $ph     = get_theme_mod('setting_phone');
        $fx     = get_theme_mod('setting_fax');
        $email  = get_theme_mod('setting_email');
        $hours1 = get_theme_mod('setting_hours_1');
        $hours2 = get_theme_mod('setting_hours_2');
        $hours3 = get_theme_mod('setting_hours_3');

        if($hours1 || $hours2 || $hours3) { ?>

            <aside id="office-hours">
                <h2>Office Hours</h2>

                <?php if($hours1): ?>
                    <span class="hours" id="side-hours-1"><?php echo $hours1; ?></span>
                <?php endif;

                if($hours2): ?>
                    <span class="hours" id="side-hours-2"><?php echo $hours2; ?></span>
                <?php endif;

                if($hours3): ?>
                    <span class="hours" id="side-hours-3"><?php echo $hours3; ?></span>
                <?php endif; ?>

            </aside>

        <?php }

        if($add || $city || $state || $zip || $ph || $fx || $email) { ?>

            <aside id="address-phone">
                <h2>Address/Phone</h2>

                <?php if($add): ?>
                    <span class="side-contact" id="side-address-1"><?php echo $add; ?></span>
                <?php endif;

                if($city): ?>
                    <span class="side-contact" id="side-city"><?php echo $city; ?></span><?php endif; if($city || $state || $zip): ?><span class="comma">, </span><?php endif; if($state): ?><span class="side-contact" id="side-state"><?php echo $state; ?> </span><?php endif; if($zip): ?><span class="side-contact" id="side-zip"><?php echo $zip; ?></span>
                <?php endif;

                if($ph): ?>
                    <span class="side-contact" id="side-phone"><a href="tel:<?php echo $ph; ?>" class="tel"><?php echo $ph; ?></a></span>
                <?php endif;

                if($fx): ?>
                    <span class="side-contact" id="side-fax"><a href="fax:<?php echo $fx; ?>" class="tel"><?php echo $fx; ?></a></span>
                <?php endif;

                if($email): ?>
                    <span class="side-contact" id="side-email"><a href="mailto:<?php echo $email; ?>" target="_blank"><?php echo $email; ?></a></span>
                <?php endif; ?>

            </aside>

        <?php } ?>

        <aside id="directions">
            <h2>Get Directions</h2>
            <div id="side-map-canvas" class="map-canvas"></div>
            <form id="form-directions" onSubmit="calcRoute(); return false;">
                <label for="start">Starting Address</label>
                <input type="text" id="start" name="start">
                <input type="hidden" id="end" name="end" value="<?php echo $add . ', ' . $city . ', ' . $state . ' ' . $zip; ?>">
                <div class="error-box" id="map-error"></div>
                <input type="button" onclick="calcRoute();" value="Get Directions" class="btn">
            </form>
            <div id="directions-panel"></div>
        </aside>

    <?php }
}

