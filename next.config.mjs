/** @type {import('next').NextConfig} */
import path from "path";
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  sassOptions: {
     includePaths:[path.join(process.cwd(), "src/styles")],
    prependData : `@import "common.scss";`,
  }
}


export default nextConfig;
