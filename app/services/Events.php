<?php
namespace events;

use \LolitaFramework\LF;
use \LolitaFramework\Data\Chain;
use \events\EventDecorator;
use \events\Main;
/**
 * Events service
 */
class Events {

	public static function get() {
		wp_send_json_success(
			self::all_events( $_POST['from'], $_POST['to'] )
		);
	}

	public static function all_events( $from, $to ) {
		return Chain::of(
			get_posts(
				array(
					'numberposts'      => -1,
					'orderby'          => 'date',
					'order'            => 'DESC',
					'post_type'        => 'event',
					'post_status'      => 'publish',
					'suppress_filters' => true,
					'meta_query' => array(
						array(
							'key' => 'from',
							'value' => array($from, $to),
							'compare' => 'BETWEEN',
							'type' => 'DATE'
						),
					),
				)
			)
		)
		->map(
			function( $p ) {
				return Chain::of($p)
					->bind( array( '\events\EventDecorator', 'all_meta' ) )
					->bind( array( '\events\EventDecorator', 'set_defaults_meta' ) )
					->bind( array( '\events\EventDecorator', 'image' ) )
					->bind(
						function( $p ) {
							return (array) $p;
						}
					)
					->forget(
						array(
							'filter',
							'post_mime_type',
							'post_type',
							'menu_order',
							'guid',
							'post_parent',
							'post_content_filtered',
							'pinged',
							'to_ping',
							'post_password',
							'ping_status',
							'comment_status',
							'post_status',
							'post_excerpt',
						)
					)
					->value();
			}
		)
		->value();
	}

	public static function shortcode( $atts, $content = '' ) {
		return Main::render(array(), 'events-widget');
	}
}