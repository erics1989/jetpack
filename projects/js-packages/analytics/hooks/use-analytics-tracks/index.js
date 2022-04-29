/**
 * External dependencies
 */
import { useCallback, useEffect } from 'react';
import { useConnection } from '@automattic/jetpack-connection';
import jetpackAnalytics from '../../index.jsx';

const useAnalyticsTracks = ( {
	pageViewEventName,
	pageViewProjectName = 'jetpack',
	pageViewSuffix = 'page_view',
	pageViewEventProperties = {},
} = {} ) => {
	const { isUserConnected, isRegistered, userConnectionData } = useConnection();
	const { login, ID } = userConnectionData.currentUser?.wpcomUser || {};

	// Tracks
	const { tracks } = jetpackAnalytics;
	const { recordEvent } = tracks;

	const recordEventAsync = useCallback( async ( event, properties ) => {
		tracks.recordEvent( event, properties );
	}, [] );

	const recordEventHandler = useCallback(
		( eventName, properties, callback = () => {} ) => {
			/*
			 * `properties` is optional,
			 * meaning it can be actually the `callback`.
			 */
			callback = typeof properties === 'function' ? properties : callback;
			properties = typeof properties === 'function' ? {} : properties;

			return () => recordEventAsync( eventName, properties ).then( callback );
		},
		[ recordEventAsync ]
	);

	// Initialize Analytics identifying the user.
	useEffect( () => {
		if ( ! ( isUserConnected && ID && login ) ) {
			return;
		}

		jetpackAnalytics.initialize( ID, login );
	}, [ isUserConnected, ID, login ] );

	/*
	 * Track page-view event.
	 * It's considered a page view event
	 * when the component is mounted.
	 */
	useEffect( () => {
		// Also, only run if the site is registered.
		if ( ! isRegistered ) {
			return;
		}

		if ( pageViewEventName ) {
			recordEvent(
				`${ pageViewProjectName }_${ pageViewEventName }_${ pageViewSuffix }`,
				pageViewEventProperties
			);
		}
	}, [ ID, isUserConnected, login, pageViewEventName ] );

	return {
		recordEvent: recordEventAsync,
		recordEventHandler,
	};
};
export default useAnalyticsTracks;