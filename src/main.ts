import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

const modules = import.meta.glob('@/modules/*.ts', { eager: true });
// install all modules under `modules/`
Object.values(modules).forEach((module: any) => module.install?.(app));
app.mount('#app');
