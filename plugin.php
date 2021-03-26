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
				// 'script'        => '',
				// 'style'         => '',
				// 'editor_style'  => '',
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
		)
	);
	mytheme_blocks_register_block_type( 'firstblock' );
	// mytheme_blocks_register_block_type( 'secondblock', array() );
}
add_action( 'init', 'mytheme_blocks_register' );
