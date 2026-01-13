import { __ } from '@wordpress/i18n';
import {
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalHeading as Heading,
	Button,
} from '@wordpress/components';
import { DataForm } from '@wordpress/dataviews/wp';
import { useSettings } from '../hooks';
import { Notices } from './notices';

const SettingsTitle = () => {
	return (
		<Heading level={ 1 }>
			{ __( 'Unadorned Announcement Bar', 'unadorned-announcement-bar' ) }
		</Heading>
	);
};

const SaveButton = ( { onClick } ) => {
	return (
		<Button variant="primary" onClick={ onClick } __next40pxDefaultSize>
			{ __( 'Save', 'unadorned-announcement-bar' ) }
		</Button>
	);
};

const SettingsPage = () => {
	const {
		message,
		setMessage,
		display,
		setDisplay,
		size,
		setSize,
		saveSettings,
	} = useSettings();

	return (
		<>
			<SettingsTitle />
			<Notices />
			<DataForm />
			<SaveButton onClick={ saveSettings } />
		</>
	);
};

export { SettingsPage };
