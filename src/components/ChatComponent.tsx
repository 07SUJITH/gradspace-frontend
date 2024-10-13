'use client';

import { History, SearchIcon, Send, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
}

const tempUsers: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  { id: '2', name: 'Bob Smith', avatar: '/placeholder.svg?height=40&width=40' },
  {
    id: '3',
    name: 'Charlie Brown',
    avatar: '/placeholder.svg?height=40&width=40',
  },
];

const tempMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    receiverId: 'current',
    content: 'Hey, how are you?',
    timestamp: '2023-07-15T10:00:00',
  },
  {
    id: '2',
    senderId: 'current',
    receiverId: '1',
    content: "I'm good, thanks! How about you?",
    timestamp: '2023-07-15T10:05:00',
  },
  {
    id: '3',
    senderId: '1',
    receiverId: 'current',
    content: 'Doing well. Did you see the new project announcement?',
    timestamp: '2023-07-15T10:10:00',
  },
  {
    id: '4',
    senderId: 'current',
    receiverId: '1',
    content: "Not yet, I'll check it out now. Thanks for the heads up!",
    timestamp: '2023-07-15T10:15:00',
  },
];

export default function ChatComponent() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(tempMessages);
  const [activeView, setActiveView] = useState<
    'chat' | 'connections' | 'history'
  >('chat');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const filteredUsers = tempUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedUser) {
      const newMessage: Message = {
        id: String(messages.length + 1),
        senderId: 'current',
        receiverId: selectedUser.id,
        content: messageInput.trim(),
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, newMessage]);
      setMessageInput('');
    }
  };

  const toggleView = (view: 'chat' | 'connections' | 'history') => {
    setActiveView(activeView === view ? 'chat' : view);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">Chat</h1>
      <div className="flex flex-col h-[600px] border rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => toggleView('connections')}
            >
              <Users className="h-4 w-4" />
              <span className="sr-only">Find Connections</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => toggleView('history')}
            >
              <History className="h-4 w-4" />
              <span className="sr-only">Chat History</span>
            </Button>
          </div>
          {selectedUser && (
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                />
                <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{selectedUser.name}</span>
            </div>
          )}
        </div>
        <div className="flex-1 flex">
          {(!isMobile || activeView !== 'chat') &&
            (activeView === 'connections' || activeView === 'history') && (
              <div className={`${isMobile ? 'w-full' : 'w-1/3'} border-r`}>
                <div className="p-4">
                  <div className="relative">
                    <SearchIcon className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder={
                        activeView === 'connections'
                          ? 'Search connections...'
                          : 'Search messages...'
                      }
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <ScrollArea className="h-[calc(600px-144px)]">
                  {activeView === 'connections' &&
                    filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        className={`flex items-center space-x-4 p-4 hover:bg-gray-100 cursor-pointer ${
                          selectedUser?.id === user.id ? 'bg-gray-100' : ''
                        }`}
                        onClick={() => {
                          setSelectedUser(user);
                          setActiveView('chat');
                        }}
                      >
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                        </div>
                      </div>
                    ))}
                  {activeView === 'history' &&
                    messages
                      .filter(
                        (msg, index, self) =>
                          index ===
                          self.findIndex(
                            (t) =>
                              (t.senderId === msg.senderId &&
                                t.receiverId === msg.receiverId) ||
                              (t.senderId === msg.receiverId &&
                                t.receiverId === msg.senderId),
                          ),
                      )
                      .map((message) => {
                        const user = tempUsers.find(
                          (u) =>
                            u.id ===
                            (message.senderId === 'current'
                              ? message.receiverId
                              : message.senderId),
                        );
                        return (
                          <div
                            key={message.id}
                            className="flex items-center space-x-4 p-4 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              if (user) {
                                setSelectedUser(user);
                                setActiveView('chat');
                              }
                            }}
                          >
                            <Avatar>
                              <AvatarImage
                                src={user?.avatar}
                                alt={user?.name}
                              />
                              <AvatarFallback>
                                {user?.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user?.name}</p>
                              <p className="text-sm text-gray-500">
                                {message.content.substring(0, 30)}...
                              </p>
                            </div>
                          </div>
                        );
                      })}
                </ScrollArea>
              </div>
            )}
          {(!isMobile || activeView === 'chat') && (
            <div
              className={`flex-1 flex flex-col ${isMobile ? 'w-full' : 'w-2/3'}`}
            >
              {selectedUser ? (
                <>
                  <ScrollArea className="flex-1 p-4">
                    {messages
                      .filter(
                        (msg) =>
                          (msg.senderId === selectedUser.id &&
                            msg.receiverId === 'current') ||
                          (msg.senderId === 'current' &&
                            msg.receiverId === selectedUser.id),
                      )
                      .map((message) => (
                        <div
                          key={message.id}
                          className={`mb-4 ${
                            message.senderId === 'current'
                              ? 'text-right'
                              : 'text-left'
                          }`}
                        >
                          <div
                            className={`inline-block p-2 rounded-lg ${
                              message.senderId === 'current'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-800'
                            }`}
                          >
                            {message.content}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      ))}
                  </ScrollArea>
                  <div className="p-4 border-t">
                    <div className="flex space-x-2">
                      <Input
                        type="text"
                        placeholder="Type a message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send message</span>
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">
                    Select a connection to start chatting
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
