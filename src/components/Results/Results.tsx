import styles from './Results.module.css';
import {
  Results as IResults,
  UserResult,
  RepositoryResult,
  mockResults,
  Result,
} from '../../../pages/interfaces/search';
import ResultUser from '../ResultUser/ResultUser';
import ResultRepository from '../ResultRepository/ResultRepository';

interface ResultsProp {
  parentToChild: IResults;
}

function Results({ parentToChild }: ResultsProp) {
  const isResultUser = (value: Result) => {
    return 'avatarURL' in value;
  };

  const displayResults = async (dataResults: IResults) => {
    const data = await dataResults;
    return data.map((result: Result) => {
      return isResultUser(result) ? (
        <ResultUser result={result as UserResult} />
      ) : (
        <ResultRepository result={result as RepositoryResult} />
      );
    });
  };

  const pageChangeHHandler = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const target = e.target as HTMLAnchorElement;
  };

  return (
    <div className={styles.container}>
      <div className={styles.summary}>{`${mockResults.length} results`}</div>

      <div className={styles.results}>{displayResults(parentToChild)}</div>

      <div>
        <div className={styles.buttons}>
          <a
            id="previous"
            tabIndex={2}
            className={styles.button}
            onClick={(e) => pageChangeHHandler(e)}
          >
            <span className={styles.arrow}>&lt;</span>Previous
          </a>

          <a
            id="next"
            tabIndex={3}
            className={styles.button}
            onClick={(e) => pageChangeHHandler(e)}
          >
            Next<span className={styles.arrow}>&gt;</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Results;
