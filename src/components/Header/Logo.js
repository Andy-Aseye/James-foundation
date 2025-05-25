import Image from "next/image"
import Link from "next/link"
import profileImg from "@/public/RJ-logo.png"

const Logo = () => {
  return (
    <Link href="/" className="flex items-center text-dark dark:text-light">
        <div className=" w-12 md:w-16 rounded-full overflow-hidden mr-1 md:mr-1">
            <Image src={profileImg} alt="The James Foundation logo" className="w-full h-auto rounded-full" sizes="20vw" priority />
        </div>
        {/* <span className="font-bold dark:font-semibold text-lg md:text-xl">The James Foundation</span> */}
    </Link>
  )
}

export default Logo
