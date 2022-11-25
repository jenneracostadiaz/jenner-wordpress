import { registerBlockType } from '@wordpress/blocks';

//Logo para el bloque
import { ReactComponent as Logo } from '../jenner-icon.svg';

registerBlockType('jenner/valueproposal', {
	title: 'Value Proposal',
	icon: { src: Logo },
	category: 'jenner',
	edit: (props) => {
		console.log(props);
		return <h2>Gutenberg</h2>;
	},
	save: () => {
		return <h2>Frontend</h2>;
	},
});
