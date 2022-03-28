import React, { ChangeEvent, useState } from 'react';

import styles from './Search.module.css';

function Search() {
  const [enteredSearch, setEnteredSearch] = useState('');

  const searchChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredSearch(event.target.value);
  };

  return (
    <form className={styles.form}>
      <div className={styles.control}>
        <input
          id="search"
          type="string"
          required
          value={enteredSearch}
          onChange={setEnteredSearch}
          className={styles.input}
        />
      </div>
    </form>
  );
}

export default Search;
