import ky from 'ky';

export const activityClient = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
});
