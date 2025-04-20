import cuid2 from '@paralleldrive/cuid2';

function generateId() {
	return cuid2.createId();
}

export { generateId };
