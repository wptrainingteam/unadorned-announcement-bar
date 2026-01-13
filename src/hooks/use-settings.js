import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { store as noticesStore } from '@wordpress/notices';
import { useEffect, useState } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';

const useSettings = () => {
	const [ settings, setSettings ] = useState( {
		message: '',
		display: false,
		size: 'small',
	} );

	const { createSuccessNotice } = useDispatch( noticesStore );

	useEffect( () => {
		apiFetch( { path: '/wp/v2/settings' } ).then( ( settings ) => {
			setMessage( settings.unadorned_announcement_bar.message );
			setDisplay( settings.unadorned_announcement_bar.display );
			setSize( settings.unadorned_announcement_bar.size );
		} );
	}, [] );

	const saveSettings = () => {
		apiFetch( {
			path: '/wp/v2/settings',
			method: 'POST',
			data: {
				unadorned_announcement_bar: {
					message,
					display,
					size,
				},
			},
		} ).then( () => {
			createSuccessNotice(
				__( 'Settings saved.', 'unadorned-announcement-bar' )
			);
		} );
	};

	return [ settings, setSettings, saveSettings ];
};

export default useSettings;
