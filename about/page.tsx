import Hero from "@/components/hero"
import SocialLinks from "@/components/social-links"
import DynamicBackground from "@/components/dynamic-background"
import MusicPlayer from "@/components/music-player"
import Image from "next/image"

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <DynamicBackground />
      <div className="z-10 flex flex-col items-center">
        <Image
          src="/profile-picture.jpg"
          alt="Profile Picture"
          width={120}
          height={120}
          className="rounded-full mb-4"
        />
        <Hero />
        <SocialLinks />
      </div>
      <MusicPlayer />
    </main>
  )
}

