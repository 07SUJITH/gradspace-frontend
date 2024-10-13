'use client';

import {
  BriefcaseIcon,
  CalendarIcon,
  ClockIcon,
  DollarSignIcon,
  SearchIcon,
  UsersIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Job {
  id: string;
  userId: string;
  title: string;
  description: string;
  skills: string[];
  salary: string;
  constraints: string;
  type: string;
  applicationLink: string;
  numberOfOpenings: number;
  deadline: string;
  createdAt: string;
}

const tempJobs: Job[] = [
  {
    id: '1',
    userId: 'user123',
    title: 'Backend Developer',
    description:
      'We are looking for a skilled Backend Developer to join our team in Bengaluru. Experience with Node.js, MongoDB, and REST APIs is a must.',
    skills: ['Node.js', 'Express', 'MongoDB', 'AWS'],
    salary: '₹8,00,000 - ₹12,00,000 / year',
    constraints: 'Hybrid, Bengaluru',
    type: 'Full-time',
    applicationLink: 'https://example.com/apply/backend-dev',
    numberOfOpenings: 2,
    deadline: '2024-10-30',
    createdAt: '2024-10-10',
  },
  {
    id: '2',
    userId: 'user456',
    title: 'Full Stack Developer',
    description:
      'Join our team to build modern web applications using React and Node.js. Knowledge of cloud services is a plus.',
    skills: ['React', 'Node.js', 'AWS', 'TypeScript'],
    salary: '₹10,00,000 - ₹15,00,000 / year',
    constraints: 'Remote',
    type: 'Full-time',
    applicationLink: 'https://example.com/apply/full-stack-dev',
    numberOfOpenings: 1,
    deadline: '2024-11-05',
    createdAt: '2024-09-25',
  },
  {
    id: '3',
    userId: 'user789',
    title: 'ML Developer Intern',
    description:
      'Exciting internship opportunity to develop ML models and gain hands-on experience with real-world datasets.',
    skills: ['Python', 'TensorFlow', 'SQL', 'Machine Learning'],
    salary: '₹20,000 / month',
    constraints: 'Hybrid, Pune',
    type: 'Internship',
    applicationLink: 'https://example.com/apply/ml-intern',
    numberOfOpenings: 3,
    deadline: '2024-11-10',
    createdAt: '2024-09-20',
  },
];

export default function JobPortalComponent() {
  const [jobs] = useState<Job[]>(tempJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);

  useEffect(() => {
    const filtered = jobs.filter((job) =>
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
    setFilteredJobs(filtered);
  }, [searchTerm, jobs]);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">Job Portal</h1>
      <div className="flex items-center space-x-2 mb-4">
        <SearchIcon className="w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search jobs by skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
              <CardDescription>{job.type}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-4">{job.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <DollarSignIcon className="w-4 h-4 mr-2" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center">
                  <BriefcaseIcon className="w-4 h-4 mr-2" />
                  <span>{job.constraints}</span>
                </div>
                <div className="flex items-center">
                  <UsersIcon className="w-4 h-4 mr-2" />
                  <span>
                    {job.numberOfOpenings} opening
                    {job.numberOfOpenings > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <span>
                    Deadline: {new Date(job.deadline).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  <span>
                    Posted: {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => window.open(job.applicationLink, '_blank')}
              >
                Apply Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {filteredJobs.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No jobs found matching your search criteria.
        </p>
      )}
    </div>
  );
}
