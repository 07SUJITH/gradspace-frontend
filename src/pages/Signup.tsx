'use client';

import axios from 'axios';
import { motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

import AnimatedLogo from '@/components/AnimatedLogo/AnimatedLogo';
import DotBackground from '@/components/DotBackground';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
export default function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    try {
      const response = await axios.post('/api/signup', {
        username,
        email,
        password,
      });
      toast.success('Joined successful!');
      console.log('signup response:', response.data);
      // Handle successful signup (e.g., store token, redirect)
    } catch (error) {
      toast.error('signup failed. Please try again.');
      console.error('signup error:', error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:px-28">
      <DotBackground />
      <motion.div
        className="hidden lg:flex lg:w-1/2 items-center justify-center  "
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* <img src="/hoppscotch.svg" alt="" className="w-1/3" /> */}
        <AnimatedLogo />
      </motion.div>
      <motion.div
        className="flex w-full lg:w-1/2 items-center justify-center p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className=" w-full flex justify-center items-center min-h-[80vh]  max-w-md  space-y-8">
          <div className="max-w-md md:w-[80%] w-[80%] space-y-8">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-bold tracking-tight font-philosopher ">
                Join{' '}
                <span
                  className={cn(
                    'inline-block px-4',
                    'transform skew-y-2',
                    'bg-violet-100 dark:bg-black font-bold font-philosopher text-violet-800 ',
                  )}
                >
                  <span className="transform -skew-y-2 inline-block">
                    {' '}
                    GradSpace
                  </span>
                </span>
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4 rounded-md shadow-sm">
                <div>
                  <Label htmlFor="email-address" className="sr-only">
                    Email address
                  </Label>
                  <Input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="username" className="sr-only">
                    Email address
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                    placeholder="User name "
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="sr-only">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="sr-only">
                    confirm password
                  </Label>
                  <Input
                    id="confirmpassword"
                    name="confirmpassword"
                    type="password"
                    required
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-center p-3 ">
                <Button className="bg-violet-900/80 px-10 dark:text-white dark:bg-violet-900">
                  Sign Up
                </Button>
              </div>
            </form>
            <p className="mt-2 text-center text-sm text-gray-600">
              already have an account ?
              <Link
                to="/login"
                className="font-medium text-primary hover:text-violet-800"
              >
                sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
