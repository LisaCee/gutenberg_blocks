<?php
/**
 * Plugin Name: mytheme-blocks
 * Author: LisaCee
 * Author URI: https://lisacanini.com
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** Register my blocks through reusable function, rather than
 * call register_block_type multiple times.

 * @since lesson #26
 *
 * @param object $block The slug for the block.
 * @param array  $options Additional options to add to blocks.
 * @return void
 */
function mytheme_blocks_register_block_type( $block, $options = array() ) {
	register_block_type(
		'mytheme-blocks/' . $block,
		array_merge(
			array(
				'editor_script' => 'mytheme-blocks-editor-script',
				'editor_style'  =>
				'mytheme-blocks-editor-style',
				'script'        => 'mytheme-blocks-script',
				'style'         => 'mytheme-blocks-style',
			),
			$options,
		)
	);
}

/** Register my blocks.

 * @since lesson #26
 *
 * @return void
 */
function mytheme_blocks_register() {
	// editor.
	wp_register_script(
		'mytheme-blocks-editor-script',
		plugins_url(
			'dist/editor.js',
			__FILE__
		),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
			'wp-block-editor',
			'wp-editor',
			'wp-components',
		)
	);
	// UI.
	wp_register_script(
		'mytheme-blocks-script',
		plugins_url(
			'dist/script.js',
			__FILE__
		),
		array(
			'jquery',
		)
	);
	// editor style.
	wp_register_style(
		'mytheme-blocks-editor-style',
		plugins_url(
			'dist/editor.css',
			__FILE__
		),
		array( 'wp-edit-blocks' )
	);
	// ui style.
	wp_register_style(
		'mytheme-blocks-style',
		plugins_url(
			'dist/style.css',
			__FILE__
		),
	);

	mytheme_blocks_register_block_type( 'firstblock' );
	mytheme_blocks_register_block_type( 'secondblock' );
}
add_action( 'init', 'mytheme_blocks_register' );
