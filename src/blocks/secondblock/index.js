import './styles.editor.scss';
// var registerBlockType = wp.blocks.registerBlockType;
// const { __ } = wp.i18n;
// These are replaced with deconstructed objects in ES6

// const { registerBlockType } = wp.blocks;
// const __ = wp.i18n.__;
// These are replaced by npm installing packages and adding to externals

import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { RichText, BlockControls, AlignmentToolbar, InspectorControls } from '@wordpress/block-editor';
import { Toolbar, DropdownMenu, PanelBody, ToggleControl, ColorPicker, ColorPalette } from "@wordpress/components";

// var el = wp.element.createElement;
// This was replaced with JSX


registerBlockType( 'mytheme-blocks/secondblock', {
	title:       __( 'Second Block', 'mytheme-blocks' ),
	description: __( 'Our second block', 'mytheme-blocks' ),
	category:    'layout',
	icon: {
		// background: '#f03',
		// foreground: '#fff',
		src: <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
	},
	keywords: [ __( 'photo', 'mytheme-blocks' ), 
	__( 'image', 'mytheme-blocks' ) ],
	attributes: { 
		content: {
			type: 'string',
			source: 'html',
			selector: 'p',
			alignment: {
				type: 'string'
			}
		}
	},
	edit: ( { className, attributes, setAttributes } ) => {
		const { content, alignment } = attributes;
		const onChangeContent = ( content ) => {
			setAttributes( { content } )
		}
		// Can code own alignment function, but WP has AlignmentToolbar component.
		const onChangeAlignment = ( alignment ) => {
			setAttributes( { alignment } )
		}
		
		
		// <> ... </> is a shortcut for fragment, to ensure there is just one object to return

		// BlockControls is the toolbar

		// InspectorControls is the sidebar tools
		return (
			<>
				<InspectorControls>
					<PanelBody title = { __( 'Panel', 'mytheme-blocks' ) }>
						{/* <ToggleControl 
							label = { __( 'Label', 'mytheme-blocks' ) }
							onChange = { (value) => console.log( value ) }
						/> */}
						{/* <ColorPicker
							color = "#f03"
							onChangeComplete = { ( value ) => console.log( value ) }
						/> */}
						<ColorPalette 
							colors = { [
								{ color: 'red' },
								{ color: 'blue' },
								{ color: 'yellow' }
							] }
							onChange = { ( value ) => console.log( value ) }
						/>
					</PanelBody>
				</InspectorControls>
				<BlockControls> 
					<AlignmentToolbar 
						onChange = { onChangeAlignment }
						value = { alignment }
					/>
					<Toolbar 
						// adds dropdown functionality
						isCollapsed
						controls={ [
							{
								icon: 'wordpress',
								title: __('test', 'mytheme-blocks'),
								onClick: () => alert(true),
								isActive: true
							},
							{
								icon: 'wordpress',
								title: __('test', 'mytheme-blocks'),
								onClick: () => alert(true),
								isActive: false
							}
						] }
						/>
					{ ( content && content.length > 0 ) &&
					// Render this toolbar only if there is content
					<Toolbar>
						<DropdownMenu 
							icon="editor-table"
							label={__('test', 'mytheme-blocks')}
							controls={[
								{
									icon: 'wordpress',
									title: __('test1', 'mytheme-blocks'),
									onClick: () => alert(true),
									isActive: true
								},
								{
									icon: 'wordpress',
									title: __('test2', 'mytheme-blocks'),
									onClick: () => alert(true),
									isActive: false
								}
							]}
						/>
					</Toolbar>
					}
				</BlockControls>

				<RichText 
					tagName ="p"
					className ={ className }
					onChange = { onChangeContent }
					value = { content }
					formattingControls = { ['bold'] }
					style={ { textAlign: alignment } }
					/>
			</>
		)
		// return <p className={ className }>Editor</p>;
	},
	save: ( { attributes } ) => {
		const { content, alignment } = attributes;
		return <RichText.Content
			tagName="p"
			value={ content }
			style={ { textAlign: alignment } }
			/>
	}
} )