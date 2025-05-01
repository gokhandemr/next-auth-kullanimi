import React from 'react';
import { SignOutButton } from '@/components/sign-out-button';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) return redirect('/');

  return (
    <div>
      <h1 className='text-6xl'>Hoş geldin {session?.user?.email}! Burası Dashboard 🎉</h1>
      <SignOutButton />
    </div>
  );
}
