import styles from '@/styles/nav/nav.module.scss';

type LogoProps = {
  subName?: string;
};

export default function Logo({ subName }: LogoProps) {
  return (
    <a href='/' className={styles.logo}>
      <img src='/images/logo.webp' alt='logo' />
      <span>미술치료학과</span>
      {subName && <span>{subName}</span>}
    </a>
  );
}
