const FLAG_TRUE = "true";

// Shared feature flags driven by Next public env vars.
export const isBlogEnabled = process.env.NEXT_PUBLIC_ENABLE_BLOG === FLAG_TRUE;

