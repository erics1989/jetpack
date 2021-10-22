/**
 * External dependencies
 */
import React, { Fragment, useMemo } from 'react';
import { connect } from 'react-redux';
import { __ } from '@wordpress/i18n';

/**
 * WordPress dependencies
 */
import { useSelect, select, useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { JetpackFooter, JetpackLogo } from '@automattic/jetpack-components';
import restApi from '@automattic/jetpack-api';
import ModuleControl from 'components/module-control';
import MockedSearch from 'components/mocked-search';
import { STORE_ID } from './store';
import 'scss/rna-styles.scss';
import 'style.scss';

/**
 * State dependencies
 */
// import { isFetchingSitePurchases } from 'state/site';
// import {
// 	setInitialState,
// 	getApiNonce,
// 	getApiRootUrl,
// 	getSiteAdminUrl,
// 	getTracksUserData,
// 	getCurrentVersion,
// } from 'state/initial-state';

// const useComponentWillMount = func => {
// 	// eslint-disable-next-line react-hooks/exhaustive-deps
// 	useMemo(func, []);
// };

/**
 * SearchDashboard component definition.
 *
 * @param {object} props - Component properties.
 * @returns {React.Component} Search dashboard component.
 */
export default function SearchDashboard( props ) {
	const siteAdminUrl = select( STORE_ID ).getSiteAdminUrl();

	const { queryJetpackSettings } = useDispatch( STORE_ID );

	// const initializeAnalytics = () => {
	// 	const tracksUser = props.tracksUserData;

	// 	if (tracksUser) {
	// 		analytics.initialize(tracksUser.userid, tracksUser.username, {
	// 			blog_id: tracksUser.blogid,
	// 		});
	// 	}
	// };

	useMemo( async () => {
		const apiRootUrl = select( STORE_ID ).getAPIRootUrl();
		const apiNonce = select( STORE_ID ).getAPINonce();
		apiRootUrl && restApi.setApiRoot( apiRootUrl );
		apiNonce && restApi.setApiNonce( apiNonce );
		// initializeAnalytics();
		// analytics.tracks.recordEvent('jetpack_search_admin_page_view', {
		// 	current_version: props.currentVersion,
		// });
	}, [] );

	const aboutPageUrl = siteAdminUrl + 'admin.php?page=jetpack_about';

	const renderHeader = () => {
		return (
			<div className="jp-search-dashboard-header jp-search-dashboard-wrap">
				<div className="jp-search-dashboard-row">
					<div className="lg-col-span-12 md-col-span-8 sm-col-span-4">
						<div className="jp-search-dashboard-header__logo-container">
							<JetpackLogo className="jp-search-dashboard-header__masthead" />
						</div>
					</div>
				</div>
			</div>
		);
	};

	const renderMockedSearchInterface = () => {
		return (
			<div className="jp-search-dashboard-top jp-search-dashboard-wrap">
				<div className="jp-search-dashboard-row">
					<div className="jp-search-dashboard-top__title lg-col-span-6 md-col-span-7 sm-col-span-4">
						<h1>
							{ __( "Help your visitors find exactly what they're looking for, fast", 'jetpack' ) }
						</h1>
					</div>
					<div className=" lg-col-span-6 md-col-span-1 sm-col-span-0"></div>
				</div>
				<div className="jp-search-dashboard-row" aria-hidden="true">
					<div className="lg-col-span-1 md-col-span-1 sm-col-span-0"></div>
					<div className="jp-search-dashboard-top__mocked-search-interface lg-col-span-10 md-col-span-6 sm-col-span-4">
						<MockedSearch />
					</div>
					<div className="lg-col-span-1 md-col-span-1 sm-col-span-0"></div>
				</div>
			</div>
		);
	};

	const renderAdminSection = () => {
		return (
			<div className="jp-search-dashboard-bottom">
				<ModuleControl />
			</div>
		);
	};

	const renderFooter = () => {
		return (
			<div className="jp-search-dashboard-footer jp-search-dashboard-wrap">
				<div className="jp-search-dashboard-row">
					<JetpackFooter
						a8cLogoHref={ aboutPageUrl }
						moduleName={ __( 'Jetpack Search', 'jetpack' ) }
						className="lg-col-span-12 md-col-span-8 sm-col-span-4"
					/>
				</div>
			</div>
		);
	};

	return (
		<div className="jp-search-dashboard-page">
			{ props.isLoading && (
				<img
					className="jp-search-dashboard-page-loading-spinner"
					width="32"
					height="32"
					alt={ __( 'Loading', 'jetpack' ) }
					src="//en.wordpress.com/i/loading/loading-64.gif"
				/>
			) }
			{ ! props.isLoading && (
				<Fragment>
					{ renderHeader() }
					{ renderMockedSearchInterface() }
					{ renderAdminSection() }
					{ renderFooter() }
				</Fragment>
			) }
		</div>
	);
}

// export default connect(
// 	state => {
// 		return {
// 			apiRootUrl: getApiRootUrl( state ),
// 			apiNonce: getApiNonce( state ),
// 			isLoading: isFetchingSitePurchases( state ),
// 			siteAdminUrl: getSiteAdminUrl( state ),
// 			tracksUserData: getTracksUserData( state ),
// 			currentVersion: getCurrentVersion( state ),
// 		};
// 	},
// 	{ setInitialState }
// )( SearchDashboard );
