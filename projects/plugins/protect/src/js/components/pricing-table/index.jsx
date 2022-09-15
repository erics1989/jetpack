/**
 * External dependencies
 */
import {
	Button,
	ProductPrice,
	PricingTable,
	PricingTableColumn,
	PricingTableHeader,
	PricingTableItem,
} from '@automattic/jetpack-components';
import { useConnection, ToS } from '@automattic/jetpack-connection';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import styles from './styles.module.scss';
// import useAnalyticsTracks from '../../hooks/use-analytics-tracks';

/**
 * Product Detail component.
 * ToDo: rename event handler properties.
 *
 * @param {object} props              - Component props.
 * @param {Function} props.onAdd      - Callback when adding protect product successfully
 * @param {Function} props.onAddError - Callback when adding protect product fails
 * @returns {object}                    ConnectedPricingTable react component.
 */
const ConnectedPricingTable = ( { onAdd, onAddError } ) => {
	const args = {
		title: __( 'Stay one step ahead of threats', 'jetpack-protect' ),
		items: [
			__( 'Scan for threats and vulnerabilities', 'jetpack-protect' ),
			__( 'Daily automated scans', 'jetpack-protect' ),
			__( 'Access to scan on Cloud', 'jetpack-protect' ),
			__( 'One-click auto fixes', 'jetpack-protect' ),
			__( 'Notifications', 'jetpack-protect' ),
			__( 'Severity labels', 'jetpack-protect' ),
		],
	};

	const { siteIsRegistering, handleRegisterSite, registrationError } = useConnection( {
		skipUserConnection: true,
	} );

	// 	const { recordEvent } = useAnalyticsTracks();

	const onAddHandler = useCallback( () => {
		// Record event in case the site did register.
		return handleRegisterSite()
			.then( () => {
				// recordEvent( 'jetpack_protect_offer_connect_product_activated' );
				onAdd();
			} )
			.catch( err => {
				onAddError( err );
			} );
	}, [ handleRegisterSite, onAdd, onAddError ] ); // recordEvent ] );

	return (
		<>
			<PricingTable { ...args }>
				<PricingTableColumn>
					<PricingTableHeader>
						<ProductPrice
							price={ 9.95 }
							offPrice={ 4.98 }
							leyend={ __( '/month, billed yearly', 'jetpack-protect' ) }
							currency="USD"
							hideSavingLabel={ false }
						/>
						<Button fullWidth>{ __( 'Get Jetpack Protect', 'jetpack-protect' ) }</Button>
					</PricingTableHeader>
					<PricingTableItem
						isIncluded={ true }
						label={ <strong>{ __( 'Line by line malware scanning', 'jetpack-protect' ) }</strong> }
					/>
					<PricingTableItem
						isIncluded={ true }
						label={ <strong>{ __( 'Plus on-demand manual scans', 'jetpack-protect' ) }</strong> }
					/>
					<PricingTableItem isIncluded={ true } />
					<PricingTableItem isIncluded={ true } />
					<PricingTableItem isIncluded={ true } />
					<PricingTableItem isIncluded={ true } />
				</PricingTableColumn>
				<PricingTableColumn>
					<PricingTableHeader>
						<ProductPrice
							price={ 0 }
							leyend={ __( 'Free forever', 'jetpack-protect' ) }
							currency="USD"
							hidePriceFraction
						/>
						<Button
							fullWidth
							variant="secondary"
							onClick={ onAddHandler }
							isLoading={ siteIsRegistering }
							error={
								registrationError
									? __( 'An error occurred. Please try again.', 'jetpack-protect' )
									: null
							}
						>
							{ __( 'Start for free', 'jetpack-protect' ) }
						</Button>
					</PricingTableHeader>
					<PricingTableItem
						isIncluded={ true }
						label={ __( 'Check items against database', 'jetpack-protect' ) }
					/>
					<PricingTableItem isIncluded={ true } />
					<PricingTableItem isIncluded={ false } />
					<PricingTableItem isIncluded={ false } />
					<PricingTableItem isIncluded={ false } />
					<PricingTableItem isIncluded={ false } />
				</PricingTableColumn>
			</PricingTable>
			<p className={ styles.tos }>{ ToS }</p>
		</>
	);
};

ConnectedPricingTable.propTypes = {
	/** props.onAdd      - Callback when adding protect product successfully */
	onAdd: PropTypes.func,
	/** props.onError    - Callback when adding protect product fails */
	onAddError: PropTypes.func,
};

ConnectedPricingTable.defaultProps = {
	onAdd: () => {},
	onAddError: () => {},
};

export default ConnectedPricingTable;
