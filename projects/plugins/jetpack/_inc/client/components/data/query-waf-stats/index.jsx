import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { isOfflineMode } from 'state/connection';
import { fetchWafStats, isFetchingWafStats } from 'state/waf';

class QueryWafStats extends Component {
	static propTypes = {
		isFetchingWafStats: PropTypes.bool,
		isOfflineMode: PropTypes.bool,
	};

	static defaultProps = {
		isFetchingWafStats: false,
		isOfflineMode: false,
	};

	componentDidMount() {
		if ( ! this.props.isFetchingWafStats && ! this.props.isOfflineMode ) {
			this.props.fetchWafStats();
		}
	}

	render() {
		return null;
	}
}

export default connect(
	state => {
		return {
			isFetchingWafStats: isFetchingWafStats( state ),
			isOfflineMode: isOfflineMode( state ),
		};
	},
	dispatch => {
		return {
			fetchWafStats: () => dispatch( fetchWafStats() ),
		};
	}
)( QueryWafStats );
