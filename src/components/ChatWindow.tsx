import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
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

interface Message {
  id: number;
  text: string;
  time: string;
  isMine: boolean;
  status: 'sent' | 'delivered' | 'read';
}

interface ChatWindowProps {
  selectedChatData: Chat | undefined;
  messages: Message[];
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
  setSelectedChat: (id: number | null) => void;
  getInitials: (name: string) => string;
}

const ChatWindow = ({
  selectedChatData,
  messages,
  newMessage,
  setNewMessage,
  handleSendMessage,
  setSelectedChat,
  getInitials,
}: ChatWindowProps) => {
  if (!selectedChatData) {
    return (
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
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b bg-background flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSelectedChat(null)}>
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <div className="relative">
            <Avatar>
              <AvatarImage src={selectedChatData.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary">{getInitials(selectedChatData.name)}</AvatarFallback>
            </Avatar>
            {selectedChatData.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
            )}
          </div>
          <div>
            <h3 className="font-medium">{selectedChatData.name}</h3>
            <p className="text-xs text-muted-foreground">{selectedChatData.online ? 'онлайн' : 'был(а) недавно'}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Icon name="Phone" size={20} className="text-primary" />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="Video" size={20} className="text-primary" />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="MoreVertical" size={20} />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4 bg-muted/5">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] rounded-lg px-4 py-2 ${
                message.isMine 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-background border'
              }`}>
                <p className="text-sm">{message.text}</p>
                <div className="flex items-center gap-1 justify-end mt-1">
                  <span className={`text-xs ${
                    message.isMine ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {message.time}
                  </span>
                  {message.isMine && (
                    <Icon 
                      name={message.status === 'read' ? 'CheckCheck' : 'Check'} 
                      size={14} 
                      className={message.status === 'read' ? 'text-blue-200' : 'text-primary-foreground/70'}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-background">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Icon name="Smile" size={20} className="text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="Paperclip" size={20} className="text-muted-foreground" />
          </Button>
          <Input
            placeholder="Введите сообщение..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button 
            size="icon" 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-primary hover:bg-primary/90"
          >
            <Icon name="Send" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
