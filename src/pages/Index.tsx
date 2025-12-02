import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface Contact {
  id: number;
  name: string;
  avatar: string;
  phone: string;
  online: boolean;
}

interface Status {
  id: number;
  name: string;
  avatar: string;
  time: string;
  viewed: boolean;
}

interface Call {
  id: number;
  name: string;
  avatar: string;
  type: 'incoming' | 'outgoing' | 'missed';
  time: string;
  duration?: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('chats');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  const chats: Chat[] = [
    { id: 1, name: 'Мария Иванова', avatar: '', lastMessage: 'Привет! Как дела?', time: '10:30', unread: 2, online: true },
    { id: 2, name: 'Рабочая группа', avatar: '', lastMessage: 'Встреча перенесена на 15:00', time: '09:15', unread: 0, online: false },
    { id: 3, name: 'Александр', avatar: '', lastMessage: 'Отправил файлы', time: 'Вчера', unread: 5, online: true },
    { id: 4, name: 'Анна Петрова', avatar: '', lastMessage: 'Спасибо за помощь!', time: 'Вчера', unread: 0, online: false },
    { id: 5, name: 'Команда проекта', avatar: '', lastMessage: 'Новая задача добавлена', time: '15.11', unread: 1, online: false },
  ];

  const contacts: Contact[] = [
    { id: 1, name: 'Мария Иванова', avatar: '', phone: '+7 999 123-45-67', online: true },
    { id: 2, name: 'Александр', avatar: '', phone: '+7 999 234-56-78', online: true },
    { id: 3, name: 'Анна Петрова', avatar: '', phone: '+7 999 345-67-89', online: false },
    { id: 4, name: 'Дмитрий Смирнов', avatar: '', phone: '+7 999 456-78-90', online: false },
    { id: 5, name: 'Екатерина', avatar: '', phone: '+7 999 567-89-01', online: true },
  ];

  const statuses: Status[] = [
    { id: 1, name: 'Мой статус', avatar: '', time: 'Добавить статус', viewed: false },
    { id: 2, name: 'Мария Иванова', avatar: '', time: '2 часа назад', viewed: false },
    { id: 3, name: 'Александр', avatar: '', time: '5 часов назад', viewed: true },
    { id: 4, name: 'Анна Петрова', avatar: '', time: 'Вчера', viewed: true },
  ];

  const calls: Call[] = [
    { id: 1, name: 'Мария Иванова', avatar: '', type: 'incoming', time: 'Сегодня, 10:30', duration: '5:23' },
    { id: 2, name: 'Александр', avatar: '', type: 'outgoing', time: 'Вчера, 18:45', duration: '12:10' },
    { id: 3, name: 'Анна Петрова', avatar: '', type: 'missed', time: 'Вчера, 14:20' },
    { id: 4, name: 'Дмитрий Смирнов', avatar: '', type: 'incoming', time: '15.11, 09:15', duration: '3:45' },
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="w-full max-w-md border-r flex flex-col">
        <div className="p-4 border-b bg-primary text-primary-foreground">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Whatscok</h1>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/90">
                <Icon name="Camera" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/90">
                <Icon name="Search" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/90">
                <Icon name="MoreVertical" size={20} />
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full bg-primary/20 border-none">
              <TabsTrigger value="chats" className="flex-1 data-[state=active]:bg-background data-[state=active]:text-primary">
                <Icon name="MessageCircle" size={16} className="mr-1" />
                Чаты
              </TabsTrigger>
              <TabsTrigger value="status" className="flex-1 data-[state=active]:bg-background data-[state=active]:text-primary">
                <Icon name="Radio" size={16} className="mr-1" />
                Статус
              </TabsTrigger>
              <TabsTrigger value="calls" className="flex-1 data-[state=active]:bg-background data-[state=active]:text-primary">
                <Icon name="Phone" size={16} className="mr-1" />
                Звонки
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="px-4 py-2 border-b">
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <TabsContent value="chats" className="m-0">
            {chats.map((chat) => (
              <Card
                key={chat.id}
                className={`p-4 rounded-none border-x-0 border-t-0 cursor-pointer transition-colors hover:bg-accent/5 ${
                  selectedChat === chat.id ? 'bg-accent/10' : ''
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={chat.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary">{getInitials(chat.name)}</AvatarFallback>
                    </Avatar>
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium truncate">{chat.name}</h3>
                      <span className="text-xs text-muted-foreground">{chat.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                      {chat.unread > 0 && (
                        <Badge className="ml-2 bg-primary text-primary-foreground">{chat.unread}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="status" className="m-0">
            {statuses.map((status, index) => (
              <Card
                key={status.id}
                className={`p-4 rounded-none border-x-0 ${index === 0 ? 'border-t-0 border-b-2' : 'border-t-0'} cursor-pointer transition-colors hover:bg-accent/5`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className={index === 0 ? 'ring-2 ring-primary' : status.viewed ? 'ring-2 ring-gray-300' : 'ring-2 ring-primary'}>
                      <AvatarImage src={status.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary">{getInitials(status.name)}</AvatarFallback>
                    </Avatar>
                    {index === 0 && (
                      <div className="absolute bottom-0 right-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                        <Icon name="Plus" size={12} className="text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{status.name}</h3>
                    <p className="text-sm text-muted-foreground">{status.time}</p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="calls" className="m-0">
            {calls.map((call) => (
              <Card
                key={call.id}
                className="p-4 rounded-none border-x-0 border-t-0 cursor-pointer transition-colors hover:bg-accent/5"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={call.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary">{getInitials(call.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium">{call.name}</h3>
                    <div className="flex items-center gap-1 text-sm">
                      <Icon 
                        name={call.type === 'incoming' ? 'PhoneIncoming' : call.type === 'outgoing' ? 'PhoneOutgoing' : 'PhoneMissed'} 
                        size={14} 
                        className={call.type === 'missed' ? 'text-destructive' : 'text-muted-foreground'}
                      />
                      <span className={call.type === 'missed' ? 'text-destructive' : 'text-muted-foreground'}>
                        {call.time}
                      </span>
                    </div>
                  </div>
                  {call.duration && (
                    <span className="text-sm text-muted-foreground">{call.duration}</span>
                  )}
                  <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                    <Icon name="Phone" size={20} />
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>
        </ScrollArea>

        <div className="p-2 border-t flex gap-2">
          <Button variant="ghost" size="icon" className="flex-1" onClick={() => setActiveTab('chats')}>
            <Icon name="MessageCircle" size={24} className={activeTab === 'chats' ? 'text-primary' : 'text-muted-foreground'} />
          </Button>
          <Button variant="ghost" size="icon" className="flex-1" onClick={() => setActiveTab('status')}>
            <Icon name="Radio" size={24} className={activeTab === 'status' ? 'text-primary' : 'text-muted-foreground'} />
          </Button>
          <Button variant="ghost" size="icon" className="flex-1" onClick={() => setActiveTab('calls')}>
            <Icon name="Phone" size={24} className={activeTab === 'calls' ? 'text-primary' : 'text-muted-foreground'} />
          </Button>
          <Button variant="ghost" size="icon" className="flex-1">
            <Icon name="User" size={24} className="text-muted-foreground" />
          </Button>
        </div>
      </div>

      <div className="hidden md:flex flex-1 items-center justify-center bg-muted/20">
        <div className="text-center">
          <div className="w-64 h-64 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="MessageCircle" size={100} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Whatscok для компьютера</h2>
          <p className="text-muted-foreground max-w-md">
            Выберите чат слева, чтобы начать общение
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;