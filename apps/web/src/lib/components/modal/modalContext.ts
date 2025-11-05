import { createCtx } from '$lib/util';

type TModalContext = { open: () => void; close: () => void };

const [getModalContext, setModalContext] = createCtx<TModalContext>('modal');

export { getModalContext, setModalContext, type TModalContext };
