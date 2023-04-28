import React, { useState } from 'react';
import './App.css';

type Data = {
  [key: string]: any 
}

const App: React.FC = () => {
const inputRef = React.useRef<HTMLInputElement>(null)
const [user, setUser] = useState<Data | null>(null);
const [userRepos, setUserRepos] = useState<Data | null>(null);
const [errorStatus, setErrorStatus] = useState<boolean>(false);
const errorMessage = `Sorry username doesn't exist`;

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const inputValue = inputRef?.current?.value;

  let userData = await  GetUser(inputValue);
  setUser(userData);

  let userRepoData = await GetUserRepos(inputValue);
  setUserRepos(userRepoData);
}

const GetUser = (username: string | undefined): Promise<Data> => {
  return fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(response => {
      return response;
    })
    .catch((err) => {
      setErrorStatus(true);
    });
}

const GetUserRepos = (username: string | undefined): Promise<Data> => {
  return fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(response => {
      return response;
    })
  }

  return (
    <div className="App">
      <h1>Look up a Github Username</h1>
      <form 
        onSubmit={handleSubmit}
      >
        <input ref={inputRef}  placeholder="username" type="text" />
        <button>Submit</button>
      </form>

      <div className="github-user">
        {errorStatus ?  errorMessage : ''}
        <img className='profile' src={user?.avatar_url} alt="" />
        <h2>Username: {user?.login}</h2>

        <h3>List of Repos</h3>
        <ul>
          {
            userRepos?.map((repos: { name: string; }, index: number) => (
            <li key={index}>{repos.name}</li>
            ))
          }
          </ul>
      </div>
    </div>
  );
}

export default App;
