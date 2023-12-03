import Image from 'next/image'
import Link from 'next/link'
export default function Home() {
  return (
   <main>
    <h1>Fin Track</h1>
   <Link href="/signup">Sign Up</Link>
   <Link href="/login">Login</Link>
   </main>
  )
}
