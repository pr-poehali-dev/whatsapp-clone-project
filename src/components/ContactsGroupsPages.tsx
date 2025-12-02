import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Contact {
  id: number;
  name: string;
  avatar: string;
  phone: string;
  online: boolean;
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

interface ContactsPageProps {
  contacts: Contact[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setShowContacts: (show: boolean) => void;
  getInitials: (name: string) => string;
}

interface GroupsPageProps {
  groups: Group[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setShowGroups: (show: boolean) => void;
  getInitials: (name: string) => string;
}

export const ContactsPage = ({
  contacts,
  searchQuery,
  setSearchQuery,
  setShowContacts,
  getInitials,
}: ContactsPageProps) => {
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b bg-background flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setShowContacts(false)}>
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <h2 className="text-xl font-semibold">Контакты</h2>
        </div>
        <Button size="icon" className="bg-primary hover:bg-primary/90">
          <Icon name="UserPlus" size={20} />
        </Button>
      </div>

      <div className="px-4 py-2 border-b">
        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск контактов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-2">ВСЕ КОНТАКТЫ ({contacts.length})</h3>
          {filteredContacts.map((contact) => (
            <Card
              key={contact.id}
              className="p-4 mb-2 rounded-lg cursor-pointer hover:bg-accent/5 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary">{getInitials(contact.name)}</AvatarFallback>
                    </Avatar>
                    {contact.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{contact.name}</h3>
                    <p className="text-sm text-muted-foreground">{contact.phone}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                    <Icon name="MessageCircle" size={20} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                    <Icon name="Phone" size={20} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          {filteredContacts.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Users" size={64} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Контакты не найдены</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export const GroupsPage = ({
  groups,
  searchQuery,
  setSearchQuery,
  setShowGroups,
  getInitials,
}: GroupsPageProps) => {
  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b bg-background flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setShowGroups(false)}>
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <h2 className="text-xl font-semibold">Группы</h2>
        </div>
        <Button size="icon" className="bg-primary hover:bg-primary/90">
          <Icon name="Plus" size={20} />
        </Button>
      </div>

      <div className="px-4 py-2 border-b">
        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск групп..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-2">МОИ ГРУППЫ ({groups.length})</h3>
          {filteredGroups.map((group) => (
            <Card
              key={group.id}
              className="p-4 mb-2 rounded-lg cursor-pointer hover:bg-accent/5 transition-colors"
            >
              <div className="flex items-start gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={group.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary">{getInitials(group.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium truncate">{group.name}</h3>
                    <span className="text-xs text-muted-foreground">{group.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{group.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Icon name="Users" size={12} />
                      <span>{group.members} участников</span>
                    </div>
                    {group.unread > 0 && (
                      <Badge className="bg-primary text-primary-foreground">{group.unread}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate mt-1">{group.lastMessage}</p>
                </div>
              </div>
            </Card>
          ))}
          {filteredGroups.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Users" size={64} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Группы не найдены</p>
              <Button className="mt-4 bg-primary hover:bg-primary/90">
                <Icon name="Plus" size={16} className="mr-2" />
                Создать группу
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
