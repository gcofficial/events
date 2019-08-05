<?php
namespace events;

use \WP_Widget;
use \events\Main;

/**
 * List Widget
 */
class ListWidget extends WP_Widget {
	function __construct() {
		// Instantiate the parent object
		parent::__construct(
			'lolita_events',
			'Lolita Events',
			array( 'description' => 'A widget that displays upcoming events.' )
		);
	}

	function widget( $args, $instance ) {
		$args['title'] = apply_filters( 'widget_title', $instance['title'] );
		echo Main::render(
			$args,
			'widget' . DIRECTORY_SEPARATOR . 'widget'
		);
	}

	function update( $new_instance, $old_instance ) {
		$instance = array();
		$instance['title'] = ( ! empty( $new_instance['title'] ) ) ? strip_tags( $new_instance['title'] ) : '';

		return $instance;
	}

	function form( $instance ) {
		echo Main::render(
			array(
				'title_id'   => $this->get_field_id( 'title' ),
				'title_name' => $this->get_field_name( 'title' ),
				'title'      => ! empty( $instance['title'] ) ? $instance['title'] : 'Lolita Events',
			),
			'widget' . DIRECTORY_SEPARATOR . 'form'
		);
	}
}