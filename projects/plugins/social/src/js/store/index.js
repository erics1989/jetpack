import actions from './actions';
import controls from './controls';
import reducer from './reducer';
import resolvers from './resolvers';
import selectors from './selectors';

export const STORE_ID = 'jetpack-social-plugin';
export const storeConfig = {
	reducer,
	actions,
	selectors,
	resolvers,
	controls,
	initialState: window.jetpackSocialInitialState || {},
};
