/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  trailingSlash: true,
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/login': { page: '/login' },
      '/focus': { page: '/focus' },
      '/pomodoro': { page: '/pomodoro' },
      '/tasks': { page: '/tasks' },
      '/kanban': { page: '/kanban' },
      '/calendar': { page: '/kanban' },
    }
  },
};

module.exports = nextConfig;
