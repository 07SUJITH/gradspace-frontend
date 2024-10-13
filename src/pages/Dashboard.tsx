import {
  Briefcase,
  Calendar,
  Heart,
  Home,
  Layers,
  LogOut,
  MessageCircle,
  Moon,
  Plus,
  Search,
  Send,
  Settings,
  ShoppingBag,
  Sun,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import C2CMarketComponent from '@/components/C2CMarketComponent';
import ChatComponent from '@/components/ChatComponent';
import EventsComponent from '@/components/EventsComponents';
import JobPortalComponent from '@/components/JobPortalComponent';
import ProjectShelfComponent from '@/components/ProjectShelfComponent';
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import UserProfileComponent from '@/components/UserProfileComponent';

import sample_profile from '../assets/sujith.png';

interface Post {
  id: number;
  username: string;
  userAvatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: string[];
}

function PostComponent({ post }: { post: Post }) {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleComment = (newComment: string) => {
    setComments([...comments, newComment]);
  };

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center">
        <Avatar className="w-10 h-10">
          <AvatarImage src={post.userAvatar} />
          <AvatarFallback>{post.username[0]}</AvatarFallback>
        </Avatar>
        <div className="ml-2">
          <p className="font-semibold">{post.username}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p>{post.content}</p>
        {post.image && (
          <img src={post.image} alt="Post" className="mt-2 rounded-md" />
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={handleLike}>
          <Heart className="mr-2 h-4 w-4" /> {likes}
        </Button>
        <Button variant="ghost" onClick={() => setShowComments(!showComments)}>
          <MessageCircle className="mr-2 h-4 w-4" /> {comments.length}
        </Button>
        <Button variant="ghost">
          <Send className="mr-2 h-4 w-4" />
        </Button>
      </CardFooter>
      {showComments && (
        <CommentPopup comments={comments} onAddComment={handleComment} />
      )}
    </Card>
  );
}

function CommentPopup({
  comments,
  onAddComment,
}: {
  comments: string[];
  onAddComment: (comment: string) => void;
}) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <Card className="mt-2">
      <CardContent>
        {comments.map((comment, index) => (
          <p key={index} className="mb-2">
            {comment}
          </p>
        ))}
        <form onSubmit={handleSubmit} className="flex mt-4">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-grow mr-2"
          />
          <Button type="submit">Post</Button>
        </form>
      </CardContent>
    </Card>
  );
}

function CreatePostDialog({
  onPostCreated,
}: {
  onPostCreated: (post: Post) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handlePost = () => {
    const newPost = {
      id: Date.now(),
      username: 'currentUser',
      userAvatar: '/placeholder.svg?height=40&width=40',
      content: content,
      image: image ? URL.createObjectURL(image) : undefined,
      likes: 0,
      comments: [],
    };
    onPostCreated(newPost);
    setContent('');
    setHashtags('');
    setImage(null);
    setIsOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Plus className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new post</DialogTitle>
        </DialogHeader>
        <Textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mb-4"
        />
        <Input
          placeholder="Add hashtags (comma separated)"
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
          className="mb-4"
        />
        <div className="mb-4">
          <Label htmlFor="image-upload" className="block mb-2">
            Upload Image
          </Label>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        {image && (
          <div className="mb-4">
            <p>Selected image: {image.name}</p>
          </div>
        )}
        <Button onClick={handlePost}>Post</Button>
      </DialogContent>
    </Dialog>
  );
}

function HomeComponent({
  posts,
}: {
  posts: Post[];
  onPostCreated: (post: Post) => void;
}) {
  // just use onPostCreated for avoid error in build

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Welcome to GradSpace</h1>
      {posts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </div>
  );
}

// function UserProfileComponent() {
//   return (
//     <div className="space-y-4">
//       <h1 className="text-2xl font-bold">User Profile</h1>
//       <Card>
//         <CardHeader>
//           <CardTitle>John Doe</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p>Software Engineer | AI Enthusiast</p>
//           <p>New York, NY</p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

export default function Dashboard() {
  const [activeComponent, setActiveComponent] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: 'johndoe',
      userAvatar: '/placeholder.svg?height=40&width=40',
      content: 'Just finished my final project! #graduation #computerscience',
      image: '/placeholder.svg?height=300&width=400',
      likes: 15,
      comments: ['Great job!', 'Congratulations!'],
    },
    {
      id: 2,
      username: 'janedoe',
      userAvatar: '/placeholder.svg?height=40&width=40',
      content:
        'Looking for internship opportunities in AI. Any leads? #ai #internship',
      likes: 8,
      comments: ['Check out XYZ Corp, they have great AI internships!'],
    },
  ]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handlePostCreated = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Home':
        return (
          <HomeComponent posts={posts} onPostCreated={handlePostCreated} />
        );
      case 'Job Portal':
        return <JobPortalComponent />;
      case 'Events':
        return <EventsComponent />;
      case 'Chat':
        return <ChatComponent />;
      case 'C2C Market':
        return <C2CMarketComponent />;
      case 'Project Shelf':
        return <ProjectShelfComponent />;
      case 'Profile':
        return <UserProfileComponent />;
      default:
        return (
          <HomeComponent posts={posts} onPostCreated={handlePostCreated} />
        );
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 flex justify-center">
        <Avatar className="w-20 h-20">
          <AvatarImage src={sample_profile} alt="User" />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
      </div>
      <nav className="flex-1">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => setActiveComponent('Profile')}
        >
          <User className="mr-2 h-4 w-4" />
          Profile
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => setActiveComponent('Home')}
        >
          <Home className="mr-2 h-4 w-4" />
          Home
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => setActiveComponent('Job Portal')}
        >
          <Briefcase className="mr-2 h-4 w-4" />
          Job Portal
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => setActiveComponent('Events')}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Events
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => setActiveComponent('Chat')}
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Chat
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => setActiveComponent('C2C Market')}
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          C2C Market
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => setActiveComponent('Project Shelf')}
        >
          <Layers className="mr-2 h-4 w-4" />
          Project Shelf
        </Button>
      </nav>
      <div className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => console.log('Settings clicked')}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => console.log('Logout clicked')}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? (
            <Sun className="mr-2 h-4 w-4" />
          ) : (
            <Moon className="mr-2 h-4 w-4" />
          )}
          Toggle Theme
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-card border-r border-border fixed h-full">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      <div className="flex-1 flex flex-col md:ml-64">
        {/* Top Fixed Section */}
        <header className="bg-background border-b border-border p-4 flex items-center justify-between sticky top-0 z-10">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <User className="h-6 w-6" />
          </Button>

          {/* Website Name - GradSpace */}
          <h1 className="text-xl font-bold font-philosopher text-violet-900 mx-4 whitespace-nowrap hidden sm:block">
            GradSpace
          </h1>

          {/* Search Input */}
          <div className="flex-grow mx-4 max-w-md relative">
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-10 pr-4"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>

          {/* Create Post Button */}
          <CreatePostDialog onPostCreated={handlePostCreated} />
        </header>

        {/* Main Content Section */}
        <main className="flex-1 overflow-auto p-4 md:max-w-3xl md:mx-auto w-full">
          {renderComponent()}
        </main>

        {/* Bottom Navigation Bar (Mobile Only) */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border">
          <div className="flex justify-around p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveComponent('Home')}
            >
              <Home className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveComponent('Job Portal')}
            >
              <Briefcase className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveComponent('Events')}
            >
              <Calendar className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveComponent('Chat')}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
}
