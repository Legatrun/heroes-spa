import { heroes } from '../data/heroes';

export const getheroById = (id) => {
	return heroes.find((hero) => hero.id === id);
};
