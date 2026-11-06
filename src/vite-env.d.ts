/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUBSTACK_PUBLISHING_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
