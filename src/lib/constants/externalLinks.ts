export enum LINKS {
  APPLY = 'apply',
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  LINKEDIN = 'linkedin',
  REGISTER_TIRES = 'registerTires',
  TWITTER = 'twitter',
  YOUTUBE = 'youtube',
}

export const LINK_MAP: Record<LINKS, string> = {
  [LINKS.APPLY]: 'https://simpletire.applytojob.com/apply',
  [LINKS.FACEBOOK]: 'https://www.facebook.com/TiresOnline',
  [LINKS.INSTAGRAM]: 'https://www.instagram.com/simple_tire/',
  [LINKS.LINKEDIN]: 'https://www.linkedin.com/company/simple-tire',
  [LINKS.REGISTER_TIRES]:
    'https://register.cimstireregistration.com/index.cfm?id=simple-tire',
  [LINKS.TWITTER]: 'https://twitter.com/SimpleTire',
  [LINKS.YOUTUBE]: 'https://www.youtube.com/channel/UCi4wQYLwGg_iE2FwOjTNH3Q',
};
