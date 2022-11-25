import { registerBlockType } from '@wordpress/blocks';
import { RichText, MediaUpload } from '@wordpress/block-editor';
import { Button, ExternalLink } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

//Logo para el bloque
import { ReactComponent as Logo } from '../jenner-icon.svg';

const d_hostname = window.location.hostname;
const d_protocol = window.location.protocol;

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
		coverIMG: {
			type: 'array',
		},
		jennerPhoto: {
			type: 'array',
		},
	},
	edit: (props) => {
		const {
			attributes: {
				headingBox,
				citeBox,
				coverIMG = [],
				jennerPhoto = [],
			},
			setAttributes,
		} = props;

		const onChangesHeadingBox = (nuevoHeading) => {
			setAttributes({ headingBox: nuevoHeading });
		};

		const onChangesCiteBox = (newCite) => {
			setAttributes({ citeBox: newCite });
		};

		const onSelectCoverIMG = (newImage) => {
			const image = {
				thumb: newImage.sizes.medium.url,
				large: newImage.sizes.large.url,
				id: newImage.id,
				alt: newImage.alt,
			};
			console.log(image);
			setAttributes({ coverIMG: image });
		};

		const onSelectJennerPhoto = (newImage) => {
			const image = {
				thumb: newImage.sizes.medium.url,
				id: newImage.id,
				alt: newImage.alt,
			};
			console.log(image);
			setAttributes({ jennerPhoto: image });
		};

		return (
			<section className="cover">
				<div className="cover__image">
					<MediaUpload
						onSelect={onSelectCoverIMG}
						allowedTypes="image"
						value={coverIMG.id}
						render={({ open }) => (
							<Button
								className={
									coverIMG.id ? 'image-button' : 'button button-large'
								}
								onClick={open}
							>
								{!coverIMG.id ? (
									__('Upload Image', 'jennerui')
								) : (
									<picture>
										<source
											srcset={coverIMG.large}
											media="(min-width: 480px)"
										/>
										<img
											src={coverIMG.thumb}
											alt={coverIMG.alt}
										></img>
									</picture>
								)}
							</Button>
						)}
					/>
				</div>
				<div className="cover__txt">
					<h1 className="cover__txt__title">
						<RichText
							placeholder="Agregar Titulo"
							onChange={onChangesHeadingBox}
							value={headingBox}
						/>
					</h1>
					<div class="cover__txt__calltoactions">
						<a href="#" class="btn-primary">
							<svg class="svg-icon">
								<use
									href={
										d_protocol +
										'//' +
										d_hostname +
										'/wp-content/themes/jenner-ui/assets/icons/symbols.svg#newspaper'
									}
								/>
							</svg>
							Leer nuestro Blog
						</a>
						<a
							href="https://wa.me/message/FVIV67T74WYXJ1"
							target="_blank"
							class="btn-secondary"
						>
							<svg class="svg-icon">
								<use
									href={
										d_protocol +
										'//' +
										d_hostname +
										'/wp-content/themes/jenner-ui/assets/icons/symbols.svg#whatsapp'
									}
								/>
							</svg>
							¡conversemos!
						</a>
					</div>
					<div className="cover__txt__blockquote">
						<MediaUpload
							onSelect={onSelectJennerPhoto}
							allowedTypes="image"
							value={jennerPhoto.id}
							render={({ open }) => (
								<Button
									className={
										jennerPhoto.id
											? 'image-button'
											: 'button button-large'
									}
									onClick={open}
								>
									{!jennerPhoto.id ? (
										__('Upload Image', 'jennerui')
									) : (
										<img
											src={jennerPhoto.thumb}
											alt={jennerPhoto.alt}
											className="jenners-philosophy__img"
										/>
									)}
								</Button>
							)}
						/>

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
			attributes: { headingBox, citeBox, coverIMG, jennerPhoto },
		} = props;
		return (
			<section className="cover">
				<div className="cover__image">
					{coverIMG && (
						<picture>
							<source
								srcset={coverIMG.large}
								media="(min-width: 480px)"
							/>
							<img src={coverIMG.thumb} alt={coverIMG.alt}></img>
						</picture>
					)}
				</div>
				<div className="cover__txt">
					<h1 className="cover__txt__title">
						<RichText.Content value={headingBox} />
					</h1>
					<div class="cover__txt__calltoactions">
						<a
							href="https://wa.me/message/FVIV67T74WYXJ1"
							target="_blank"
							class="btn-secondary"
						>
							<svg class="svg-icon">
								<use
									href={
										d_protocol +
										'//' +
										d_hostname +
										'/wp-content/themes/jenner-ui/assets/icons/symbols.svg#whatsapp'
									}
								/>
							</svg>
							¡conversemos!
						</a>
					</div>
					<div className="cover__txt__blockquote">
						<blockquote className="jenners-philosophy">
							{jennerPhoto && (
								<img
									src={jennerPhoto.thumb}
									alt={jennerPhoto.alt}
									className="jenners-philosophy__img"
								/>
							)}
							<p className="jenners-philosophy__cite">
								<RichText.Content value={citeBox} />
							</p>
						</blockquote>
					</div>
				</div>
			</section>
		);
	},
});
