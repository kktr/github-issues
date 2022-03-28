export interface Search {
  search: string;
}

// export interface Result {
//   id: number;
// }

export interface UserResult {
  id: number;
  login: string;
  avatarURL: string;
  fullName: string;
  bio?: string;
  location?: string;
  followers: number;
  following: number;
  starred?: any;
}
export interface RepositoryResult {
  id: number;
  name: string;
  stargazersCount: number;
  description?: string;
  programingLanguage?: string;
  updatedAt: string;
  issues?: string;
  license?: string;
}

export type Result = UserResult | RepositoryResult;

export type Results = Result[];

const result1: UserResult = {
  id: 1,
  login: 'userOne',
  avatarURL:
    'https://secure.gravatar.com/avatar/e7956084e75f239de85d3a31bc172ace?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png',
  fullName: 'User One',
  bio: 'lorem ipsium dipsum',
  location: 'Warszawa',
  followers: 10,
  following: 20,
  starred: 10,
};

const result2: UserResult = {
  id: 2,
  login: 'userTwo',
  avatarURL:
    'https://secure.gravatar.com/avatar/e7956084e75f239de85d3a31bc172ace?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png',
  fullName: 'User Two',
  bio: 'lorem ipsium dipsum 2',
  location: 'Poznań',
  followers: 20,
  following: 21,
  starred: 22,
};

const result3: RepositoryResult = {
  id: 3,
  name: 'repoOne',
  stargazersCount: 30,
  description: 'lorem motorem',
  programingLanguage: 'Python',
  updatedAt: '7 days ago',
};

const result4: RepositoryResult = {
  id: 4,
  name: 'repoTwo',
  stargazersCount: 40,
  description: 'lorem motorem potworem',
  programingLanguage: 'typescript',
  updatedAt: '22 aug 2016',
  issues: '7 issues needed help',
  license: 'MIT',
};

export const mockResults: Results = [result1, result2, result3, result4];
