import {
  IconHome,
  IconInfoCircle,
  IconMessage,
  IconStar,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Briefcase,
  Calendar,
  Filter,
  MessageCircle,
  ShoppingBag,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll'; // For smooth scrolling

import TermsOfService from '@/components/TermsOfService';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import BoxReveal from '@/components/ui/box-reveal';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import DotPattern from '@/components/ui/dot-pattern';
import { FloatingNav } from '@/components/ui/floating-navbar';
import ShinyButton from '@/components/ui/shiny-button';
import { cn } from '@/lib/utils';
export default function Home() {
  const [showTerms, setShowTerms] = useState(false);
  const navItems = [
    {
      name: 'Home',
      link: '#home',
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: 'About',
      link: '#about',
      icon: (
        <IconInfoCircle className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
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
  const features = [
    {
      icon: <Users className="h-12 w-12" />,
      title: 'Alumni Social Network',
      description:
        'Connect, like, and comment on posts from fellow college alumni.',
    },
    {
      icon: <ShoppingBag className="h-12 w-12" />,
      title: 'C2C Marketplace',
      description: 'Buy and sell items within your trusted alumni community.',
    },
    {
      icon: <MessageCircle className="h-12 w-12" />,
      title: 'Peer Connection & Chat',
      description: 'Build relationships and chat privately with other alumni.',
    },
    {
      icon: <Briefcase className="h-12 w-12" />,
      title: 'Job Portal',
      description: 'Find and post job opportunities exclusively for alumni.',
    },
    {
      icon: <Filter className="h-12 w-12" />,
      title: 'Smart Candidate Filtering',
      description:
        'Match job descriptions with user profiles for perfect fits.',
    },
    {
      icon: <BookOpen className="h-12 w-12" />,
      title: 'Project Showcase',
      description:
        'Display and explore innovative projects from talented alumni.',
    },
    {
      icon: <Calendar className="h-12 w-12" />,
      title: 'Event Board',
      description: 'Stay updated with alumni gatherings and networking events.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <div className="flex flex-col min-h-screen">
      <FloatingNav navItems={navItems} />
      <main className="flex-1 ">
        <DotPattern
          className={cn(
            '[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]',
          )}
        />
        <div className="flex justify-center md:py-3 py-20 min-h-screen">
          <section
            className="w-full  flex justify-center  py-12 md:py-24 lg:py-32 xl:py-48"
            id="home"
          >
            <div className="container px-4 md:px-6 ">
              <div className="flex flex-col items-center space-y-4 text-center text-violet-900  dark:text-neutral-50">
                <h1 className="mb-6  text-5xl font-bold font-philosopher tracking-tighter md:text-6xl">
                  <BoxReveal boxColor={'#E9D5FF'} duration={0.5}>
                    <div>
                      <span
                        className={cn(
                          'inline-block px-4',
                          'transform skew-y-2',
                          'bg-violet-300 dark:bg-black dark:text-white/70 text-black/90 ',
                        )}
                      >
                        <span className="transform -skew-y-2 inline-block">
                          Simplify
                        </span>
                      </span>{' '}
                      Your Alumni
                    </div>
                  </BoxReveal>

                  <BoxReveal boxColor={'#E9D5FF'} duration={0.5}>
                    <>
                      Network,{' '}
                      <span
                        className={cn(
                          'inline-block px-4',
                          'transform -skew-y-2',
                          'bg-violet-300 dark:bg-black dark:text-white/70 text-black/90 ',
                        )}
                      >
                        <span className="transform skew-y-2 inline-block">
                          {' '}
                          Amplify
                        </span>
                      </span>
                      <br />
                      Connections
                    </>
                  </BoxReveal>
                </h1>
                <div className="max-w-[700px] mx-auto px-4 ">
                  <p className="text-base sm:text-lg md:text-xl font-philosopher   text-gray-600 dark:text-white  text-center">
                    Why struggle to bridge the gap when{' '}
                    <span
                      className={cn(
                        'inline-block px-4',
                        'transform -skew-y-2',
                        'bg-violet-200 dark:bg-black font-bold font-philosopher text-violet-800 ',
                      )}
                    >
                      <span className="transform skew-y-2 inline-block">
                        {' '}
                        GradSpace
                      </span>
                    </span>
                    connects it for you? From{' '}
                    <span className="font-medium">
                      job opportunities
                    </span> to{' '}
                    <span className="font-medium">
                      tailored recommendations
                    </span>
                    , events to meaningful connections – empower your journey
                    with the perfect{' '}
                    <span className="text-violet-600">
                      student-alumni synergy
                    </span>
                    !
                  </p>
                </div>
                ;
                <div className="gap-5 flex">
                  <Link to="/signup">
                    <Button className="bg-violet-900  dark:text-white dark:bg-violet-900">
                      Get Started
                    </Button>
                  </Link>
                  <ScrollLink
                    key="learn_more"
                    to="about" // Remove the '#' for the smooth scroll
                    spy={true}
                    smooth={true}
                    duration={500}
                    className={cn(
                      'relative dark:text-neutral-50 items-center cursor-pointer flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500',
                    )}
                  >
                    <ShinyButton>Learn More</ShinyButton>
                  </ScrollLink>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section id="about" className="flex  flex-col lg:flex-row lg:px-28  ">
          <motion.div
            className="hidden lg:flex lg:w-1/3 items-center justify-center  "
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DotPattern
              className={cn(
                '[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]',
              )}
            />
            <img src="/hoppscotch.svg" alt="" className="w-1/3" />
          </motion.div>
          <motion.div
            className="flex w-full  items-center justify-center p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-full space-y-8">
              <h2 className="text-2xl font-extrabold font-philosopher  tracking-tighter sm:text-5xl mb-6 text-center md:mx-auto transition duration-500 ease-in-out sm:mt-9">
                <span
                  className={cn(
                    'inline-block px-4',
                    'transform -skew-y-2',
                    'bg-violet-200 dark:bg-black font-bold font-philosopher text-violet-800 ',
                  )}
                >
                  <span className="transform skew-y-2 inline-block">
                    {' '}
                    About
                  </span>
                </span>
              </h2>
              <p className="mx-auto text-gray-700  md:text-xl dark:text-gray-400 text-justify  leading-relaxed md:max-w-3xl md:mx-auto">
                In a world where social media tells the story of your
                life—whether through who you follow or the content you
                consume—there’s a growing need for spaces that foster
                meaningful, purposeful connections. Gradspace was born from this
                realization. It’s not just about scrolling through feeds; it’s
                about actively shaping your journey. Gradspace is designed to
                connect students and alumni in a meaningful way, helping you
                bridge the gap between education and professional growth.
                Whether you’re a student looking for guidance, or an alum eager
                to give back, this platform creates a space where knowledge,
                experience, and opportunities can be shared without barriers.
                <br />
                <br />
                Why did platforms like Gradspace come into existence? Because,
                while traditional social media has its place, it doesn’t always
                serve the needs of those who want to take control of their own
                professional growth. It’s time for each of us to take charge of
                our own paths, to build connections that truly matter, and to
                learn from those who have walked the path before us. With
                Gradspace, the future of your career is not left to chance. It’s
                about empowering you, as a student or graduate, to make
                connections that can change your life, and in turn, contribute
                to the success of others.
              </p>
            </div>
          </motion.div>
        </section>

        <section
          id="features"
          className="w-full flex justify-center py-12 md:py-24 lg:py-32 "
        >
          <div className="container px-4 md:px-6">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold font-philosopher tracking-tighter sm:text-5xl text-center mb-12 text-gray-900 dark:text-gray-100"
            >
              <span
                className={cn(
                  'inline-block px-4',
                  'transform -skew-y-2',
                  'bg-violet-200 dark:bg-black font-bold font-philosopher text-violet-800 ',
                )}
              >
                <span className="transform skew-y-2 inline-block">
                  {' '}
                  Key Features
                </span>
              </span>
            </motion.h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {features.map((feature, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl dark:hover:shadow-primary/25 hover:-translate-y-2 bg-white dark:bg-black/40 border-gray-200 border-2  dark:border-gray-800">
                    <CardContent className="flex flex-col items-center space-y-4 p-6">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{
                          type: 'spring',
                          stiffness: 260,
                          damping: 20,
                        }}
                        className="p-3 rounded-full bg-primary/10 text-primary dark:bg-black/100 dark:text-white group-hover:bg-primary group-hover:text-white dark:group-hover:bg-slate-900 dark:group-hover:text-white"
                      >
                        {feature.icon}
                      </motion.div>
                      <h3 className="text-2xl font-bold text-center group-hover:text-primary transition-colors duration-300 text-gray-900 dark:text-gray-100">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-center group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        <section
          id="testimonials"
          className="w-full flex justify-center py-12 md:py-24 lg:py-32"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold font-philosopher  tracking-tighter sm:text-5xl text-center mb-12">
              <span
                className={cn(
                  'inline-block px-4',
                  'transform -skew-y-2',
                  'bg-violet-200 dark:bg-black font-bold font-philosopher text-violet-800 ',
                )}
              >
                <span className="transform skew-y-2 inline-block">
                  {' '}
                  What Our Users Say
                </span>
              </span>
            </h2>
            <div className="grid gap-6 items-center md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      alt="Sarah Johnson"
                      src="/placeholder.svg?height=64&width=64"
                    />
                    <AvatarFallback>ST</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold">Sujith T S </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Class of 2021
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      " GradSpace helped me find a mentor in my field. It's been
                      invaluable for my
                      <br /> career growth!"
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
                    <AvatarFallback>JM</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold">Jelan Mathew James</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Class of 2021
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
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold">Joel Siby Varghese</h3>
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
          className="w-full flex justify-center py-12 md:py-24 lg:py-32 "
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-philosopher  font-bold tracking-tighter sm:text-5xl">
                  Join GradSpace Today
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Start building your professional network and unlock new
                  opportunities. Sign up now to connect with alumni and fellow
                  graduates.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Link to="/signup">
                  <Button className="w-full text-xl font-bold font-philosopher">
                    Sign up Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center dark:bg-black px-4 md:px-6 border-t">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © 2024 GradSpace. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <button
            className="text-sm hover:underline underline-offset-4"
            onClick={() => setShowTerms(true)}
          >
            Terms of Service
          </button>

          <Link
            className=" font-bold text-sm hover:underline underline-offset-4"
            to="/devinfo"
          >
            Dev-ino
          </Link>
        </nav>
      </footer>
      {showTerms && <TermsOfService onClose={() => setShowTerms(false)} />}
    </div>
  );
}
