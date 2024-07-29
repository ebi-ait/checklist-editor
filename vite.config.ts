import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'




// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), '')
    const schemaStoreHost = env.VITE_SCHEMA_STORE_HOST;
    if (!schemaStoreHost) {
        throw new Error('VITE_SCHEMA_STORE_HOST is not defined. Check your .env file');
    }
    return {
        plugins: [
            react()],
        server: {
            proxy: {
                // Proxy requests to the API server
                '/api/biosamples/schema/store/api/v2': {
                    target: schemaStoreHost,
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path:string) => path.replace(/^\/api/, ''),
                },
            },
        },
    };
})
