export const REGEX_VALIDATE_PASSWORD_REGISTER =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?/{}~])[A-Za-z\d!@#$%^&*()_\-+=<>?/{}~]{8,}$/;
export const REGEX_VALIDATE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const SECOND = 1000;
export const MINUTE = SECOND * 60;

export const REACT_QUERY_KEYS = {
  screens: {
    users: {
      Stats: 'Stats',
    },
    games: {
      List: 'ListGames',
    },
    plataform: {
      List: 'ListPlataform',
    },
    category: {
      List: 'ListCategory',
    },
  },
};

export const MAP_SORT_BY_PLATFORM = [
  '',
  'title',
  'company',
  'acquisitionYear',
  'createdAt',
  'updatedAt',
];

export const URL_DEFAULT_IMAGE =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjGzoB0iNupD1n4X2hMt8a0abTvs9rszQHLw&s';

export const PLATFORM_MODAL_CONFIG = {
  CREATE: {
    title: 'New Platform',
    button: 'Save Platform +',
  },
  UPDATE: {
    title: 'Edit Platform',
    button: 'Edit Platform +',
  },
  VIEW: {
    title: 'Details Platform',
    button: '',
  },
  DELETE: {
    title: 'Delete Platform',
    button: '',
  },
} as const;
