/**
 * External dependencies
 */
import React from 'react';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.scss';

/**
 * Generate Record Meter showing how many records the user has indexed
 *
 * @returns {React.Component} RecordMeter React component
 */
export default function RecordMeter() {
	return (
		<div className="jp-search-record-meter jp-search-dashboard-wrap">
			<div className="jp-search-dashboard-row">
				<div className="jp-search-record-meter__title lg-col-span-8 md-col-span-6 sm-col-span-4">
					<h2>{ __( 'Your search records', 'jetpack-search-pkg' ) }</h2>
				</div>
				<div className="lg-col-span-2 md-col-span-1 sm-col-span-0"></div>
			</div>
		</div>
	);
}