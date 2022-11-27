import { registerBlockType } from '@wordpress/blocks';
import { withSelect } from '@wordpress/data';

//Logo para el bloque
import { ReactComponent as Logo } from '../jenner-icon.svg';

registerBlockType('jenner/proyectos', {
	title: 'Proyectos',
	icon: { src: Logo },
	category: 'jenner',
	edit: withSelect((select) => {
		return {
			// Enviar petición a la api
			categorias: select('core').getEntityRecords(
				'taxonomy',
				'categoria_proyectos'
			),
			proyectos: select('core').getEntityRecords(
				'postType',
				'proyectos'
			),
		};
	})(({ proyectos }) => {
		console.log(proyectos);

		return (
			<>
				{proyectos && (
					<>
						<h2>Nuestros Proyectos</h2>
						<ul className="proyecto">
							{proyectos.map((proy) => (
								<li>
									<h3>{proy.title.rendered}</h3>
								</li>
							))}
						</ul>
					</>
				)}
			</>
		);
	}),

	save: () => {
		return null;
	},
});
