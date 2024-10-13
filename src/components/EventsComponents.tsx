'use client';

import {
  CalendarIcon,
  InstagramIcon,
  MapPinIcon,
  YoutubeIcon,
} from 'lucide-react';
import { useState } from 'react';

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

interface Event {
  id: string;
  title: string;
  name: string;
  description: string;
  venue: string;
  date: string;
  applicationLink: string;
  mediaLinks: {
    youtube?: string;
    instagram?: string;
  };
}

const tempEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Talk',
    name: 'AI in Healthcare',
    description:
      'Join us for an insightful discussion on the latest AI applications in healthcare.',
    venue: 'Main Block, Auditorium',
    date: '2023-08-15T18:00:00',
    applicationLink: 'https://example.com/register/ai-healthcare',
    mediaLinks: {
      youtube: 'https://youtube.com/live/ai-healthcare',
      instagram: 'https://instagram.com/ai-healthcare-event',
    },
  },
  {
    id: '2',
    title: 'Workshop',
    name: 'Web Development Bootcamp',
    description:
      'Learn the basics of web development in this hands-on workshop.',
    venue: 'Mech Block, Classroom 205',
    date: '2023-08-20T10:00:00',
    applicationLink: 'https://example.com/register/web-dev-bootcamp',
    mediaLinks: {
      instagram: 'https://instagram.com/web-dev-bootcamp',
    },
  },
  {
    id: '3',
    title: 'Alumni Meetup',
    name: 'Networking Night',
    description:
      'Connect with fellow alumni and expand your professional network.',
    venue: 'Main Block, Classroom 301',
    date: '2023-08-25T19:30:00',
    applicationLink: 'https://example.com/register/alumni-networking',
    mediaLinks: {
      youtube: 'https://youtube.com/live/alumni-networking',
    },
  },
];

export default function EventsComponent() {
  const [events] = useState<Event[]>(tempEvents);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">Event Board</h1>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        {events.map((event) => (
          <Card key={event.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{event.name}</CardTitle>
                  <CardDescription>{event.title}</CardDescription>
                </div>
                <Badge variant="secondary">
                  {new Date(event.date).toLocaleDateString()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-4">{event.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <span>{new Date(event.date).toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  <span>{event.venue}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-4">
              <Button
                className="w-full"
                onClick={() => window.open(event.applicationLink, '_blank')}
              >
                Register
              </Button>
              <div className="flex space-x-2">
                {event.mediaLinks.youtube && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      window.open(event.mediaLinks.youtube, '_blank')
                    }
                  >
                    <YoutubeIcon className="h-4 w-4" />
                    <span className="sr-only">YouTube link</span>
                  </Button>
                )}
                {event.mediaLinks.instagram && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      window.open(event.mediaLinks.instagram, '_blank')
                    }
                  >
                    <InstagramIcon className="h-4 w-4" />
                    <span className="sr-only">Instagram link</span>
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
