import { assign, get } from 'lodash';
import { combineReducers } from 'redux';
import {
	WAF_SETTINGS_FETCH,
	WAF_SETTINGS_FETCH_RECEIVE,
	WAF_SETTINGS_FETCH_FAIL,
	WAF_STATS_FETCH,
	WAF_STATS_FETCH_RECEIVE,
	WAF_STATS_FETCH_FAIL,
} from 'state/action-types';

export const data = ( state = {}, action ) => {
	switch ( action.type ) {
		case WAF_SETTINGS_FETCH_RECEIVE:
			return assign( {}, state, {
				bootstrapPath: action.settings?.bootstrapPath,
				hasRulesAccess: action.settings?.hasRulesAccess,
			} );
		case WAF_STATS_FETCH_RECEIVE:
			return assign( {}, state, {
				stats: action.stats,
			} );
		default:
			return state;
	}
};

export const initialRequestsState = {
	isFetchingWafSettings: false,
	isFetchingWafStats: false,
};

export const requests = ( state = initialRequestsState, action ) => {
	switch ( action.type ) {
		case WAF_SETTINGS_FETCH:
			return assign( {}, state, {
				isFetchingWafSettings: true,
			} );
		case WAF_SETTINGS_FETCH_RECEIVE:
		case WAF_SETTINGS_FETCH_FAIL:
			return assign( {}, state, {
				isFetchingWafSettings: false,
			} );
		case WAF_STATS_FETCH:
			return assign( {}, state, {
				isFetchingWafStats: true,
			} );
		case WAF_STATS_FETCH_RECEIVE:
		case WAF_STATS_FETCH_FAIL:
			return assign( {}, state, {
				isFetchingWafStats: false,
			} );
		default:
			return state;
	}
};

export const reducer = combineReducers( {
	data,
	requests,
} );

/**
 * Returns true if currently requesting the firewall bootstrap file path. Otherwise false.
 *
 * @param  {object}  state - Global state tree
 * @returns {boolean}      Whether the bootstrap path is being requested
 */
export function isFetchingWafSettings( state ) {
	return !! state.jetpack.waf.requests.isFetchingWafSettings;
}

/**
 * Returns true if currently requesting the firewall statistics. Otherwise false.
 *
 * @param  {object}  state - Global state tree
 * @returns {boolean}      Whether the bootstrap path is being requested
 */
export function isFetchingWafStats( state ) {
	return !! state.jetpack.waf.requests.isFetchingWafStats;
}

/**
 * Returns the firewall's bootstrap.php file path.
 *
 * @param  {object}  state - Global state tree
 * @returns {string}  File path to bootstrap.php
 */
export function getWafBootstrapPath( state ) {
	return get( state.jetpack.waf, [ 'data', 'bootstrapPath' ], '' );
}

/**
 * Returns whether the site has access to latest firewall rules.
 *
 * @param {object}  state - Global state tree
 * @returns {boolean}  True when the site has access to latest firewall rules.
 */
export function getWafHasRulesAccess( state ) {
	return get( state.jetpack.waf, [ 'data', 'hasRulesAccess' ], false );
}

/**
 * Returns the firewall statistics.
 *
 * @param {object}  state - Global state tree
 * @returns {object}  Firewall statistics
 */
export function getWafStats( state ) {
	return get( state.jetpack.waf, [ 'data', 'stats' ], false );
}
