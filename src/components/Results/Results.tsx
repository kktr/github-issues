import styles from './Results.module.css';
import {
  Results as SearchResults,
  UserResult,
  RepositoryResult,
  mockResults,
} from '../../../pages/interfaces/search';
import ResultUser from '../ResultUser/ResultUser';
import ResultRepository from '../ResultRepository/ResultRepository';

interface ResultsProp {
  results: SearchResults;
}

function Results({ results }: ResultsProp) {
  const displayResults = (
    dataResults: SearchResults
  ): UserResult | RepositoryResult => {
    for (const result of dataResults) {
      result.avatarURL ? (
        <ResultUser submitResult={result} />
      ) : (
        <ResultRepository submitResult={result} />
      );
    }
  };

  return <div className={styles.results}>{displayResults(mockResults)}</div>;
}

export default Results;
