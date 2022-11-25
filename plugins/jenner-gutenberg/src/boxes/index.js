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
			selector: '.box h2',
		},
		textoBox: {
			type: 'string',
			source: 'html',
			selector: '.box p',
		},
	},
	edit: (props) => {
		console.log(props);
		//Extraer el contenido desde props
		const {
			attributes: { headingBox, textoBox },
			setAttributes,
		} = props;

		const onChangesHeadingBox = (nuevoHeading) => {
			setAttributes({ headingBox: nuevoHeading });
		};

		const onChangetextoBox = (nuevoTexto) => {
			setAttributes({ textoBox: nuevoTexto });
		};

		return (
			<div className="box">
				<h2>
					<RichText
						placeholder="Agregar el Encabezado"
						onChange={onChangesHeadingBox}
						value={headingBox}
					/>
				</h2>
				<p>
					<RichText
						placeholder="Agrega el Texto"
						onChange={onChangetextoBox}
						value={textoBox}
					/>
				</p>
			</div>
		);
	},
	save: (props) => {
		console.log(props);
		//Extraer el contenido desde props
		const {
			attributes: { headingBox, textoBox },
		} = props;

		return (
			<div className="box">
				<h2>
					<RichText.Content value={headingBox} />
				</h2>
				<p>
					<RichText.Content value={textoBox} />
				</p>
			</div>
		);
	},
});
