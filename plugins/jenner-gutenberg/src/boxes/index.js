import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';

//Logo para el bloque
import { ReactComponent as Logo } from '../jenner-icon.svg';

registerBlockType('jenner/boxes', {
	title: 'Cajas Jenner',
	icon: { src: Logo },
	category: 'jenner',
	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: 'h2',
		},
	},
	edit() {
		const onChangesheadingBox = (a) => {
			console.log(a);
		};

		return (
			<div>
				<h2>
					<RichText
						onChange={onChangesheadingBox} // Store updated content as a block attribute
						placeholder="Agregar el Encabezado" // Display this text before any content has been added by the user
					/>
				</h2>
			</div>
		);
	},
	save() {
		return <RichText.Content tagName="h2" />; // Saves <h2>Content added in the editor...</h2> to the database for frontend display
	},
});
