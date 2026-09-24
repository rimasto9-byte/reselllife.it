import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/fornitoriresellife",
        destination: "/fornitori",
        permanent: true,
      },
      {
        source: "/copia-di-fornitori",
        destination: "/fornitori#coaching",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
