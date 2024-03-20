import { __ } from '@wordpress/i18n';
import {
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalHeading as Heading,
	Button,
	Panel,
	PanelBody,
	PanelRow,
} from '@wordpress/components';
import { useSettings } from '../hooks';
import { Notices } from './notices';
import { MessageControl, DisplayControl, SizeControl } from './controls';

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
			<Panel>
				<PanelBody>
					<PanelRow>
						<MessageControl
							value={ message }
							onChange={ ( value ) => setMessage( value ) }
						/>
					</PanelRow>
					<PanelRow>
						<DisplayControl
							value={ display }
							onChange={ ( value ) => setDisplay( value ) }
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody
					title={ __( 'Appearance', 'unadorned-announcement-bar' ) }
					initialOpen={ false }
				>
					<PanelRow>
						<SizeControl
							value={ size }
							onChange={ ( value ) => setSize( value ) }
						/>
					</PanelRow>
				</PanelBody>
			</Panel>
			<SaveButton onClick={ saveSettings } />
		</>
	);
};

export { SettingsPage };
