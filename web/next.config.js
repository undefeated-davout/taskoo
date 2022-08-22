/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // TODO: react-firebaseuiが対応したらtrueに戻す
  swcMinify: true,
  trailingSlash: true,
  compiler: (() => {
    let compilerConfig = {
      // styledComponentsの有効化
      styledComponents: true,
    };
    if (process.env.NODE_ENV === "production") {
      compilerConfig = {
        ...compilerConfig,
        // 本番環境ではReact Testing Libraryで使用するdata-testid属性を削除
        reactRemoveProperties: { properties: ["^data-testid$"] },
      };
    }
    return compilerConfig;
  })(),
};

module.exports = nextConfig;
