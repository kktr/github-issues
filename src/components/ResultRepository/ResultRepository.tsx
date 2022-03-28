import styles from './ResultRepository.module.css';
export Result from './'

function ResultRepository({ result }) {
  const resultRepository = result;

  return (
    <div className={styles.result}>
      <div className={styles.reponame}></div>
      <div className={styles.reponame}></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default ResultRepository;
