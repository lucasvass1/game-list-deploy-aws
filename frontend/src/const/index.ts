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
      List: 'List',
    },
    plataform: {
      List: 'List',
    },
    category: {
      List: 'List',
    },
  },
};
