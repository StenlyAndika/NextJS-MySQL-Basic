import Head from 'next/head'
import Layout from '@/component/Layout'
import { useState } from 'react';
import AppContext from '@/context/appContext'

export default function Home({users}) {

  const [myUsers, setMyUsers] = useState(users);

  return (
    <>
      <Head>
        <title>NextJS MySQL CRUD tutorial</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="Description" content="NextJS MySQL CRUD tutorial"/>
      </Head>
      <main>
        <AppContext.Provider value = {{
          users: myUsers,
          setMyUsers: setMyUsers
        }}>
        <Layout />
        </AppContext.Provider>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/controllers");
  const users = await response.json();

  return {
    props: {
      users: users
    }
  }
}
