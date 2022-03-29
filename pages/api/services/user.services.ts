import axios from "axios";
import { GeneralUserList } from "../../interfaces/importListUsers";
import { IStars } from "../../interfaces/importStarredRepos";
import { UserGithub } from "../../interfaces/ImportUser";
import { Result } from "../../interfaces/search";

export async function getExternalUsersFromGitHub(query: string ) {

  try {

    const res = await axios.get('https://api.github.com/search/users', { params: { q: query, per_page: 5, } 
     , headers: { Authorization: `token ${process.env.gitToken}` }  });
    const data: GeneralUserList = res.data;
    // console.log(data);
    return  data as GeneralUserList;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}
export async function  GetMoreUserData(BasicsUsers:GeneralUserList)  {
  const users: UserGithub[] = []
  try {
    for (let user of BasicsUsers.items) {
      const res = await axios.get('https://api.github.com/users/' + user.login, { headers: { Authorization: `token ${process.env.gitToken}` } });
      const data: UserGithub = res.data;
      // console.log(data);
      users.push(data);
    } 
    return users;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}
export  function MappingUserOutPutData(Users:UserGithub[]):Result[] {
  const data: Result[] = [];
 
  Users.forEach(user => { 
      const result:Result = {
      id: user.id,
      login: user.login,
      avatarURL: user.avatar_url,
      fullName: user.name,
      bio: user.bio,
      location: user.location,
      followers: user.followers,
      following: user.following,
      // starred: user.starredURL,
    };
    data.push(result);
  });
 
     
  return data;
}
async function getGitHubStarred(user: string) {
  const response = await axios.get(`https://api.github.com/users/${user}/starred`,  {
      headers: { Authorization: `token ${process.env.gitToken}` },  params: {  per_page:100, } });
  const data: IStars[] = response.data;
  console.log( 'response',data);
//   for (d of)
  return data.length;
// stargazers_count
  
}

export async function UserData(query:string): Promise<Result[]> {
         const Users = await getExternalUsersFromGitHub(query);
      const FullUsers = await GetMoreUserData(Users);
    return  MappingUserOutPutData(FullUsers);
 
}