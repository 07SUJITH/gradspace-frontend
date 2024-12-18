import { motion } from 'framer-motion';
import { Code, FlaskConical, Linkedin, Server } from 'lucide-react';

import Github from '../assets/github.svg';
const developers = [
  {
    name: 'Sujith T S',
    role: 'Frontend Developer',
    image:
      'https://media.licdn.com/dms/image/v2/D5603AQGdRdRIKBB2nA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728197895438?e=1733961600&v=beta&t=zWO4sU0yZG1c0HM_VR5Vher1_Du095MyZDQoAeT-Tjw',
    summary:
      'Passionate about creating intuitive and responsive user interfaces using React.js and TypeScript.',
    experience: '2+ years of experience in frontend development',
    linkedin: 'https://www.linkedin.com/in/07sujithts/',
    github: 'https://github.com/07SUJITH',
    icon: <Code className="w-6 h-6" />,
  },
  {
    name: 'Jelan Mathew James',
    role: 'Backend Developer',
    image:
      'https://media.licdn.com/dms/image/v2/D5603AQHwtD551rnJAw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725116271039?e=1733961600&v=beta&t=7qeEPjak0NZQHkt778hch3WjkhtdkmICtaF6omCX7MA',
    summary:
      'Skilled in building robust and scalable backend systems using Golang, Python, and various web frameworks.',
    experience: '3+ years of experience in backend development',
    linkedin: 'https://www.linkedin.com/in/jelan-mathew-james-571490220/',
    github: 'https://github.com/jelanmathewjames',
    icon: <Server className="w-6 h-6" />,
  },
  {
    name: 'Joel Siby Varghese',
    role: 'Quality Assurance Tester',
    image:
      'https://media.licdn.com/dms/image/v2/D4D03AQHkK-zuvvHsNQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1673359539434?e=1733961600&v=beta&t=ta0jWSTeJcBp7uIN20S-PuOVkQ9BfRAcnpT6NvbwufQ',
    summary:
      'Dedicated to ensuring product quality through comprehensive testing strategies ',
    experience: '1+ years of experience in software testing',
    linkedin: 'https://www.linkedin.com/in/joel-siby-varghese-7656a2261/',
    github: 'https://github.com/joelsibyvarghese',
    icon: <FlaskConical className="w-6 h-6" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

export default function DevInfo() {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b font-philosopher from-gray-50 to-gray-100 dark:from-black dark:to-zinc-800 py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Meet Our Development Team
        </motion.h1>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {developers.map((dev) => (
            <motion.div
              key={dev.name}
              className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
              variants={itemVariants}
            >
              <div className="p-6">
                <motion.div
                  className="flex items-center mb-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {dev.icon}
                  </motion.div>
                  <h2 className="ml-2 text-2xl font-semibold text-gray-900 dark:text-white">
                    {dev.name}
                  </h2>
                </motion.div>
                <p className="text-lg font-medium text-primary mb-2">
                  {dev.role}
                </p>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <img
                    src={dev.image}
                    alt={dev.name}
                    width={200}
                    height={200}
                    className="rounded-full mx-auto mb-4 border-4 border-primary"
                  />
                </motion.div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {dev.summary}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {dev.experience}
                </p>
                <div className="flex justify-center space-x-4">
                  <motion.div whileHover={{ y: -5 }}>
                    <a
                      href={dev.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                  </motion.div>
                  <motion.div whileHover={{ y: -5 }}>
                    <a
                      href={dev.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-200"
                    >
                      <img src={Github} className="w-6 h-6" />
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
