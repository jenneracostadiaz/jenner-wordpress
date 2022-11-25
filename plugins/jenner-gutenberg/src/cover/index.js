import { registerBlockType } from '@wordpress/blocks';
import { RichText, MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

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
		coverPhoto: {
			type: 'string',
			selector: '.cover .cover__image picture',
		},
		coverPhotoThumb: {
			type: 'string',
			selector: '.cover .cover__image picture',
		},
		coverPhotoID: {
			type: 'string',
			selector: '.cover .cover__image picture',
		},
		coverPhotoAlt: {
			type: 'string',
			selector: '.cover .cover__image picture',
		},
		jennerPhoto: {
			type: 'string',
			selector:
				'.cover .cover__txt .cover__txt__blockquote .jenners-philosophy__img',
		},
		jennerPhotoID: {
			type: 'string',
			selector:
				'.cover .cover__txt .cover__txt__blockquote .jenners-philosophy__img',
		},
		jennerPhotoAlt: {
			type: 'string',
			selector:
				'.cover .cover__txt .cover__txt__blockquote .jenners-philosophy__img',
		},
	},
	edit: (props) => {
		const {
			attributes: {
				headingBox,
				citeBox,
				coverPhoto,
				coverPhotoThumb,
				coverPhotoID,
				coverPhotoAlt,
				jennerPhoto,
				jennerPhotoID,
				jennerPhotoAlt,
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
			setAttributes({
				coverPhoto: newImage.sizes.large.url,
				coverPhotoThumb: newImage.sizes.medium.url,
				coverPhotoID: newImage.id,
				coverPhotoAlt: newImage.alt,
			});
		};
		const onSelectJennerPhoto = (newImage) => {
			setAttributes({
				jennerPhoto: newImage.sizes.thumbnail.url,
				jennerPhotoID: newImage.id,
				jennerPhotoAlt: newImage.alt,
			});
		};

		return (
			<section className="cover">
				<div className="cover__image">
					<MediaUpload
						onSelect={onSelectCoverIMG}
						allowedTypes="image"
						value={coverPhotoID}
						render={({ open }) => (
							<Button
								className={
									coverPhoto ? 'image-button' : 'button button-large'
								}
								onClick={open}
							>
								{!coverPhoto ? (
									__('Imagen Cover', 'jennerui')
								) : (
									<img src={coverPhotoThumb} alt={coverPhotoAlt} />
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
					<div className="cover__txt__blockquote">
						<blockquote className="jenners-philosophy">
							<MediaUpload
								onSelect={onSelectJennerPhoto}
								allowedTypes="image"
								value={jennerPhotoID}
								render={({ open }) => (
									<Button
										className={
											jennerPhoto
												? 'image-button'
												: 'button button-large'
										}
										onClick={open}
									>
										{!jennerPhoto ? (
											__('Foto', 'jennerui')
										) : (
											<img
												src={jennerPhoto}
												className="jenners-philosophy__img"
												alt={jennerPhotoAlt}
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
						</blockquote>
					</div>
				</div>
			</section>
		);
	},
	save: (props) => {
		const {
			attributes: {
				headingBox,
				citeBox,
				coverPhoto,
				coverPhotoThumb,
				coverPhotoAlt,
				jennerPhoto,
				jennerPhotoAlt,
			},
		} = props;
		return (
			<section className="cover">
				<div className="cover__image">
					{coverPhoto && (
						<picture>
							<source
								srcset={coverPhoto}
								media="(min-width: 480px)"
							/>
							<img src={coverPhotoThumb} alt={coverPhotoAlt} />
						</picture>
					)}
				</div>
				<div className="cover__txt">
					<h1 className="cover__txt__title">
						<RichText.Content value={headingBox} />
					</h1>

					<div className="cover__txt__blockquote">
						<blockquote className="jenners-philosophy">
							{jennerPhoto && (
								<img
									src={jennerPhoto}
									className="jenners-philosophy__img"
									alt={jennerPhotoAlt}
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
