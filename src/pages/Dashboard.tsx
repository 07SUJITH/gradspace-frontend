import {
  Briefcase,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Send,
  Share2,
  ThumbsUp,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';

// Dummy data for posts
const dummyPosts = [
  {
    id: 1,
    user: { name: 'Alice Johnson', avatar: '/placeholder-avatar-1.jpg' },
    content: 'Just finished a great project! #coding #success',
    image: '/placeholder.svg?height=200&width=400',
    likes: 15,
    comments: [
      {
        id: 1,
        user: 'Bob Smith',
        content: 'Congratulations! What technologies did you use?',
      },
      {
        id: 2,
        user: 'Charlie Brown',
        content: "Awesome work! Can't wait to see it.",
      },
    ],
  },
  {
    id: 2,
    user: { name: 'David Lee', avatar: '/placeholder-avatar-2.jpg' },
    content:
      'Looking for recommendations on project management tools. Any suggestions?',
    likes: 8,
    comments: [
      {
        id: 3,
        user: 'Eva White',
        content: 'I highly recommend Trello for small to medium projects.',
      },
      {
        id: 4,
        user: 'Frank Green',
        content: 'JIRA is great for larger teams and complex projects.',
      },
    ],
  },
  {
    id: 3,
    user: { name: 'Grace Taylor', avatar: '/placeholder-avatar-3.jpg' },
    content:
      "Excited to announce that I'm starting a new position as Senior Developer at TechCorp!",
    image: '/placeholder.svg?height=200&width=400',
    likes: 32,
    comments: [
      {
        id: 5,
        user: 'Henry Davis',
        content: "Congratulations, Grace! They're lucky to have you.",
      },
      {
        id: 6,
        user: 'Ivy Chen',
        content: 'Well deserved! All the best in your new role.',
      },
    ],
  },
];

export default function Dashboard() {
  const [posts, setPosts] = useState(dummyPosts);
  const [newComment, setNewComment] = useState('');
  const [showAddButton, setShowAddButton] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [newPost, setNewPost] = useState({ content: '', image: null });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setShowAddButton(false);
      } else {
        setShowAddButton(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post,
      ),
    );
  };

  const handleAddComment = (postId: number) => {
    if (newComment.trim()) {
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: [
                  ...post.comments,
                  {
                    id: Date.now(),
                    user: 'Current User',
                    content: newComment.trim(),
                  },
                ],
              }
            : post,
        ),
      );
      setNewComment('');
    }
  };

  const handleAddPost = () => {
    if (newPost.content.trim()) {
      const post = {
        id: Date.now(),
        user: { name: 'Current User', avatar: '/placeholder-avatar.jpg' },
        content: newPost.content,
        image: newPost.image,
        likes: 0,
        comments: [],
      };
      setPosts([post, ...posts]);
      setNewPost({ content: '', image: null });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">Gradspace</h1>
          <Button size="icon" variant="ghost">
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Posts */}
        {posts.map((post) => (
          <Card key={post.id} className="mb-6">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={post.user.avatar} alt={post.user.name} />
                  <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-sm font-semibold">{post.user.name}</h2>
                  <p className="text-xs text-gray-500">Posted 2h ago</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{post.content}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post image"
                  className="mt-4 rounded-lg w-full"
                />
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(post.id)}
              >
                <ThumbsUp className="mr-2 h-4 w-4" />
                Like ({post.likes})
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedPost(post)}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Comment ({post.comments.length})
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Comments</DialogTitle>
                    <DialogDescription>
                      View and add comments to this post.
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="h-[300px] w-full pr-4">
                    {post.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="flex items-start space-x-2 mb-4"
                      >
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>{comment.user[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                          <p className="text-sm font-semibold">
                            {comment.user}
                          </p>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                  <div className="flex items-center space-x-2 mt-4">
                    <Input
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-grow"
                    />
                    <Button size="sm" onClick={() => handleAddComment(post.id)}>
                      Post
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="ghost" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </main>

      {/* Floating Add Post Button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className={`fixed right-4 bottom-20 z-20 rounded-full transition-opacity duration-300 ${
              showAddButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new post</DialogTitle>
            <DialogDescription>
              Share your thoughts or a job opportunity with your network.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="post-content">Content</Label>
              <Textarea
                id="post-content"
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
                placeholder="What do you want to share?"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="post-image">Image (optional)</Label>
              <Input
                id="post-image"
                type="file"
                onChange={(e) =>
                  setNewPost({
                    ...newPost,
                    image: e.target.files ? e.target.files[0] : null,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddPost}>Post</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Floating Navbar */}
      <nav className="bg-white shadow-lg fixed bottom-0 left-0 right-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Button variant="ghost" size="icon">
            <Briefcase className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <MessageCircle className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Heart className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Send className="h-6 w-6" />
          </Button>
        </div>
      </nav>
    </div>
  );
}
