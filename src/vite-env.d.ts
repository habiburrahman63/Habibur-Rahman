/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Absolute site URL used for canonical / Open Graph metadata in production. */
  readonly VITE_SITE_URL?: string;
  /** Optional HTTP endpoint that receives contact form submissions. */
  readonly VITE_CONTACT_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
