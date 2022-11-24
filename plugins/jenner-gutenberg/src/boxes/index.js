import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';

//Logo para el bloque

import { ReactComponent as Logo } from '../jenner-icon.svg';

registerBlockType('jenner/boxes', {
	title: 'Cajas Jenner',
	icon: { src: Logo },
	category: 'jenner',
	attributes: {
		headingBox: {
			type: 'string',
			source: 'html',
			select: '.box h2',
		},
	},
	edit: () => {
		const onChangeHeadingBox = (nuevoHeading) => {
			console.log(nuevoHeading);
		};

		return (
			<div className="box">
				<h2>
					<RichText
						placeholder="Agrega el Encabezado"
						onchange={onChangeHeadingBox}
					/>
				</h2>
			</div>
		);
	},
	save: () => {
		return <h1>Se ve en el frontend</h1>;
	},
});
