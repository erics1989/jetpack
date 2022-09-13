import {
	Button,
	ProductPrice,
	PricingTable,
	PricingTableColumn,
	PricingTableHeader,
	PricingTableItem,
} from '@automattic/jetpack-components';
//import { ToS } from '@automattic/jetpack-connection';
import React from 'react';
// import useProtectData from '../../hooks/use-protect-data';

/**
 * Intersitial Protect component.
 *
 * @returns {React.Component} Interstitial react component.
 */
const Interstitial = () => {
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
					<ProductPrice price={ 0 } leyend="Free forever" currency="USD" hidePriceFraction />
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
