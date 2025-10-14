import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Heart, Share2, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { getAllMessages, postMessage, toggleLike, getCurrentUser, formatRelativeTime } from "@/lib/community-storage";
import { useToast } from "@/hooks/use-toast";

export default function Community() {
  const [messages, setMessages] = useState(getAllMessages());
  const [newMessage, setNewMessage] = useState("");
  const [currentUser] = useState(getCurrentUser());
  const { toast } = useToast();

  useEffect(() => {
    // Update relative times every minute
    const interval = setInterval(() => {
      setMessages(prev => prev.map(msg => ({
        ...msg,
        time: formatRelativeTime(msg.timestamp)
      })));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handlePost = () => {
    if (!newMessage.trim()) {
      toast({
        title: "Empty message",
        description: "Please write something before posting",
        variant: "destructive",
      });
      return;
    }

    postMessage(newMessage);
    setMessages(getAllMessages());
    setNewMessage("");
    
    toast({
      title: "Message posted! 📢",
      description: "Your message is now visible to everyone on the LAN",
    });
  };

  const handleLike = (messageId: string) => {
    toggleLike(messageId);
    setMessages(getAllMessages());
  };
  return (
    <div className="space-y-6 animate-slide-up pb-20 md:pb-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">💬 Community Corner</h1>
        <p className="text-muted-foreground">
          Connect with fellow learners and share ideas
        </p>
      </div>

      {/* Welcome Banner */}
      <Card className="bg-gradient-creative shadow-soft border-0">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/20 rounded-full">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 text-white">
              <h3 className="text-xl font-bold mb-1">
                Learn Together, Grow Together 🌟
              </h3>
              <p className="text-white/90">
                Ask questions, share insights, and support each other's learning journey
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* New Post */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Share Your Thoughts</CardTitle>
          <CardDescription>
            Ask a question or share something you learned
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="What's on your mind? Share with the community..."
            rows={4}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handlePost();
              }
            }}
          />
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Posting as {currentUser.name}
            </p>
            <Button variant="warm" onClick={handlePost}>
              <Send className="w-4 h-4" />
              Post Message
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Discussions */}
      <div className="space-y-4">
        {messages.map((discussion) => (
          <Card key={discussion.id} className="shadow-soft hover:shadow-medium transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {discussion.initials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{discussion.author}</span>
                      <span className="text-sm text-muted-foreground">
                        {discussion.time}
                      </span>
                    </div>
                    <p className="text-foreground">{discussion.message}</p>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <button 
                      onClick={() => handleLike(discussion.id)}
                      className={`flex items-center gap-2 transition-colors ${
                        discussion.likedBy.includes(currentUser.name) 
                          ? 'text-destructive' 
                          : 'hover:text-destructive'
                      }`}
                    >
                      <Heart 
                        className="w-4 h-4" 
                        fill={discussion.likedBy.includes(currentUser.name) ? 'currentColor' : 'none'}
                      />
                      <span>{discussion.likes}</span>
                    </button>

                    <button className="flex items-center gap-2 hover:text-primary transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>{discussion.replies} replies</span>
                    </button>

                    <button className="flex items-center gap-2 hover:text-secondary transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Discussions
        </Button>
      </div>
    </div>
  );
}
