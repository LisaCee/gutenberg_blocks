import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { RichText, BlockControls, AlignmentToolbar, InspectorControls, PanelColorSettings, withColors, ContrastChecker } from '@wordpress/block-editor';
import { Toolbar, DropdownMenu, PanelBody, ToggleControl, ColorPicker, ColorPalette } from "@wordpress/components";

class Edit extends Component {

	onChangeContent = ( content ) => {
		this.props.setAttributes( { content } )
	}
	// Can code own alignment function, but WP has AlignmentToolbar component.
	onChangeAlignment = ( alignment ) => {
		this.props.setAttributes( { alignment } )
	}

	// onChangeBackgroundColor = ( backgroundColor ) => {
	// 	this.props.setAttributes( { backgroundColor } )
	// }

	// onChangeTextColor = ( textColor ) => {
	// 	this.props.setAttributes( { textColor } )
	// }
	
	render() {
		const { className, attributes, setTextColor, setBackgroundColor, backgroundColor, textColor } = this.props;
		const { content, alignment } = attributes;

		return (
			<>
			<InspectorControls>
				{/* <PanelBody title = { __( 'Panel', 'mytheme-blocks' ) }> */}
					{/* <ToggleControl 
						label = { __( 'Label', 'mytheme-blocks' ) }
						onChange = { (value) => console.log( value ) }
					/> */}
					{/* <ColorPicker
						color = "#f03"
						onChangeComplete = { ( value ) => console.log( value ) }
					/> */}
					{/* <ColorPalette 
						colors = { [
							{ color: 'red' },
							{ color: 'blue' },
							{ color: 'yellow' }
						] }
						onChange = { onChangeBackgroundColor }
					/> */}

				{/* </PanelBody> */}
				{/* PanelColorSettings replaces the panel and the color palette/picker */}
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
			<BlockControls> 
				<AlignmentToolbar 
					onChange = { this.onChangeAlignment }
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
				onChange = { this.onChangeContent }
				value = { content }
				formattingControls = { ['bold'] }
				style={ { textAlign: alignment, backgroundColor: backgroundColor.color, color: textColor.color } }
				/>
		</>
	)
// return <p className={ className }>Editor</p>;
	}
}

export default withColors( 'backgroundColor', {'textColor': 'color'} )(Edit);
