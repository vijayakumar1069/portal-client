export const getBackendUrl = (): string | undefined => {
  return process.env.NEXT_PUBLIC_NODE_DEV !== "production"
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : process.env.NEXT_PUBLIC_PRODUCTION_BACKEND_URL;
};
