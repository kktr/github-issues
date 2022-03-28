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
  login: 'MichalPaszkiewicz',
  avatarURL:
    'https://secure.gravatar.com/avatar/e7956084e75f239de85d3a31bc172ace?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png',
  fullName: 'Michal Paszkiewicz',
  bio: 'Just a guy who likes to make things @MichalYouDoing',
  location: 'London, England',
  followers: 10,
  following: 20,
  starred: 10,
};

const result2: UserResult = {
  id: 2,
  login: 'michalinamuskala',
  avatarURL:
    'https://secure.gravatar.com/avatar/e7956084e75f239de85d3a31bc172ace?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png',
  fullName: 'Michalina Muskała ',
  bio: 'Mój mąż? Mój mąż z zawodu jest dyrektorem!',
  location: 'London',
  followers: 20,
  following: 21,
  starred: 22,
};

const result3: RepositoryResult = {
  id: 3,
  name: '0bserver07/One-Hundred-Layers-Tiramisu',
  stargazersCount: 30,
  description:
    'Keras Implementation of The One Hundred Layers Tiramisu: Fully Convolutional DenseNets for Semantic Segmentation by (…',
  programingLanguage: 'Jupyter Notebook',
  updatedAt: '13 days ago',
  license: 'MIT',
};

const result4: RepositoryResult = {
  id: 4,
  name: "Source code for 'Practical Oracle Cloud Infrastructure' by Michal Jakóbczyk",
  stargazersCount: 7,
  description: 'lorem motorem potworem',
  programingLanguage: 'HCL',
  updatedAt: '11 Feb 2020',
  issues: '7 issues needed help',
};

export const mockResults: Results = [result1, result2, result3, result4];
