/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		SERVER_URL: process.env.SERVER_URL,
	},
	images: {
		remotePatterns: [
			{
				hostname: "*",
			},
		],
	},
};

module.exports = nextConfig;
