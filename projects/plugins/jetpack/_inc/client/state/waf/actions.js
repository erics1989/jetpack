import restApi from '@automattic/jetpack-api';
import {
	WAF_SETTINGS_FETCH,
	WAF_SETTINGS_FETCH_RECEIVE,
	WAF_SETTINGS_FETCH_FAIL,
	WAF_STATS_FETCH,
	WAF_STATS_FETCH_RECEIVE,
	WAF_STATS_FETCH_FAIL,
} from 'state/action-types';

export const fetchWafSettings = () => {
	return dispatch => {
		dispatch( {
			type: WAF_SETTINGS_FETCH,
		} );
		return restApi
			.fetchWafSettings()
			.then( settings => {
				dispatch( {
					type: WAF_SETTINGS_FETCH_RECEIVE,
					settings,
				} );
				return settings;
			} )
			.catch( error => {
				dispatch( {
					type: WAF_SETTINGS_FETCH_FAIL,
					error: error,
				} );
			} );
	};
};

export const fetchWafStats = () => {
	return dispatch => {
		dispatch( {
			type: WAF_STATS_FETCH,
		} );
		return restApi
			.fetchWafStats()
			.then( settings => {
				dispatch( {
					type: WAF_STATS_FETCH_RECEIVE,
					settings,
				} );
				return settings;
			} )
			.catch( error => {
				dispatch( {
					type: WAF_STATS_FETCH_FAIL,
					error: error,
				} );
			} );
	};
};
