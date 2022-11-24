const { registerBlockType } = wp.blocks;

//Logo para el bloque

import { ReactComponent as Logo } from '../jenner-icon.svg';

registerBlockType('jenner/boxes', {
	title: 'Cajas Jenner',
	icon: { src: Logo },
	category: 'jenner',
	edit: () => {
		return <h1>Se ve en el editor</h1>;
	},
	save: () => {
		return <h1>Se ve en el frontend</h1>;
	},
});
