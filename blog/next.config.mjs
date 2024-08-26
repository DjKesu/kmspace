/** @type {import('next').NextConfig} */
const nextConfig = {
    // add environment variables here
    env: {
        NEXT_PUBLIC_ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    },
    images: {
        domains: [''],
    },
};

export default nextConfig;
