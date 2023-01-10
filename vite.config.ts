import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import path from 'path';

export default defineConfig(({ command }) => {
	if (command === 'serve') {
		// 개발 서버 설정
	}
	return defaultOption;
});

const defaultOption = {
	server: {
		host: '0.0.0.0',
		port: 3000,
		open: true,
		strictPort: true,
		cors: false,
		proxy: {
			'/api': {
				target: 'http://localhost:8080',
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api/, ''),
				configure: (proxy, options) => {
					proxy.on('proxyReq', (proxyReq, req) => {
						proxyReq.setHeader('domain', req.headers.host?.split(':')?.at(0) || '');
					});
				},
			},
			'/api/v2': {
				target: 'http://localhost:8081',
				changeOrigin: true,
				secure: false,
			},
		},
	},
	preview: {
		host: '0.0.0.0',
		port: 4000,
		strictPort: true,
	},
	resolve: {
		alias: [
			{
				find: '@',
				replacement: `${path.resolve(__dirname, 'src')}/`,
			},
		],
	},
	plugins: [
		vue({
			template: { transformAssetUrls },
		}),

		quasar({
			sassVariables: '@/styles/quasar-variables.sass',
		}),
	],
};
