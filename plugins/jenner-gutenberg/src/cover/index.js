import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';

//Logo para el bloque
import { ReactComponent as Logo } from '../jenner-icon.svg';

registerBlockType('jenner/cover', {
	title: 'Cover',
	icon: { src: Logo },
	category: 'jenner',
	attributes: {
		headingBox: {
			type: 'string',
			source: 'html',
			selector: '.cover .cover__txt .cover__txt__title',
		},
		citeBox: {
			type: 'string',
			source: 'html',
			selector:
				'.cover .cover__txt .cover__txt__blockquote .jenners-philosophy__cite',
		},
	},
	edit: (props) => {
		const {
			attributes: { headingBox, citeBox },
			setAttributes,
		} = props;

		const onChangesHeadingBox = (nuevoHeading) => {
			setAttributes({ headingBox: nuevoHeading });
		};

		const onChangesCiteBox = (newCite) => {
			setAttributes({ citeBox: newCite });
		};

		return (
			<section className="cover">
				<div className="cover__image"></div>
				<div className="cover__txt">
					<h1 className="cover__txt__title">
						<RichText
							placeholder="Agregar Titulo"
							onChange={onChangesHeadingBox}
							value={headingBox}
						/>
					</h1>
					<div className="cover__txt__blockquote">
						<p className="jenners-philosophy__cite">
							<RichText
								placeholder="Agregar Cita"
								onChange={onChangesCiteBox}
								value={citeBox}
							/>
						</p>
					</div>
				</div>
			</section>
		);
	},
	save: (props) => {
		const {
			attributes: { headingBox, citeBox },
		} = props;
		return (
			<section className="cover">
				<div className="cover__image"></div>
				<div className="cover__txt">
					<h1 className="cover__txt__title">
						<RichText.Content value={headingBox} />
					</h1>
					<div className="cover__txt__blockquote">
						<p className="jenners-philosophy__cite">
							<RichText.Content value={citeBox} />
						</p>
					</div>
				</div>
			</section>
		);
	},
});
