module.exports = {
  async redirect() {
    return [
      {
        source: '/',
        destination: '/fitness/main',
        permanent: true,
      },
    ];
  },
};