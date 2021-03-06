import styles from './ResultRepository.module.css';
import { RepositoryResult } from '../../../pages/interfaces/search';

interface ResultRepositoryProps {
  result: RepositoryResult;
}

function ResultRepository({ result }: ResultRepositoryProps) {
  return (
    <div className={styles.result}>
      <div className={styles.icon}>
        <svg
          width="16"
          height="18"
          viewBox="0 0 16 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.16667 17.3252H13C14.005 17.3252 15.5 16.6594 15.5 14.8252L15.5 3.15853C15.5 1.32436 14.005 0.658527 13 0.658527L0.5 0.658527V2.32519L12.99 2.32519C13.375 2.33519 13.8333 2.48769 13.8333 3.15853C13.8333 3.24269 13.8258 3.3177 13.8133 3.38603C13.72 3.8652 13.3275 3.98353 12.9908 3.99186L1.33333 3.99186C1.31833 3.99186 1.3075 3.99936 1.2925 4.00019H0.5L0.5 15.6585C0.5 16.5777 1.2475 17.3252 2.16667 17.3252ZM2.16667 5.65853L13.8333 5.65853L13.8333 14.8252C13.8333 15.4969 13.375 15.6485 13 15.6585L7.16667 15.6585L7.16667 9.82519L5.5 10.6585L3.83333 9.82519L3.83333 15.6585H2.16667L2.16667 5.65853Z"
            fill="#6F7781"
          />
        </svg>
      </div>

      <div className={styles.content}>
        <div className={styles.name}>{`${result.name}`}</div>

        {result.description && (
          <div className={styles.description}>{`${result.description}`}</div>
        )}

        <div className={styles.additional}>
          <div className={styles.center}>
            <div className={styles.stargazers}>
              <svg
                className={styles.star}
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.00014 2.26L9.38014 5.05L9.61014 5.55L10.1101 5.625L13.1901 6.07L11.0001 8.22L10.6251 8.585L10.7151 9.085L11.2401 12.15L8.48513 10.705L8.00014 10.5L7.53513 10.745L4.78013 12.17L5.28014 9.105L5.37014 8.605L5.00014 8.22L2.79014 6.045L5.87014 5.6L6.37014 5.525L6.60014 5.025L8.00014 2.26ZM8.00014 1.28686e-06L5.72514 4.61L0.640136 5.345L4.32014 8.935L3.45013 14L8.00013 11.61L12.5501 14L11.6801 8.935L15.3601 5.35L10.2751 4.61L8.00014 1.28686e-06Z"
                  fill="#6F7781"
                />
              </svg>
              <div>{`${result.stargazersCount}`}</div>
            </div>
          </div>

          {result.programingLanguage && (
            <div
              className={styles.programingLanguage}
            >{`${result.programingLanguage}`}</div>
          )}

          <div
            className={styles.updated}
          >{`Update on ${result.updatedAt}`}</div>
        </div>
      </div>
    </div>
  );
}

export default ResultRepository;
