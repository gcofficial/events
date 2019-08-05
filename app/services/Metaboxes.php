<?php
namespace events;

use \events\Main;
use \events\EventDecorator;
use \LolitaFramework\Data\Loc;
use \LolitaFramework\LF;

/**
 * Metaboxes service
 */
class Metaboxes {
	public static function options() {
		$p = EventDecorator::set_defaults_meta( EventDecorator::all_meta( Loc::post() ) );
		echo Main::render(
			array( 'p' => $p ),
			'event-options'
		);
	}

	public static function save_post($post_id, $post = '') {
		if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
			return;
		}
		if ( array_key_exists( 'post_ID', $_POST ) ) {
			$meta = array(
				array( $_POST['post_ID'], 'location', $_POST['location'] ),
				array( $_POST['post_ID'], 'from', $_POST['from'] ),
				array( $_POST['post_ID'], 'to', $_POST['to'] ),
			);
			LF::map(
				$meta,
				function( $el ) {
					list( $post_id, $meta_key, $meta_value ) = $el;
					update_post_meta( $post_id, $meta_key, $meta_value );
				}
			);
		}
	}
}