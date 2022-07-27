import {
	AdminPage,
	AdminSection,
	AdminSectionHero,
	Container,
	Col,
} from '@automattic/jetpack-components';
import { useConnection } from '@automattic/jetpack-connection';
import { __ } from '@wordpress/i18n';
import React from 'react';
import PricingTable from '../pricing-table';
import Header from './../header';
import InfoSection from './../info-section';
import Logo from './../logo';
import ToggleSection from './../toggle-section';
import './styles.module.scss';

const Admin = () => {
	const { isUserConnected, isRegistered } = useConnection();
	const showConnectionCard = ! isRegistered || ! isUserConnected;

	if ( showConnectionCard ) {
		return (
			<AdminPage moduleName={ __( 'Jetpack Social 1.0', 'jetpack-social' ) } header={ <Logo /> }>
				<AdminSectionHero>
					<PricingTable />
				</AdminSectionHero>
			</AdminPage>
		);
	}

	return (
		<AdminPage moduleName={ __( 'Jetpack Social 1.0', 'jetpack-social' ) } header={ <Logo /> }>
			<AdminSectionHero>
				<Header />
			</AdminSectionHero>
			<AdminSection>
				<ToggleSection />
			</AdminSection>
			<AdminSectionHero>
				<InfoSection />
			</AdminSectionHero>
		</AdminPage>
	);
};

export default Admin;
