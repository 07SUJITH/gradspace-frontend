import { motion } from 'framer-motion';
import {
  Download,
  Edit,
  Heart,
  MapPin,
  MessageCircle,
  Share2,
  Users,
} from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import sample_profile from '../assets/sujith.png';
import EditProfileModal from './EditProfileModel';

export default function UserProfileComponent() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    fullName: 'Sujith T S',
    headline: 'Frontend Developer | AI Enthusiast',
    location: 'India',
    about:
      'Passionate about creating innovative solutions using cutting-edge technologies. Experienced in full-stack development with a focus on AI and machine learning applications.',
    skills: ['React', 'Node.js', 'Python', 'JavaScript'],
    interests: ['competitive coding', 'UI/UX design', 'Machine learning'],
    connections: 500,
    posts: [
      {
        id: 1,
        content: 'Just finished a fascinating project on AI-driven analytics!',
        likes: 42,
        comments: 7,
        shares: 3,
      },
      {
        id: 2,
        content:
          'Excited to attend the upcoming tech conference in San Francisco!',
        likes: 38,
        comments: 5,
        shares: 2,
      },
    ],
  });

  interface Post {
    id: number;
    content: string;
    likes: number;
    comments: number;
    shares: number;
  }

  interface UserData {
    fullName: string;
    headline: string;
    location: string;
    about: string;
    skills: string[];
    interests: string[];
    connections: number;
    posts: Post[];
  }

  const handleEditProfile = (updatedData: Partial<UserData>) => {
    setUserData({ ...userData, ...updatedData });
    setIsEditModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8"
      >
        <img
          src="/placeholder.svg?height=200&width=800"
          alt="Cover"
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <Avatar className="absolute -bottom-6 left-4 w-24 h-24 border-4 border-white shadow-lg">
          <AvatarImage src={sample_profile} alt={userData.fullName} />
          <AvatarFallback>
            {userData.fullName
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-2"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{userData.fullName}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {userData.headline}
                </p>
                <p className="text-sm text-muted-foreground flex items-center mt-1">
                  <MapPin className="w-4 h-4 mr-1" /> {userData.location}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditModalOpen(true)}
              >
                <Edit className="w-4 h-4 mr-2" /> Edit Profile
              </Button>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-2">About</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {userData.about}
              </p>

              <h3 className="font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {userData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>

              <h3 className="font-semibold mb-2">Interests</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {userData.interests.map((interest, index) => (
                  <Badge key={index} variant="outline">
                    {interest}
                  </Badge>
                ))}
              </div>

              <h3 className="font-semibold mb-2">Posts</h3>
              {userData.posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4 p-4 bg-muted rounded-lg"
                >
                  <p className="text-sm mb-2">{post.content}</p>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" /> {post.likes}
                    </span>
                    <span className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" /> {post.comments}
                    </span>
                    <span className="flex items-center">
                      <Share2 className="w-4 h-4 mr-1" /> {post.shares}
                    </span>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:col-span-1"
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Connections
                </span>
                <span className="font-semibold">{userData.connections}</span>
              </div>
              <Button className="w-full" variant="outline">
                <Download className="w-4 h-4 mr-2" /> Download Resume
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditProfile}
        userData={userData}
      />
    </div>
  );
}
