import {
	// Dialog,
	// ProductOffer,
	// useBreakpointMatch,
	Button,
	ProductPrice,
	PricingTable,
	PricingTableColumn,
	PricingTableHeader,
	PricingTableItem,
} from '@automattic/jetpack-components';
// import { ToS } from '@automattic/jetpack-connection';
import React from 'react';
// import useProtectData from '../../hooks/use-protect-data';
// import ConnectedProductOffer from '../product-offer';
// import styles from './styles.module.scss';

// const SecurityBundle = ( { onAdd, redirecting, ...rest } ) => {
// 	const { securityBundle } = useProtectData();
// 	const {
// 		name,
// 		title,
// 		longDescription,
// 		isBundle,
// 		supportedProducts,
// 		features,
// 		pricingForUi,
// 	} = securityBundle;

// 	// Compute the price per month.
// 	const price = pricingForUi.fullPrice
// 		? Math.ceil( ( pricingForUi.fullPrice / 12 ) * 100 ) / 100
// 		: null;
// 	const offPrice = pricingForUi.discountPrice
// 		? Math.ceil( ( pricingForUi.discountPrice / 12 ) * 100 ) / 100
// 		: null;
// 	const { currencyCode: currency = 'USD' } = pricingForUi;

// 	return (
// 		<ProductOffer
// 			slug="security"
// 			name={ name }
// 			title={ title }
// 			description={ longDescription }
// 			isBundle={ isBundle }
// 			supportedProducts={ supportedProducts }
// 			features={ features }
// 			pricing={ {
// 				currency,
// 				price,
// 				offPrice,
// 			} }
// 			hasRequiredPlan={ false }
// 			onAdd={ onAdd }
// 			isLoading={ redirecting }
// 			{ ...rest }
// 		/>
// 	);
// };

/**
 * Intersitial Protect component.
 *
 * @returns {React.Component} Interstitial react component.
 */
const Interstitial = () => {
	// const Interstitial = ( { onSecurityAdd, securityJustAdded } ) => {
	// const [ isMediumSize ] = useBreakpointMatch( 'md' );
	// const mediaClassName = `${ styles.section } ${
	// 	isMediumSize ? styles[ 'is-viewport-medium' ] : ''
	// }`;

	const args = {
		title: 'Stay one step ahead of threats',
		items: [
			'Scan for threats and vulnerabilities',
			'Daily automated scans',
			'Access to scan on Cloud',
			'One-click auto fixes',
			'Notifications',
			'Severity labels',
		],
	};

	return (
		<PricingTable { ...args }>
			<PricingTableColumn>
				<PricingTableHeader>
					<ProductPrice
						price={ 9.95 }
						offPrice={ 4.98 }
						leyend="Starting price per month, billed yearly"
						currency="USD"
					/>
					<Button fullWidth>Get Jetpack Protect</Button>
				</PricingTableHeader>
				<PricingTableItem
					isIncluded={ true }
					label={ <strong>Line by line malware scanning</strong> }
				/>
				<PricingTableItem
					isIncluded={ true }
					label={ <strong>Plus on-demand manual scans</strong> }
				/>
				<PricingTableItem isIncluded={ true } />
				<PricingTableItem isIncluded={ true } />
				<PricingTableItem isIncluded={ true } />
				<PricingTableItem isIncluded={ true } />
			</PricingTableColumn>
			<PricingTableColumn>
				<PricingTableHeader>
					<ProductPrice price={ 0 } leyend={ '\u00A0' } currency="USD" hidePriceFraction />
					<Button fullWidth variant="secondary">
						Start for free
					</Button>
				</PricingTableHeader>
				<PricingTableItem isIncluded={ true } label="Check items against database" />
				<PricingTableItem isIncluded={ true } />
				<PricingTableItem isIncluded={ false } />
				<PricingTableItem isIncluded={ false } />
				<PricingTableItem isIncluded={ false } />
				<PricingTableItem isIncluded={ false } />
			</PricingTableColumn>
		</PricingTable>
	);
};

export default Interstitial;
