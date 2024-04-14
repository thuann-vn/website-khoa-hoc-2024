import { Config } from 'ziggy-js'

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: {
    user: User;
  };
  ziggy: Config & { location: string };
  site_settings: {
    banner_title: string;
    banner_description: string;
    banner_image: string;
    mobile_banner_image: string;
    phone: string;
    zalo: string;
    facebook: string;
  },
  app_url: string;
};
