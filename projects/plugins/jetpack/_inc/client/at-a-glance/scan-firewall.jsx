import restApi from '@automattic/jetpack-api';
import { getRedirectUrl, numberFormat } from '@automattic/jetpack-components';
import { Spinner } from '@wordpress/components';
import { dateI18n } from '@wordpress/date';
import { createInterpolateElement } from '@wordpress/element';
import { __, _n } from '@wordpress/i18n';
import Card from 'components/card';
import Chart from 'components/chart';
import DashItem from 'components/dash-item';
import { createNotice, removeNotice } from 'components/global-notices/state/notices/actions';
import JetpackBanner from 'components/jetpack-banner';
import analytics from 'lib/analytics';
import {
	getPlanClass,
	getJetpackProductUpsellByFeature,
	FEATURE_SECURITY_SCANNING_JETPACK,
} from 'lib/plans/constants';
import { get, isArray, noop } from 'lodash';
import { getProductDescriptionUrl } from 'product-descriptions/utils';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	isFetchingVaultPressData,
	getVaultPressScanThreatCount,
	getVaultPressData,
} from 'state/at-a-glance';
import {
	hasConnectedOwner as hasConnectedOwnerSelector,
	isOfflineMode,
	connectUser,
} from 'state/connection';
import { isAtomicSite, showBackups } from 'state/initial-state';
import { getScanStatus, isFetchingScanStatus } from 'state/scan';
import { getSitePlan, isFetchingSiteData } from 'state/site';
import { isPluginInstalled } from 'state/site/plugins';
import QueryWafStats from '../components/data/query-waf-stats';
import { getWafStats, isFetchingWafStats } from '../state/waf/reducer';

/**
 *
 */
function barClick() {}

/**
 * @param props
 */
function DashFirewall( props ) {
	const chartData = [];
	if ( props.wafStats ) {
		const dataByDay = props.wafStats.logs.reduce( ( out, row ) => {
			const timestamp = new Date( row.timestamp );
			const key = row.timestamp.substring( 0, 10 );
			if ( ! out[ key ] ) {
				out[ key ] = 0;
			}
			out[ key ]++;
			return out;
		}, {} );

		const d0 = new Date();
		const /* translators: short date format, such as: Jan 12. */
			shortMonthFormat = __( 'M j', 'jetpack' ),
			/* translators: long date format, such as: January 12th. */
			longMonthFormat = __( 'F jS', 'jetpack' );
		d0.setDate( d0.getDate() - 30 );
		for ( let i = 0; i < 30; i++ ) {
			d0.setDate( d0.getDate() + 1 );
			const key = `${ d0.getFullYear() }-${ ( d0.getMonth() + 1 )
				.toString()
				.padStart( 2, '0' ) }-${ d0.getDate().toString().padStart( 2, '0' ) }`;
			const value = dataByDay[ key ] ?? 0;
			const date = Date.parse( d0 );
			chartData.push( {
				label: dateI18n( shortMonthFormat, date ),
				value,
				className: 'statsChartbar',
				tooltipData: [
					{
						label: dateI18n( longMonthFormat, date ),
						value: sprintf(
							/* translators: placeholder is a number */
							__( 'Blocked: %s', 'jetpack' ),
							numberFormat( value )
						),
					},
				],
			} );
		}
	}
	return (
		<div>
			<div className="jp-dash-item">
				<DashItem
					label={ __( 'Firewall', 'jetpack' ) }
					module={ 'firewall' }
					pro={ true }
					overrideContent={
						<div
							className="dops-card jp-dash-item__card jp-at-a-glance__stats-card"
							style={ { flexDirection: 'column' } }
						>
							<div>
								<Chart data={ chartData } barClick={ barClick } />
								{ 0 === chartData.length && <Spinner /> }
							</div>
							<div className="jp-at-a-glance__waf-statsjp-at-a-glance__stats-summary"></div>
						</div>
					}
				/>
			</div>
			<QueryWafStats />
		</div>
	);
}

export default connect(
	state => {
		return {
			isFetchingWafStats: isFetchingWafStats( state ),
			wafStats: getWafStats( state ),
		};
	},
	dispatch => ( {
		createNotice,
		removeNotice,
		connectUser: () => {
			return dispatch( connectUser() );
		},
	} )
)( DashFirewall );
