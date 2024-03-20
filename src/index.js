import './index.scss';
import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';
import { SettingsPage } from './components';

domReady( () => {
	const root = createRoot(
		document.getElementById( 'unadorned-announcement-bar-settings' )
	);

	root.render( <SettingsPage /> );
} );
