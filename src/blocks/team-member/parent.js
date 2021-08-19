import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
// InnerBlocks lets you put blocks inside another block
import { InnerBlocks } from '@wordpress/block-editor';

registerBlockType( 'mytheme-blocks/team-members', {
	title: __( 'Team Members', 'mytheme-blocks' ),
	description: __( 'Grid component for team member blocks', 'mytheme-blocks' ),
	icon: 'grid-view',
	category: 'mytheme-category',
	keywords: [ __( 'team', 'mytheme-blocks' ), __( 'member', 'mytheme-blocks' ), __( 'person', 'mytheme-blocks' ) ],

	edit( { className } ) {
		return (
			<div className={ className }>
				<InnerBlocks 
					allowedBlocks={ [ 'mytheme-blocks/team-member' ] }
					template={ [
						[ 'mytheme-blocks/team-member' ],
						[ 'mytheme-blocks/team-member' ],
					] }
					// templateLock='insert' or 'all'
					// keep users from adding another block or add another block and drag and drop block
				/>
			</div>
		)
	},

	save() {
		return (
			<div>
				<InnerBlocks.Content />
			</div>
		)
	}

})