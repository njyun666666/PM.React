export type RoleType = 'everyone' | 'administrator' | 'organization' | 'company';

export default {
  Role: {
    Evenyone: 'everyone',
    Administrator: 'administrator',
    Organization: 'organization',
    Company: 'company',
  } as { [key: string]: RoleType },
};
