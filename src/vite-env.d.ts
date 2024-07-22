/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_API_TARGET_HOST: string;
    // Add other environment variables here if needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
