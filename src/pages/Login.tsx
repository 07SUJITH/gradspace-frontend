'use client';

import axios from 'axios';
import { motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

import AnimatedLogo from '@/components/AnimatedLogo/AnimatedLogo';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import DotPattern from '@/components/ui/dot-pattern';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', {
        email,
        password,
        rememberMe,
      });
      toast.success('Login successful!');
      console.log('Login response:', response.data);
      // Handle successful login (e.g., store token, redirect)
    } catch (error) {
      toast.error('Login failed. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:px-28">
      <motion.div
        className="hidden lg:flex lg:w-1/2 items-center justify-center  "
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <DotPattern
          className={cn(
            '[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]',
          )}
        />
        <AnimatedLogo />
        {/* <img src="/hoppscotch.svg" alt="" className="w-1/3" /> */}
      </motion.div>
      <motion.div
        className="flex w-full lg:w-1/2 items-center justify-center p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <DotPattern
          className={cn(
            '[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]',
          )}
        />
        <div className="w-full flex justify-center items-center min-h-[80vh]  max-w-md  space-y-8">
          <div>
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-bold tracking-tight font-philosopher ">
                Sign in to
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
                  <Label htmlFor="password" className="sr-only">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox
                    className=" hover:bg-violet-100 dark:hover:bg-gray-800"
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm cursor-pointer hover:text-violet-800 dark:text-slate-500 text-gray-900"
                  >
                    Remember me
                  </Label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium  hover:text-violet-800 text-primary "
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className="flex justify-center p-3 ">
                <Button className="bg-violet-900/80 px-10 dark:text-white dark:bg-violet-900">
                  Sign In
                </Button>
              </div>
            </form>
            <p className="mt-2 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-medium text-primary hover:text-violet-900"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
