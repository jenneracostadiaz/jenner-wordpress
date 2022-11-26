import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';

//Logo para el bloque
import { ReactComponent as Logo } from '../jenner-icon.svg';

registerBlockType('jenner/valueproposal', {
	title: 'Value Proposal',
	icon: { src: Logo },
	category: 'jenner',
	attributes: {
		titleOne: {
			type: 'string',
			source: 'html',
			selector: '.id-1 h3',
		},
		ParagraphOne: {
			type: 'string',
			source: 'html',
			selector: '.id-1 p',
		},
		titleTwo: {
			type: 'string',
			source: 'html',
			selector: '.id-2 h3',
		},
		ParagraphTwo: {
			type: 'string',
			source: 'html',
			selector: '.id-2 p',
		},
		titleThree: {
			type: 'string',
			source: 'html',
			selector: '.id-3 h3',
		},
		ParagraphThree: {
			type: 'string',
			source: 'html',
			selector: '.id-3 p',
		},
	},
	edit: (props) => {
		const {
			attributes: {
				titleOne,
				ParagraphOne,
				titleTwo,
				ParagraphTwo,
				titleThree,
				ParagraphThree,
			},
			setAttributes,
		} = props;

		const onChangeTitleOne = (newTitle) => {
			setAttributes({ titleOne: newTitle });
		};
		const onChangeParagraphOne = (newParagraph) => {
			setAttributes({ ParagraphOne: newParagraph });
		};

		const onChangeTitleTwo = (newTitle) => {
			setAttributes({ titleTwo: newTitle });
		};
		const onChangeParagraphTwo = (newParagraph) => {
			setAttributes({ ParagraphTwo: newParagraph });
		};

		const onChangeTitleThree = (newTitle) => {
			setAttributes({ titleThree: newTitle });
		};
		const onChangeParagraphThree = (newParagraph) => {
			setAttributes({ ParagraphThree: newParagraph });
		};

		return (
			<>
				<section className="value-proposal">
					<ul className="value-proposal__list">
						<li className="value-proposal__list__item id-1">
							<h3>
								<RichText
									placeholder="Agregar Titulo"
									onChange={onChangeTitleOne}
									value={titleOne}
								/>
							</h3>
							<p>
								<RichText
									placeholder="Agregar Descripción"
									onChange={onChangeParagraphOne}
									value={ParagraphOne}
								/>
							</p>
						</li>
						<li className="value-proposal__list__item id-2">
							<h3>
								<RichText
									placeholder="Agregar Titulo"
									onChange={onChangeTitleTwo}
									value={titleTwo}
								/>
							</h3>
							<p>
								<RichText
									placeholder="Agregar Descripción"
									onChange={onChangeParagraphTwo}
									value={ParagraphTwo}
								/>
							</p>
						</li>
						<li className="value-proposal__list__item id-3">
							<h3>
								<RichText
									placeholder="Agregar Titulo"
									onChange={onChangeTitleThree}
									value={titleThree}
								/>
							</h3>
							<p>
								<RichText
									placeholder="Agregar Descripción"
									onChange={onChangeParagraphThree}
									value={ParagraphThree}
								/>
							</p>
						</li>
					</ul>
				</section>
			</>
		);
	},
	save: (props) => {
		const {
			attributes: {
				titleOne,
				ParagraphOne,
				titleTwo,
				ParagraphTwo,
				titleThree,
				ParagraphThree,
			},
		} = props;

		return (
			<section className="value-proposal">
				<ul className="value-proposal__list">
					<li className="value-proposal__list__item id-1">
						<h3>
							<RichText.Content value={titleOne} />
						</h3>
						<p>
							<RichText.Content value={ParagraphOne} />
						</p>
					</li>
					<li className="value-proposal__list__item id-2">
						<h3>
							<RichText.Content value={titleTwo} />
						</h3>
						<p>
							<RichText.Content value={ParagraphTwo} />
						</p>
					</li>
					<li className="value-proposal__list__item id-3">
						<h3>
							<RichText.Content value={titleThree} />
						</h3>
						<p>
							<RichText.Content value={ParagraphThree} />
						</p>
					</li>
				</ul>
			</section>
		);
	},
});
