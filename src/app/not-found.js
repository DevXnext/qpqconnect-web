import Image from 'next/image'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center bg-black text-white w-full h-screen space-y-5'>
        <Image src="/logo/q.png" width={25} height={25} alt='' />
      <h2>Sorry Not Found !</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}