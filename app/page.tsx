import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1 className='text-4xl'>Ana Sayfa</h1>
      <Link href='/sign-in' className='p-[4px] bg-amber-50 text-[black]'>Giriş Yap</Link>
    </div>
  );
}
