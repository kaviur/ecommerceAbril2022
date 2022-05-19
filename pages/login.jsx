import React from 'react'
import { getCsrfToken } from "next-auth/react"
import {AiFillGithub} from "react-icons/ai"
import {AiFillGoogleCircle} from "react-icons/ai"

export async function getServerSideProps(context) {
    const csrfToken = await getCsrfToken(context)
    return {
      props: { csrfToken },
    }
}

export default function Login({ csrfToken }) {
  return (
    <div className='h-screen flex flex-col justify-center'>
    <h1 className='flex justify-center my-5 text-xl'>Ingresa aquí</h1>

      <form
        className="flex justify-center mb-5"
        action="/api/auth/signin/github"
        method="POST"
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <button
          className="p-3 bg-teal-700 rounded hover:bg-teal-500 hover:text-gray-300"
          type="submit"
        >
          <AiFillGithub className="w-10 h-10 inline-block" /> Inicia sesión con
          GitHub
        </button>
      </form>

      <form
        className="flex justify-center"
        action="/api/auth/signin/google"
        method="POST"
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <button
          className="p-3 rounded bg-teal-700 hover:bg-teal-500 hover:text-gray-300"
          type="submit"
        >
          <AiFillGoogleCircle className="w-10 h-10 inline-block" /> Inicia
          sesión con Google
        </button>
      </form>
    </div>
  );
}