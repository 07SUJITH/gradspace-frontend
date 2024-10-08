import { IconHome, IconMessage, IconStar } from '@tabler/icons-react';
import { Calendar, MessageCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BackgroundLines } from '@/components/ui/background-lines';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import DotPattern from '@/components/ui/dot-pattern';
import { FloatingNav } from '@/components/ui/floating-navbar';
import { Input } from '@/components/ui/input';
import { RainbowButton } from '@/components/ui/rainbow-button';
import ShinyButton from '@/components/ui/shiny-button';
import SparklesWordPullUp from '@/components/ui/sparklesWordPullUp';
import WordRotate from '@/components/ui/word-rotate';
import { cn } from '@/lib/utils';

export default function Home() {
  const navItems = [
    {
      name: 'Home',
      link: '#home',
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: 'Features',
      link: '#features',
      icon: <IconStar className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: 'Contact',
      link: '#contact',
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <FloatingNav navItems={navItems} />
      <main className="flex-1">
        <DotPattern
          className={cn(
            '[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]',
          )}
        />
        <BackgroundLines>
          <section
            className="w-full  flex justify-center py-12 md:py-24 lg:py-32 xl:py-48"
            id="home"
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  {/* <SparklesText text="GradSpace" />; */}
                  {/* <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
                    Connect, Learn, and Grow Together!
                  </h2> */}
                  <SparklesWordPullUp
                    text="Gradspace"
                    sparklesCount={15}
                    className="font-philosopher "
                    colors={{ first: '#45287B', second: 'white' }}
                  />
                  <WordRotate
                    className="text-4xl font-bold text-black dark:text-white font-philosopher "
                    words={['Connect, Learn, and Grow Together!']}
                  />
                  {/* <WordPullUp
                    className="text-4xl font-bold tracking-[-0.02em] text-black dark:text-white md:text-7xl md:leading-[5rem]"
                    words=" Connect, Learn, and Grow Together!"
                  /> */}
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    Connect with alumni, find mentors, and explore career
                    opportunities. Your gateway to a thriving professional
                    network.
                  </p>
                </div>
                <div className="gap-5 flex">
                  <Link to="/signup">
                    <RainbowButton>Get Started</RainbowButton>
                  </Link>
                  <ShinyButton>Learn More</ShinyButton>
                </div>
              </div>
            </div>
          </section>
        </BackgroundLines>

        <section
          id="features"
          className="w-full flex justify-center py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-black"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid gap-6 items-center md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Users className="h-12 w-12 text-gray-600 dark:text-gray-400" />
                  <h3 className="text-2xl font-bold text-center">
                    Alumni Network
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    Connect with graduates from your school and expand your
                    professional network.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Calendar className="h-12 w-12 text-gray-600 dark:text-gray-400" />
                  <h3 className="text-2xl font-bold text-center">
                    Events & Webinars
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    Participate in exclusive events and webinars hosted by
                    successful alumni.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <MessageCircle className="h-12 w-12 text-gray-600 dark:text-gray-400" />
                  <h3 className="text-2xl font-bold text-center">
                    Mentorship Program
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    Find mentors in your field of interest and get guidance for
                    your career.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section
          id="testimonials"
          className="w-full flex justify-center py-12 md:py-24 lg:py-32"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              What Our Users Say
            </h2>
            <div className="grid gap-6 items-center md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      alt="Sarah Johnson"
                      src="/placeholder.svg?height=64&width=64"
                    />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold">Sarah Johnson</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Class of 2020
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      "GradSpace helped me find a mentor in my field. It's been
                      invaluable for my career growth!"
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      alt="Michael Lee"
                      src="/placeholder.svg?height=64&width=64"
                    />
                    <AvatarFallback>ML</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold">Michael Lee</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Class of 2018
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      "The networking opportunities on GradSpace are
                      unparalleled. I've made connections that led to my dream
                      job."
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      alt="Emily Chen"
                      src="/placeholder.svg?height=64&width=64"
                    />
                    <AvatarFallback>EC</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold">Emily Chen</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Class of 2021
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      "As a recent graduate, GradSpace has been crucial in
                      helping me navigate the job market and connect with alumni
                      in my industry."
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section
          id="contact"
          className="w-full flex justify-center py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-black"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Join GradSpace Today
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Start building your professional network and unlock new
                  opportunities. Sign up now to connect with alumni and fellow
                  graduates.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex flex-col gap-2">
                  <Input placeholder="Enter your email" type="email" />
                  <Button type="submit">Sign Up</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center dark:bg-black px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 GradSpace. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Terms of Service
          </Link>

          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
