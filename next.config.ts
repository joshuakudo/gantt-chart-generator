const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/main',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
