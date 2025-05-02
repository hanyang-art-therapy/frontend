import styles from '@/styles/nav/nav.module.scss';

type LogoProps = {
  subName?: string;
};

export default function Logo({ subName }: LogoProps) {
  return (
    <a href='/' className={styles.logo}>
      <img src='/images/logo.webp' alt='logo' />
      <span className={styles.logoMajor}>미술치료학과</span>
      {subName && <p className={styles.logoSub}>{subName}</p>}
    </a>
  );
}
