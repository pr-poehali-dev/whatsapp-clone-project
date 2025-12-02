import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface ProfilePageProps {
  setShowProfile: (show: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
}

const ProfilePage = ({ setShowProfile, isDarkMode, setIsDarkMode }: ProfilePageProps) => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b bg-background flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => setShowProfile(false)}>
          <Icon name="ArrowLeft" size={20} />
        </Button>
        <h2 className="text-xl font-semibold">Профиль</h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6">
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <Avatar className="w-32 h-32">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/10 text-primary text-4xl">ИИ</AvatarFallback>
              </Avatar>
              <Button 
                size="icon" 
                className="absolute bottom-0 right-0 rounded-full bg-primary hover:bg-primary/90"
              >
                <Icon name="Camera" size={18} />
              </Button>
            </div>
            <h3 className="text-2xl font-bold mb-1">Иван Иванов</h3>
            <p className="text-muted-foreground">+7 999 999-99-99</p>
          </div>

          <div className="space-y-4">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Icon name="User" size={20} className="text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Имя</p>
                    <p className="font-medium">Иван Иванов</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Icon name="Pencil" size={18} className="text-muted-foreground" />
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Icon name="MessageSquare" size={20} className="text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">О себе</p>
                    <p className="font-medium">Доступен для общения</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Icon name="Pencil" size={18} className="text-muted-foreground" />
                </Button>
              </div>
            </Card>

            <div className="pt-4">
              <h4 className="font-semibold mb-3 px-4">Настройки</h4>
              
              <Card className="p-4 mb-2 cursor-pointer hover:bg-accent/5 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon name="Bell" size={20} className="text-primary" />
                    <span className="font-medium">Уведомления</span>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </div>
              </Card>

              <Card className="p-4 mb-2 cursor-pointer hover:bg-accent/5 transition-colors" onClick={() => setIsDarkMode(!isDarkMode)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon name={isDarkMode ? 'Sun' : 'Moon'} size={20} className="text-primary" />
                    <span className="font-medium">{isDarkMode ? 'Светлая тема' : 'Темная тема'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-10 h-6 rounded-full transition-colors ${isDarkMode ? 'bg-primary' : 'bg-gray-300'} relative`}>
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-5' : 'translate-x-1'}`} />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 mb-2 cursor-pointer hover:bg-accent/5 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon name="Lock" size={20} className="text-primary" />
                    <span className="font-medium">Конфиденциальность</span>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </div>
              </Card>

              <Card className="p-4 mb-2 cursor-pointer hover:bg-accent/5 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon name="Database" size={20} className="text-primary" />
                    <span className="font-medium">Хранилище данных</span>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </div>
              </Card>

              <Card className="p-4 mb-2 cursor-pointer hover:bg-accent/5 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon name="Palette" size={20} className="text-primary" />
                    <span className="font-medium">Оформление</span>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </div>
              </Card>

              <Card className="p-4 mb-2 cursor-pointer hover:bg-accent/5 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon name="HelpCircle" size={20} className="text-primary" />
                    <span className="font-medium">Помощь</span>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProfilePage;
