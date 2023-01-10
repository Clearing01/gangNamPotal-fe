import { createPinia } from 'pinia';

const pinia = createPinia();
export const install = (app: any) => {
	app.use(pinia);
};
