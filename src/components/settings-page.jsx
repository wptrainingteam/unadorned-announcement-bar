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
	const [ settings, setSettings, saveSettings ] = useSettings();

	const fields = [
		{
			id: 'message',
			label: __( 'Message', 'unadorned-announcement-bar' ),
			type: 'text',
			Edit: 'textarea',
		},
		{
			id: 'display',
			label: __( 'Display', 'unadorned-announcement-bar' ),
			type: 'boolean',
			Edit: 'toggle',
		},
		{
			id: 'size',
			label: __( 'Font size', 'unadorned-announcement-bar' ),
			type: 'text',
			elements: [
				{
					value: 'small',
					label: __( 'Small', 'unadorned-announcement-bar' ),
				},
				{
					value: 'medium',
					label: __( 'Medium', 'unadorned-announcement-bar' ),
				},
				{
					value: 'large',
					label: __( 'Large', 'unadorned-announcement-bar' ),
				},
				{
					value: 'x-large',
					label: __( 'Extra Large', 'unadorned-announcement-bar' ),
				},
			],
			Edit: 'toggleGroup',
		},
	];
	const form = {
		fields: [
			{
				id: 'bar',
				label: __( 'Bar', 'unadorned-announcement-bar' ),
				children: [ 'message', 'display' ],
				layout: { type: 'card', withHeader: false },
			},
			{
				id: 'appearance',
				label: __( 'Appearance', 'unadorned-announcement-bar' ),
				children: [ 'size' ],
				layout: { type: 'card', isOpened: false },
			},
		],
	};

	return (
		<>
			<SettingsTitle />
			<Notices />
			<DataForm
				data={ settings }
				fields={ fields }
				form={ form }
				onChange={ ( edits ) =>
					setSettings( ( current ) => ( {
						...current,
						...edits,
					} ) )
				}
			/>
			<SaveButton onClick={ saveSettings } />
		</>
	);
};

export { SettingsPage };
