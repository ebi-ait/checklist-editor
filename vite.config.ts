import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'




// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), '')
    const apiTargetHost = env.VITE_API_TARGET_HOST;
    if (!apiTargetHost) {
        throw new Error('VITE_API_TARGET_HOST is not defined');
    }
    return {
        plugins: [react()],
        server: {
            proxy: {
                // Proxy requests to the API server
                '/api/biosamples/schema/store/api/v2': {
                    target: apiTargetHost,
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },
    };
})
