import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import { SignInForm } from '@/components/sign-in-form';

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  if (session) return redirect('/dashboard');
  return (
    <>
      <h1>Giriş Sayfasına Hoşgeldiniz</h1>
      <SignInForm />
    </>
  );
}
