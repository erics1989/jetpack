/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import { VideoPressIcon as icon } from '../../../shared/icons';
import attributes from './attributes';
import edit from './edit';
import save from './save';
import './style.scss';

export const name = 'videopress-block';
export const title = __( 'VideoPress', 'jetpack' );
export const settings = {
	title,
	description: __(
		'Embed a video from your media library or upload a new one with VideoPress.',
		'jetpack'
	),
	icon,
	category: 'media',
	edit,
	save,
	attributes,
	supports: {
		align: true,
	},
};