'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const SignInForm = () => {
  const router = useRouter();
  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/dashboard',
    });

    if (res?.ok) {
      router.push('/dashboard');
    } else {
      alert('Giriş Başarısız');
    }
  }

  return (
    <div>
      <h1>Özel Giriş</h1>
      <form onSubmit={handleLogin}>
        <input name='email' placeholder='Email' required />
        <input name='password' type='password' placeholder='Şifre' required />
        <button type='submit'>Giriş Yap</button>
      </form>
    </div>
  );
};
