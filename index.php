<?php
/**
 * Plugin Name: Unadorned Announcement Bar
 * Plugin URI: https://github.com/wptrainingteam/unadorned-announcement-bar
 * Description: A companion plugin for a WordPress Developer Blog article.
 * Version: 1.0.1
 * Requires at least: 6.1
 * Requires PHP: 7.4
 * Author: Róbert Mészáros
 * Author URI: https://www.meszarosrob.com/
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * Text Domain: unadorned-announcement-bar
 *
 * @package unadorned-announcement-bar
 */

declare( strict_types=1 );

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the options page.
 */
function unadorned_announcement_bar_settings_page() {
	add_options_page(
		__( 'Unadorned Announcement Bar', 'unadorned-announcement-bar' ),
		__( 'Unadorned Announcement Bar', 'unadorned-announcement-bar' ),
		'manage_options',
		'unadorned-announcement-bar',
		'unadorned_announcement_bar_settings_page_html'
	);
}

add_action( 'admin_menu', 'unadorned_announcement_bar_settings_page' );

/**
 * Outputs the root element for the main React component.
 */
function unadorned_announcement_bar_settings_page_html() {
	printf(
		'<div class="wrap" id="unadorned-announcement-bar-settings">%s</div>',
		esc_html__( 'Loading…', 'unadorned-announcement-bar' )
	);
}

/**
 * Enqueues the necessary styles and script only on the options page.
 *
 * @param string $admin_page The current admin page.
 */
function unadorned_announcement_bar_settings_page_enqueue_style_script( $admin_page ) {
	if ( 'settings_page_unadorned-announcement-bar' !== $admin_page ) {
		return;
	}

	$asset_file = plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	if ( ! file_exists( $asset_file ) ) {
		return;
	}

	$asset = include $asset_file;

	wp_enqueue_script(
		'unadorned-announcement-bar-script',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset['dependencies'],
		$asset['version'],
		array(
			'in_footer' => true,
		)
	);

	wp_enqueue_style(
		'unadorned-announcement-bar-style',
		plugins_url( 'build/index.css', __FILE__ ),
		array_filter(
			$asset['dependencies'],
			function ( $style ) {
				return wp_style_is( $style, 'registered' );
			}
		),
		$asset['version'],
	);
}

add_action( 'admin_enqueue_scripts', 'unadorned_announcement_bar_settings_page_enqueue_style_script' );

/**
 * Registers the setting and defines its type and default value.
 */
function unadorned_announcement_bar_settings() {
	$default = array(
		'message' => __( 'Hello, World!', 'unadorned-announcement-bar' ),
		'display' => true,
		'size'    => 'medium',
	);
	$schema  = array(
		'type'       => 'object',
		'properties' => array(
			'message' => array(
				'type' => 'string',
			),
			'display' => array(
				'type' => 'boolean',
			),
			'size'    => array(
				'type' => 'string',
				'enum' => array(
					'small',
					'medium',
					'large',
					'x-large',
				),
			),
		),
	);

	register_setting(
		'options',
		'unadorned_announcement_bar',
		array(
			'type'         => 'object',
			'default'      => $default,
			'show_in_rest' => array(
				'schema' => $schema,
			),
		)
	);
}

add_action( 'init', 'unadorned_announcement_bar_settings' );

/**
 * Displays the announcement bar on the front-end.
 */
function unadorned_announcement_bar_front_page() {
	$options = get_option( 'unadorned_announcement_bar' );

	if ( ! $options['display'] ) {
		return;
	}

	$css = WP_Style_Engine::compile_css(
		array(
			'background' => 'var(--wp--preset--color--vivid-purple, #9b51e0)',
			'color'      => 'var(--wp--preset--color--white, #ffffff)',
			'padding'    => 'var(--wp--preset--spacing--20, 1.5rem)',
			'font-size'  => $options['size'],
		),
		''
	);

	printf(
		'<div style="%s">%s</div>',
		esc_attr( $css ),
		esc_html( $options['message'] )
	);
}

add_action( 'wp_body_open', 'unadorned_announcement_bar_front_page' );
