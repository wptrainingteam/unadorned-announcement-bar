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

	const data = {
		message: '',
		display: false,
	};
	const fields = [
		{
			id: 'message',
			label: __( 'Message', 'unadorned-announcement-bar' ),
			type: 'text',
		},
		{
			id: 'display',
			label: __( 'Display', 'unadorned-announcement-bar' ),
			type: 'boolean',
		},
	];
	const form = {
		fields: [ 'message', 'display' ],
	};

	return (
		<>
			<SettingsTitle />
			<Notices />
			<DataForm
				data={ data }
				fields={ fields }
				form={ form }
				onChange={ () => {} }
			/>
			<SaveButton onClick={ saveSettings } />
		</>
	);
};

export { SettingsPage };
