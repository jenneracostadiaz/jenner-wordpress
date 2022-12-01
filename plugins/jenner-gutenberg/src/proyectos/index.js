import { registerBlockType } from '@wordpress/blocks';
import { withSelect } from '@wordpress/data';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';

//Logo para el bloque
import { ReactComponent as Logo } from '../jenner-icon.svg';

registerBlockType('jenner/proyectos', {
	title: 'Proyectos',
	icon: { src: Logo },
	category: 'jenner',
	attributes: {
		cantidadMostrar: {
			type: 'number',
			default: 4,
		},
	},
	edit: withSelect((select, props) => {
		const {
			attributes: { cantidadMostrar },
			setAttributes,
		} = props;

		const onChangeCantidadMostrar = (nuevaCantidad) => {
			setAttributes({ cantidadMostrar: parseInt(nuevaCantidad) });
		};

		return {
			// Enviar petición a la api
			categorias: select('core').getEntityRecords(
				'taxonomy',
				'categoria_proyectos'
			),
			proyectos: select('core').getEntityRecords(
				'postType',
				'proyectos',
				{
					per_page: cantidadMostrar,
				}
			),
			onChangeCantidadMostrar,
			props,
		};
	})(({ proyectos, onChangeCantidadMostrar, props }) => {
		console.log(proyectos);

		const {
			attributes: { cantidadMostrar },
		} = props;

		if (!proyectos) {
			return 'Cargando...';
		}

		if (proyectos && proyectos.length === 0) {
			return 'No hay resultados';
		}

		const formatDate = (date) => {
			let newdate = new Date(date);
			let year = newdate.getFullYear();
			let month = newdate.getMonth();
			switch (month) {
				case 0:
					month = 'Enero';
					break;
				case 1:
					month = 'Febrero';
					break;
				case 2:
					month = 'Marzo';
					break;
				case 3:
					month = 'Abril';
					break;
				case 4:
					month = 'Mayo';
					break;
				case 5:
					month = 'Junio';
					break;
				case 6:
					month = 'Julio';
					break;
				case 7:
					month = 'Agosto';
					break;
				case 8:
					month = 'Septiembre';
					break;
				case 9:
					month = 'Octubre';
					break;
				case 10:
					month = 'Noviembre';
					break;
				case 11:
					month = 'Diciembre';
					break;
			}
			return month + ', ' + year;
		};

		return (
			<>
				<InspectorControls>
					<PanelBody title={'Cantidad a Mostrar'} initialOpen={true}>
						<div className="components-base-control">
							<div className="components-base-control__field">
								<label className="components-base-control__label">
									Cantidad a Mostrar
								</label>
								<RangeControl
									onChange={onChangeCantidadMostrar}
									min={1}
									max={10}
									value={cantidadMostrar}
								/>
							</div>
						</div>
					</PanelBody>
				</InspectorControls>

				<section className="projects">
					{proyectos && (
						<>
							{proyectos.map((proy) => (
								<article className="projects__card card onhover">
									<header className="card__header">
										<nav className="card__header__category">
											<a href="#">Desarrollo Web</a>,{' '}
											<a href="#">E-learning</a>
										</nav>
										{proy.title.rendered && (
											<h2 className="card__header__title">
												{proy.title.rendered}
											</h2>
										)}
										{proy.date && (
											<time className="card__header__time">
												{formatDate(proy.date)}
											</time>
										)}
										<div className="button-group">
											{proy.title.rendered && (
												<a
													href={proy.link_external}
													className="btn-primary"
													target="_blank"
												>
													<svg
														width="12"
														height="12"
														viewBox="0 0 12 12"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path d="M4.66667 2V3.33333H1.33333V10.6667H8.66667V7.33333H10V11.3333C10 11.5101 9.92976 11.6797 9.80474 11.8047C9.67971 11.9298 9.51014 12 9.33333 12H0.666667C0.489856 12 0.320286 11.9298 0.195262 11.8047C0.0702379 11.6797 0 11.5101 0 11.3333V2.66667C0 2.48986 0.0702379 2.32029 0.195262 2.19526C0.320286 2.07024 0.489856 2 0.666667 2H4.66667ZM12 0V5.33333H10.6667V2.27533L5.47133 7.47133L4.52867 6.52867L9.72333 1.33333H6.66667V0H12Z" />
													</svg>
													Ver Online
												</a>
											)}
											{proy.acf.mostrar_protafolio && (
												<a
													href={proy.link}
													className="btn-third"
													target="_blank"
												>
													<svg
														width="16"
														height="16"
														viewBox="0 0 16 16"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path d="M8 15C6.14348 15 4.36301 14.2625 3.05025 12.9497C1.7375 11.637 1 9.85652 1 8C1 6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637 1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8C15 9.85652 14.2625 11.637 12.9497 12.9497C11.637 14.2625 9.85652 15 8 15ZM8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16Z" />
														<path d="M8.93001 6.588L6.64001 6.875L6.55801 7.255L7.00801 7.338C7.30201 7.408 7.36001 7.514 7.29601 7.807L6.55801 11.275C6.36401 12.172 6.66301 12.594 7.36601 12.594C7.91101 12.594 8.54401 12.342 8.83101 11.996L8.91901 11.58C8.71901 11.756 8.42701 11.826 8.23301 11.826C7.95801 11.826 7.85801 11.633 7.92901 11.293L8.93001 6.588ZM9.00001 4.5C9.00001 4.76522 8.89466 5.01957 8.70712 5.20711C8.51958 5.39464 8.26523 5.5 8.00001 5.5C7.7348 5.5 7.48044 5.39464 7.29291 5.20711C7.10537 5.01957 7.00001 4.76522 7.00001 4.5C7.00001 4.23478 7.10537 3.98043 7.29291 3.79289C7.48044 3.60536 7.7348 3.5 8.00001 3.5C8.26523 3.5 8.51958 3.60536 8.70712 3.79289C8.89466 3.98043 9.00001 4.23478 9.00001 4.5Z" />
													</svg>
													Detalles
												</a>
											)}
										</div>
									</header>
									<section className="card__image">
										<>
											<img
												src={proy.imagen_destacada}
												alt={proy.title.rendered}
											/>
										</>
									</section>
								</article>
							))}
						</>
					)}
				</section>
			</>
		);
	}),

	save: () => {
		return null;
	},
});
