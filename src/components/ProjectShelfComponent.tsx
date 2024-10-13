'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  metaFiles: string[];
  type: 'Personal' | 'College';
  year: number;
  contributors: string[];
  mentor?: string;
  relatedLinks: string[];
};

const dummyProjects: Project[] = [
  {
    id: 1,
    title: 'AI-Powered Chess Engine',
    description:
      'Developed a chess engine using machine learning algorithms to predict optimal moves.',
    tags: ['AI', 'Machine Learning', 'Game Development'],
    metaFiles: ['chess_engine.py', 'model_training.ipynb'],
    type: 'College',
    year: 2023,
    contributors: ['Alice Johnson', 'Bob Smith'],
    mentor: 'Dr. Emily Chen',
    relatedLinks: ['https://github.com/alice/chess-ai'],
  },
  {
    id: 2,
    title: 'Blockchain-based Voting System',
    description:
      'Created a secure and transparent voting system using blockchain technology.',
    tags: ['Blockchain', 'Cryptography', 'Web3'],
    metaFiles: ['smart_contract.sol', 'frontend.js'],
    type: 'College',
    year: 2022,
    contributors: ['Charlie Brown', 'Diana Prince'],
    mentor: 'Prof. Frank Castle',
    relatedLinks: ['https://devpost.com/blockchain-voting'],
  },
  {
    id: 3,
    title: 'Personal Portfolio Website',
    description:
      'Designed and developed a responsive portfolio website to showcase projects and skills.',
    tags: ['Web Development', 'React', 'Next.js'],
    metaFiles: ['index.tsx', 'projects.tsx', 'about.tsx'],
    type: 'Personal',
    year: 2023,
    contributors: ['Eva Green'],
    relatedLinks: ['https://evagreen.dev'],
  },
  {
    id: 4,
    title: 'Autonomous Drone Navigation System',
    description:
      'Implemented computer vision algorithms for autonomous drone navigation in complex environments.',
    tags: ['Computer Vision', 'Robotics', 'Python'],
    metaFiles: ['drone_control.py', 'object_detection.py'],
    type: 'College',
    year: 2021,
    contributors: ['George Jetson', 'Hanna Montana'],
    mentor: 'Dr. Irene Curie',
    relatedLinks: ['https://youtube.com/drone-demo'],
  },
  {
    id: 5,
    title: 'Natural Language Processing Chatbot',
    description:
      'Built a chatbot using NLP techniques to provide customer support for a local business.',
    tags: ['NLP', 'Machine Learning', 'Python'],
    metaFiles: ['chatbot.py', 'intent_classification.py'],
    type: 'Personal',
    year: 2022,
    contributors: ['Jack Sparrow'],
    relatedLinks: ['https://nlp-chatbot-demo.herokuapp.com'],
  },
];

export default function ProjectShelfComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return dummyProjects
      .filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .filter(
        (project) => selectedType === 'All' || project.type === selectedType,
      )
      .filter(
        (project) =>
          selectedYear === 'All' || project.year === parseInt(selectedYear),
      )
      .sort((a, b) => b.year - a.year);
  }, [searchTerm, selectedType, selectedYear]);

  const years = [...new Set(dummyProjects.map((project) => project.year))].sort(
    (a, b) => b - a,
  );

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">Project Shelf</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <Select onValueChange={setSelectedType}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Project Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Types</SelectItem>
            <SelectItem value="Personal">Personal</SelectItem>
            <SelectItem value="College">College</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setSelectedYear}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Years</SelectItem>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className="h-full flex flex-col cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-gray-600 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-500">Type: {project.type}</p>
                <p className="text-sm text-gray-500">Year: {project.year}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <Dialog
            open={!!selectedProject}
            onOpenChange={() => setSelectedProject(null)}
          >
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>{selectedProject.title}</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                <p className="mb-4">{selectedProject.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Tags:</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedProject.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Meta Files:</h3>
                    <ul className="list-disc list-inside">
                      {selectedProject.metaFiles.map((file, index) => (
                        <li key={index}>{file}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <h3 className="font-semibold mb-2">Project Details:</h3>
                    <p>Type: {selectedProject.type}</p>
                    <p>Year: {selectedProject.year}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Contributors:</h3>
                    <ul className="list-disc list-inside">
                      {selectedProject.contributors.map(
                        (contributor, index) => (
                          <li key={index}>{contributor}</li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
                {selectedProject.mentor && (
                  <p className="mt-4">
                    <span className="font-semibold">Mentor:</span>{' '}
                    {selectedProject.mentor}
                  </p>
                )}
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Related Links:</h3>
                  <ul className="list-disc list-inside">
                    {selectedProject.relatedLinks.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </DialogDescription>
              <DialogFooter>
                <Button onClick={() => setSelectedProject(null)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
