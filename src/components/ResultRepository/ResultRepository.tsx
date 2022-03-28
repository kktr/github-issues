import styles from './ResultRepository.module.css';
import { RepositoryResult } from '../../../pages/interfaces/search';

interface ResultRepositoryProps {
  result: RepositoryResult;
}

function ResultRepository({ result }: ResultRepositoryProps) {
  return (
    <div className={styles.result}>
      <div className={styles.name}>{`${result.name}`}</div>

      {result.description && (
        <div className={styles.description}>{`${result.description}`}</div>
      )}

      <div className={styles.additional}>
        <div className={styles.stargazers}>{`${result.stargazersCount}`}</div>

        {result.programingLanguage && (
          <div
            className={styles.programingLanguage}
          >{`${result.programingLanguage}`}</div>
        )}

        <div className={styles.updated}>{`Update on ${result.updatedAt}`}</div>
      </div>
    </div>
  );
}

export default ResultRepository;
