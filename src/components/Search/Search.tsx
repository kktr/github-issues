import React, { ChangeEvent, useState, useEffect } from 'react';
import Image from 'next/image';
import {
  SearchMethod,
  Result,
  Results as IResults,
} from '../../../pages/interfaces/search';

import styles from './Search.module.css';
import gitHub from '../../../public/github-logo.png';

interface SearchProps {
  childToParent: (data: IResults) => void;
}

function Search({ childToParent }: SearchProps) {
  const [enteredSearch, setEnteredSearch] = useState<string>('');
  const [data, setData] = useState<IResults>();

  const searchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredSearch(event.target.value);
  };

  useEffect(() => {
    new SearchMethod().search({ search: enteredSearch }).then((response) => {
      setData(response);
    });
  }, [enteredSearch]);

  return (
    <header className={styles.header}>
      <a className={styles.logo} href="https://github.com/" tabIndex={0}>
        <Image src={gitHub} alt="github logo" />
      </a>

      <form className={styles.form}>
        <div className={styles.control}>
          <input
            id="search"
            type="string"
            tabIndex={1}
            required
            value={enteredSearch}
            placeholder="Search"
            onChange={(e) => searchChangeHandler(e)}
            className={styles.input}
          />
        </div>
      </form>
    </header>
  );
}

export default Search;
