import { registerBlockType } from '@wordpress/blocks';
import {
	RichText,
	InspectorControls,
	ColorPalette,
} from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

//Logo para el bloque
import { ReactComponent as Logo } from '../jenner-icon.svg';

registerBlockType('jenner/boxes', {
	title: 'Boxes Jenner',
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
		colorFondo: {
			type: 'string',
		},
		colorTexto: {
			type: 'string',
		},
	},
	edit: (props) => {
		//Extraer el contenido desde props
		const {
			attributes: { headingBox, textoBox, colorFondo, colorTexto },
			setAttributes,
		} = props;

		const onChangesHeadingBox = (nuevoHeading) => {
			setAttributes({ headingBox: nuevoHeading });
		};

		const onChangetextoBox = (nuevoTexto) => {
			setAttributes({ textoBox: nuevoTexto });
		};

		const onChangeColorFondo = (nuevoColor) => {
			setAttributes({ colorFondo: nuevoColor });
		};

		const onChangeColorTexto = (nuevoColor) => {
			setAttributes({ colorTexto: nuevoColor });
		};

		return (
			<>
				<InspectorControls>
					<PanelBody title={'Color de Fondo'} initialOpen={true}>
						<div className="components-base-control">
							<div className="components-base-control__field">
								<label className="components-base-control__label">
									Color de Texto
								</label>
								<ColorPalette
									onChange={onChangeColorFondo}
									value={colorFondo}
								/>
							</div>
						</div>
					</PanelBody>
					<PanelBody title={'Color de Texto'} initialOpen={false}>
						<div className="components-base-control">
							<div className="components-base-control__field">
								<label className="components-base-control__label">
									Color de Texto
								</label>
								<ColorPalette
									onChange={onChangeColorTexto}
									value={colorTexto}
								/>
							</div>
						</div>
					</PanelBody>
				</InspectorControls>
				<div className="box" style={{ backgroundColor: colorFondo }}>
					<h2 style={{ color: colorTexto }}>
						<RichText
							placeholder="Agregar el Encabezado"
							onChange={onChangesHeadingBox}
							value={headingBox}
						/>
					</h2>
					<p style={{ color: colorTexto }}>
						<RichText
							placeholder="Agrega el Texto"
							onChange={onChangetextoBox}
							value={textoBox}
						/>
					</p>
				</div>
			</>
		);
	},
	save: (props) => {
		//Extraer el contenido desde props
		const {
			attributes: { headingBox, textoBox, colorFondo, colorTexto },
		} = props;

		return (
			<div className="box" style={{ backgroundColor: colorFondo }}>
				<h2 style={{ color: colorTexto }}>
					<RichText.Content value={headingBox} />
				</h2>
				<p style={{ color: colorTexto }}>
					<RichText.Content value={textoBox} />
				</p>
			</div>
		);
	},
});
