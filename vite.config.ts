import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import svgr from 'vite-plugin-svgr'
import tsConfigPaths from 'vite-tsconfig-paths'

import { mantineAutoloadCSS } from 'unplugin-mantine-autoload-css'

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, '')
	console.log({ foo123: env })
	const { VITE_SERVER_PORT, VITE_SERVER_HOST } = env
	return {
		server: {
			port: Number(VITE_SERVER_PORT),
		},
		build: {
			sourcemap: mode !== 'production',
		},
		css: {
			modules: {
				// Change `__` underscores to `--` dashes
				// for double-click selection of class part from devtools
				// Shorten for production to minimize bundle size
				generateScopedName:
					mode === 'development'
						? '[name]--[local]--[hash:base64:5]'
						: '[hash:base64:5]',
			},
		},
		plugins: [
			tsConfigPaths({
				projects: ['./tsconfig.json'],
			}),
			mantineAutoloadCSS({
				global: true,
				baseline: true,
				defaultCSSVariables: false,
				allDependencies: false,
			}),
			tanstackStart({
				customViteReactPlugin: true,
				sitemap: {
					host: VITE_SERVER_HOST,
				},
				pages: [
					{
						path: '/',
						prerender: {
							enabled: true,
							crawlLinks: true,
						},
					},
				],
			}),
			react(),
			svgr({
				svgrOptions: {
					svgo: false,
					dimensions: true,
				},
			}),
		],
	}
})
