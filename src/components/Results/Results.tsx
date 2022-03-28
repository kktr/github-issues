import styles from './Results.module.css';
import {
  Results as SearchResults,
  UserResult,
  RepositoryResult,
  mockResults,
  Result,
} from '../../../pages/interfaces/search';
import ResultUser from '../ResultUser/ResultUser';
import ResultRepository from '../ResultRepository/ResultRepository';

interface ResultsProp {
  results: SearchResults;
}

function Results({ results }: ResultsProp) {
  const isResultUser = (value: Result) => {
    return 'avatarURL' in value;
  };

  const displayResults = (dataResults: SearchResults) => {
    return dataResults.map((result: Result) => {
      return isResultUser(result) ? (
        <ResultUser result={result as UserResult} />
      ) : (
        <ResultRepository result={result as RepositoryResult} />
      );
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.summary}>{`${mockResults.length} results`}</div>
      <div className={styles.results}>{displayResults(mockResults)}</div>
    </div>
  );
}

export default Results;
