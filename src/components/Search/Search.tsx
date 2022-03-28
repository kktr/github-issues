import React, { ChangeEvent, useState } from 'react';
import Image from 'next/image';

import styles from './Search.module.css';
import gitHub from '../../../public/github-logo.png';

function Search() {
  const [enteredSearch, setEnteredSearch] = useState('');

  const searchChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredSearch(event.target.value);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src={gitHub} alt="github logo" />
      </div>

      <form className={styles.form}>
        <div className={styles.control}>
          <input
            id="search"
            type="string"
            required
            value={enteredSearch}
            // onChange={setEnteredSearch}
            className={styles.input}
          />
        </div>
      </form>
    </header>
  );
}

export default Search;
