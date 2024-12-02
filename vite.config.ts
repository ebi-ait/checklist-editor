import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

function logResponse(proxyRes) {
    return console.log(`Response received from target with status: ${proxyRes.statusCode}`);
}

function logRequest(proxyReq, req)  {
        console.log(`Proxying request to: ${proxyReq.getHeader('host')}${proxyReq.path}`);
        console.log(`Original URL: ${req.url}`);
        console.log(`Proxying request with Content-Type: ${proxyReq.getHeader('Content-Type')}`);
}

// see https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), '')
    const schemaStoreHost = env.VITE_SCHEMA_STORE_HOST;
    console.log(`command: ${command}`);
    if (command == 'serve') {
        if (!schemaStoreHost) {
            throw new Error('VITE_SCHEMA_STORE_HOST is not defined. Check your .env file');
        } else {
            console.log(`using VITE_SCHEMA_STORE_HOST: ${schemaStoreHost}`)
        }
    }
    return {
        plugins: [
            react()
        ],
        server: {
            proxy: {
                '/auth': {
                    target: 'https://www.ebi.ac.uk/ena/submit/webin',
                    changeOrigin: true,
                    secure: false,
                    configure: (proxy) => {
                        proxy.on('proxyReq', logRequest);
                        proxy.on('proxyRes', logResponse);
                    }
                },

                '/api/v2': {
                    target: schemaStoreHost,
                    changeOrigin: true,
                    secure: false,
                    configure: (proxy) => {
                        proxy.on('proxyReq', logRequest);
                        proxy.on('proxyRes', logResponse);
                    }
                }
            },
        },
        base: '/biosamples/checklist-editor'
    };
})
