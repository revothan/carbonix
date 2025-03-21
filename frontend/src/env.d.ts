/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LISK_NODE_URL: string;
  readonly VITE_XELLAR_API_KEY: string;
  readonly VITE_XELLAR_CLIENT_ID: string;
  // Add other environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
