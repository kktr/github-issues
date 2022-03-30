import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import styles from '../../styles/Home.module.css';

import { UserResult } from '../interfaces/search';

export default function Users() {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  return <div>The dynamic route is {id}</div>;
}
