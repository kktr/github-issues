export interface Search {
  search: string;
}

// export interface Result {
//   id: number;
// }

export interface UserResult {
  id: number;
  username: string;
  avatar: string;
  fullName: string;
  description: string;
  localization: string;
  numberOfFollowers: number;
  numberOfFollowing: number;
  starred: any;
}
export interface RepositoryResult {
  id: number;
  name: string;
  starred: string;
  description: string;
  programingLanguage: string;
  whenUpdated: string;
}

type Result = UserResult | RepositoryResult;

export interface Results {
  results: Result[];
}
