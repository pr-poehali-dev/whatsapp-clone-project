import { useState, useEffect } from 'react';
import ChatSidebar from '@/components/ChatSidebar';
import ChatWindow from '@/components/ChatWindow';
import ProfilePage from '@/components/ProfilePage';
import { ContactsPage, GroupsPage } from '@/components/ContactsGroupsPages';

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

interface Group {
  id: number;
  name: string;
  avatar: string;
  description: string;
  members: number;
  lastMessage: string;
  time: string;
  unread: number;
}

interface Message {
  id: number;
  text: string;
  time: string;
  isMine: boolean;
  status: 'sent' | 'delivered' | 'read';
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('chats');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [showGroups, setShowGroups] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Привет! Как дела?', time: '10:25', isMine: false, status: 'read' },
    { id: 2, text: 'Привет! Все отлично, спасибо!', time: '10:26', isMine: true, status: 'read' },
    { id: 3, text: 'Как прошла встреча?', time: '10:27', isMine: false, status: 'read' },
    { id: 4, text: 'Отлично! Все согласовали', time: '10:28', isMine: true, status: 'delivered' },
  ]);

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

  const groups: Group[] = [
    { id: 1, name: 'Рабочая группа', avatar: '', description: 'Обсуждение рабочих вопросов', members: 12, lastMessage: 'Встреча перенесена на 15:00', time: '09:15', unread: 0 },
    { id: 2, name: 'Команда проекта', avatar: '', description: 'Основной проект компании', members: 8, lastMessage: 'Новая задача добавлена', time: '15.11', unread: 3 },
    { id: 3, name: 'Семья', avatar: '', description: 'Семейный чат', members: 5, lastMessage: 'Когда соберемся?', time: 'Вчера', unread: 1 },
    { id: 4, name: 'Футбол по выходным', avatar: '', description: 'Организация игр', members: 15, lastMessage: 'В эту субботу играем!', time: '14.11', unread: 0 },
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const message: Message = {
        id: messages.length + 1,
        text: newMessage,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        isMine: true,
        status: 'sent'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const selectedChatData = chats.find(chat => chat.id === selectedChat);

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        chats={chats}
        statuses={statuses}
        calls={calls}
        getInitials={getInitials}
        setShowGroups={setShowGroups}
        setShowContacts={setShowContacts}
        setShowProfile={setShowProfile}
      />

      {showGroups ? (
        <GroupsPage
          groups={groups}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setShowGroups={setShowGroups}
          getInitials={getInitials}
        />
      ) : showContacts ? (
        <ContactsPage
          contacts={contacts}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setShowContacts={setShowContacts}
          getInitials={getInitials}
        />
      ) : showProfile ? (
        <ProfilePage
          setShowProfile={setShowProfile}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
      ) : (
        <ChatWindow
          selectedChatData={selectedChatData}
          messages={messages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
          setSelectedChat={setSelectedChat}
          getInitials={getInitials}
        />
      )}
    </div>
  );
};

export default Index;
