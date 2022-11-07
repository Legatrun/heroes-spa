import { useMemo } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getheroById } from '../helpers';

export const HeroPage = () => {
	// como nombremos a la variable en el path del router "hero/:id" asi se llamara al "useParams"
	const { id, ...rest } = useParams();

	const hero = useMemo(() => getheroById(id), [id]);

	const navigate = useNavigate();

	const onNavigateBack = () => {
		navigate(-1);
	};

	if (!hero) {
		return <Navigate to='/marvel' />;
	}

	return (
		<div className='row mt-5 animate__animated animate__fadeInLeft'>
			<div className='col-4'>
				<img
					src={`/assets/heroes/${id}.jpg`}
					alt={hero.superhero}
					className='img-thumbnail '
				/>
			</div>
			<div className='col-8'>
				<h3>{hero.superhero}</h3>
				<ul className='list-group list-group-flush'>
					<li className='list-group-item'>
						<b>Alter ego:</b> {hero.alter_ego}
					</li>
					<li className='list-group-item'>
						<b>Publisher:</b> {hero.publisher}
					</li>
					<li className='list-group-item'>
						<b>First Apprearance:</b> {hero.first_appearance}
					</li>
				</ul>

				<h5 className='mt-3'>Characters</h5>
				<p>{hero.characters}</p>

				<button className='btn btn-outline-primary' onClick={onNavigateBack}>
					Back
				</button>
			</div>
		</div>
	);
};
