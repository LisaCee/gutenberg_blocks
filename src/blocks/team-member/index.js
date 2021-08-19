import './style.editor.scss';
import edit from './edit';
import './parent';
import { registerBlockType } from '@wordpress/blocks';
import { RichText } from "@wordpress/block-editor";
import { __ } from '@wordpress/i18n';

const attributes = {
	title: {
		type: 'string',
		source: 'html',
		selector: 'h4'
	},
	info: {
		type: 'string',
		source: 'html',
		selector: 'p'
	}
}

registerBlockType( 'mytheme-blocks/team-member', {
	title: __( 'Team Member', 'mytheme-blocks' ),
	description: __( 'Block showing a team member', 'mytheme-blocks' ),
	icon: 'admin-users',
	parent: [ 'mytheme-blocks/team-members' ],
	category: 'mytheme-category',
	keywords: [ __( 'team', 'mytheme-blocks' ), __( 'member', 'mytheme-blocks' ), __( 'person', 'mytheme-blocks' ) ],

	attributes,

	save: ( {attributes } ) => {
		const { title, info}  = attributes;
		return (
			<div>
				{ title && (
					<RichText.Content 
						className={ 'wp-block-mytheme-blocks-team-member__title'}
						tagName="h4"
						value= { title }
					/>
				) }
				{ info && (
					<RichText.Content
						className={ 'wp-block-mytheme-blocks-team-member__info'}
						tagName="p"
						value= { info }
					/>
				) }
			</div>
		)
	},
	edit
} );