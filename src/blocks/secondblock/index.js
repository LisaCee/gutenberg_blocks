import './styles.editor.scss';
// var registerBlockType = wp.blocks.registerBlockType;
// const { __ } = wp.i18n;
// These are replaced with deconstructed objects in ES6

// const { registerBlockType } = wp.blocks;
// const __ = wp.i18n.__;
// These are replaced by npm installing packages and adding to externals

import { registerBlockType , createBlock } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { RichText, getColorClassName } from '@wordpress/block-editor';
import Edit from './edit';
import classnames from 'classnames';
import { omit } from 'lodash';

// var el = wp.element.createElement;
// This was replaced with JSX

const attributes = { 
	content: {
		type: 'string',
		source: 'html',
		selector: 'h4',
	},
	alignment: {
		// old attribute
		type: 'string'
	},
	textAlignment: {
		// new attribute
		type: 'string'
	},
	backgroundColor: {
		type: 'string',
	},
	textColor: {
		type: 'string',
	},
	customBackgroundColor: {
		type: 'string'
	},
	customTextColor: {
		type: 'string'
	},
	shadow: {
		type: 'boolean',
		default: false
	},
	shadowOpacity: {
		type: 'number',
		default: 0.3
	}
};

registerBlockType( 'mytheme-blocks/secondblock', {
	title:       __( 'Second Block', 'mytheme-blocks' ),
	description: __( 'Our second block', 'mytheme-blocks' ),
	category:    'mytheme-category',
	icon: {
		// background: '#f03',
		// foreground: '#fff',
		src: <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
	},
	keywords: [ __( 'photo', 'mytheme-blocks' ), 
	__( 'image', 'mytheme-blocks' ) ],
	styles: [
		{
			name: 'rounded',
			label: __( 'Rounded', 'mytheme-blocks' ),
			isDefault: true
		},
		{
			name: 'outline',
			label: __( 'Outline', 'mytheme-blocks' ),
		},
		{
			name: 'squared',
			label: __( 'Squared', 'mytheme-blocks' ),
		}
	], attributes,
	deprecated: [
		{
			// Adding old 'alignment' att and removing newer 'textAlignment'
			attributes: omit( {
				...attributes,
			}, ['textAlignment'] ),
			migrate: ( attributes ) => {
				// update old alignment variable with new textAlignment
				return omit ( {
					...attributes,
					textAlignment: attributes.alignment
				}, ['alignment'] )
			},
			save: ( { attributes } ) => {
				const {
					content,
					alignment,
					backgroundColor,
					textColor,
					customBackgroundColor,
					customTextColor,
					shadow,
					shadowOpacity
				} = attributes;
				
				const backgroundClass = getColorClassName( 'background-color', backgroundColor );
				
				const textClass = getColorClassName( 'color', textColor );
		
				const classes = classnames( {
					// to use a variable as a key in ES6, we put it in []
					[backgroundClass]: backgroundClass,
					[textClass]: textClass,
					'has-shadow': shadow,
					[`shadow-opacity-${shadowOpacity * 100}`]: shadowOpacity
				} );
		
				return ( <RichText.Content
					tagName="p"
					className={ classes }
					value={ content }
					style={ {
						textAlign: alignment,
						backgroundColor: backgroundClass ? undefined : customBackgroundColor,
						color: textClass ? undefined : customTextColor
					} }
					/>
				);
			}
		},
		{
			// supports,
			attributes: omit( {
				...attributes,
				content: {
					type:     'string',
					source:   'html',
					selector: 'p',
				}
			}, ['textAlignment'] ),
			migrate: ( attributes ) => {
				// update old alignment variable with new textAlignment
				return omit ( {
					...attributes,
					textAlignment: attributes.alignment
				}, ['alignment'] )
			},
			save: ( { attributes } ) => {
				const {
					content,
					textAlignment,
					backgroundColor,
					textColor,
					customBackgroundColor,
					customTextColor,
					shadow,
					shadowOpacity
				} = attributes;
				
				const backgroundClass = getColorClassName( 'background-color', backgroundColor );
				
				const textClass = getColorClassName( 'color', textColor );
		
				const classes = classnames( {
					// to use a variable as a key in ES6, we put it in []
					[backgroundClass]: backgroundClass,
					[textClass]: textClass,
					'has-shadow': shadow,
					[`shadow-opacity-${shadowOpacity * 100}`]: shadowOpacity
				} );
		
				return ( <RichText.Content
					tagName="p"
					className={ classes }
					value={ content }
					style={ {
						textAlign: textAlignment,
						backgroundColor: backgroundClass ? undefined : customBackgroundColor,
						color: textClass ? undefined : customTextColor
					} }
					/>
				);
			}
		}
	],
	transforms: {
		from: [
			{
				type: 'block',
				blocks: ['core/paragraph'],
				transform: ( { content, align } ) => {
					return createBlock( 'mytheme-blocks/secondblock', {
						content: content,
						textAlignment: align
					} );
				}
			},
			{
				type: 'prefix',
				prefix: '#',
				transform: ( ) => {
					return createBlock( 'mytheme-blocks/secondblock' );
				}
			}
		],
		to: [
			{
				type: 'block',
				blocks: ['core/paragraph'],
				isMatch: ( { content } ) => {
					if (content) {
						return true
					};
					return false;
				},
				transform: ( { content, textAlignment } ) => {
					return createBlock( 'core/paragraph', {
						content: content,
						align: textAlignment
					} );
				}
			}

		]
	},
	edit: Edit,
	save: ( { attributes } ) => {
		const {
			content,
			textAlignment,
			backgroundColor,
			textColor,
			customBackgroundColor,
			customTextColor,
			shadow,
			shadowOpacity
		} = attributes;
		
		const backgroundClass = getColorClassName( 'background-color', backgroundColor );
		
		const textClass = getColorClassName( 'color', textColor );

		const classes = classnames( {
			// to use a variable as a key in ES6, we put it in []
			[backgroundClass]: backgroundClass,
			[textClass]: textClass,
			'has-shadow': shadow,
			[`shadow-opacity-${shadowOpacity * 100}`]: shadowOpacity
		} );

		return ( <RichText.Content
			tagName="h4"
			className={ classes }
			value={ content }
			style={ {
				textAlign: textAlignment,
				backgroundColor: backgroundClass ? undefined : customBackgroundColor,
				color: textClass ? undefined : customTextColor
			} }
			/>
		);
	}
} )