# NextAuth Kullanımı

### 1- Klasör Yapısı

**"app"** klasörü altına **"api>auth>[...nextauth]>route.ts ve options.ts"** dosyalarını oluştur.

**'route.ts'** dosyası:

```
import NextAuth from "next-auth";
import { authOptions } from "./options";

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

**"options.ts"** dosyası:

```
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// fake user verisi
const USER = { id: "1", email: 'temur@gmail.com', password: '1234' }

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: 'e.g johndoe@xxx.xx' },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Demo kullanıcı
        if (credentials?.email === USER.email && credentials?.password === USER.password) {
          return USER;
        }
        return null;
      },
    }),
  ],
  // Giriş sayfasını özelleştirmek için burada istediğin sayfanın yolunu belirtmelisin
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
};
```

---

### 2- Özel Giriş Sayfası

**"app"** klasörü altına normal bir sayfa açar gibi **"sign-in"** sayfanı aç.

**"sign-in"** dosyası:

```
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import { SignInForm } from '@/components/sign-in-form';

export default async function SignInPage() {
  // kullanıcı zaten oturum açmışmı görebilmek için session verisini aldık
  const session = await getServerSession(authOptions);
  if (session) return redirect('/dashboard'); // oturum açıksa yönlendirildi
  return (
    <>
      <h1>Giriş Sayfasına Hoşgeldiniz</h1>
      <SignInForm />
    </>
  );
}
```

**"SignInForm"** componenti:

```
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
```

---

### 3- Dashboard Sayfası

Oturum açmış olan kullanıcının olması gereken sayfa.
**"dashboard"** dosyası:

```
import React from 'react';
import { SignOutButton } from '@/components/sign-out-button';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) return redirect('/'); // oturm açılmamışsa yönlendir

  return (
    <div>
      <h1 className='text-6xl'>Hoş geldin {session?.user?.email}! Burası Dashboard 🎉</h1>
      <SignOutButton />
    </div>
  );
}
```

**"SignOutButton"** componenti:

```
'use client';

import { signOut } from 'next-auth/react';

export const SignOutButton = () => {
  return <button onClick={() => signOut({ callbackUrl: '/' })}>Çıkış Yap</button>;
};
```

---

### 4- NEXTAUTH_SECRET

**".env.local"** dosyasına **"NEXTAUTH_SECRET"**'a değer olarak git bash terminalinde **"$ openssl rand -base64 32"** komutunu yazıp çıkan değeri vermelisin.

```
NEXTAUTH_SECRET=******** // çıkan değer
```

---

### 5- next.config Ayarı

```
  experimental: {
    serverActions: { bodySizeLimit: "1mb", allowedOrigins: ["*"] }, // App Router için öneriliyor
  },
```
