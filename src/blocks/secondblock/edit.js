import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { RichText, BlockControls, AlignmentToolbar, InspectorControls, PanelColorSettings, withColors, ContrastChecker } from '@wordpress/block-editor';
import { Toolbar, DropdownMenu, PanelBody, ToggleControl, ColorPicker, ColorPalette, RangeControl } from "@wordpress/components";
import classnames from 'classnames';

class Edit extends Component {

	onChangeContent = ( content ) => {
		this.props.setAttributes( { content } )
	}
	// Can code own alignment function, but WP has AlignmentToolbar component.
	onChangeAlignment = ( alignment ) => {
		this.props.setAttributes( { textAlignment } )
	}

	// onChangeBackgroundColor = ( backgroundColor ) => {
	// 	this.props.setAttributes( { backgroundColor } )
	// }

	// onChangeTextColor = ( textColor ) => {
	// 	this.props.setAttributes( { textColor } )
	// }

	toggleShadow = () => {
		this.props.setAttributes( { shadow: !this.props.attributes.shadow } );
	}
	onChangeShadowOpacity = ( shadowOpacity ) => {
		this.props.setAttributes( { shadowOpacity } )
	}
	render() {
		const { className, attributes, setTextColor, setBackgroundColor, backgroundColor, textColor } = this.props;
		const { content, textAlignment, shadow, shadowOpacity } = attributes;
		const classes = classnames( className, {
			'has-shadow': shadow,
			[`shadow-opacity-${shadowOpacity * 100}`]: shadowOpacity
		});
		return (
			<>
			<InspectorControls>
				<PanelBody title= { __( 'Settings', 'mytheme-blocks' ) }>
					{ shadow &&
						<RangeControl 
							label = { __( 'Shadow Opacity', 'mytheme-blocks' ) }
							value = { shadowOpacity }
							onChange= { this.onChangeShadowOpacity }
							min  = {0.1}
							max  = {0.4}
							step = {0.1}
						/>
					}
				</PanelBody>
				<PanelColorSettings 
					title={ __( 'Panel', 'mytheme-blocks' ) }
					colorSettings={
						[
							{
								value: backgroundColor.color,
								onChange: setBackgroundColor,
								label: __( 'Background color', 'mytheme-blocks' )
							},
							{
								value: textColor.color,
								onChange: setTextColor,
								label: __( 'Text color', 'mytheme-blocks' )
							}
						]
					}
					>
						<ContrastChecker
							textColor={textColor.color}
							backgroundColor={backgroundColor.color}
						/>
				</PanelColorSettings>
			</InspectorControls>
			<BlockControls
				controls = {
					[
						{
							icon: 'wordpress',
							title: __('Shadow', 'mytheme-blocks'),
							onClick: this.toggleShadow,
							isActive: shadow
						}
					]
				}
			> 
				<AlignmentToolbar 
					onChange = { this.onChangeAlignment }
					value = { textAlignment }
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
				tagName ="h4"
				className ={ classes }
				onChange = { this.onChangeContent }
				value = { content }
				formattingControls = { ['bold'] }
				style={ { textAlign: textAlignment, backgroundColor: backgroundColor.color, color: textColor.color } }
				/>
		</>
	)
// return <p className={ className }>Editor</p>;
	}
}

export default withColors( 'backgroundColor', {'textColor': 'color'} )(Edit);
