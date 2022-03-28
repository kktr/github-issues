import styles from './ResultUser.module.css';
import { UserResult } from '../../../pages/interfaces/search';
import Image from 'next/image';

interface ResultUserProps {
  result: UserResult;
}

function ResultUser({ result }: ResultUserProps) {
  return (
    <div className={styles.result}>
      <div className={styles.container}>
        <Image
          className={styles.avatar}
          alt="github avatar"
          src={result.avatarURL}
          width="20px"
          height="20px"
        />
      </div>

      <div>
        <div className={styles.fullName}>{`${result.fullName}`}</div>
        <div className={styles.login}>{`${result.login}`}</div>

        {result.bio && <div className={styles.bio}>{`${result.bio}`}</div>}

        {result.location && (
          <div className={styles.location}>{`${result.location}`}</div>
        )}
      </div>
    </div>
  );
}

export default ResultUser;
