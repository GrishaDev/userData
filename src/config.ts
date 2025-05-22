console.log(process.env.DB_HOST);
export default () => ({
  yes: true,
  dbHost: process.env.DB_HOST as string,
  agifyHost: process.env.AGIFY_HOST as string,
  isMock: process.env.IS_MOCK === 'true',
});
