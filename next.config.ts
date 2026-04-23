import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js 15+ defaults this to "attachment", which breaks inline rendering
    // for images referenced via <Image />. Restore the pre-15 default.
    contentDispositionType: "inline",
  },
};

export default nextConfig;
