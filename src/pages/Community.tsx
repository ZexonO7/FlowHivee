import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Heart, Share2, Send } from "lucide-react";

const discussions = [
  {
    id: 1,
    author: "Sarah K.",
    initials: "SK",
    time: "5 min ago",
    message: "Just finished the Algebra quiz! Who else found question 7 tricky? 🤔",
    likes: 12,
    replies: 3,
  },
  {
    id: 2,
    author: "Mike R.",
    initials: "MR",
    time: "23 min ago",
    message: "The Water Cycle lesson was so interesting! I learned so much about evaporation and precipitation ✨",
    likes: 8,
    replies: 5,
  },
  {
    id: 3,
    author: "Emma T.",
    initials: "ET",
    time: "1 hour ago",
    message: "Can someone explain the Pythagorean theorem in simple terms? Need help with my homework 📐",
    likes: 15,
    replies: 7,
  },
  {
    id: 4,
    author: "David L.",
    initials: "DL",
    time: "2 hours ago",
    message: "Shoutout to Ms. Johnson for the amazing Python lesson! Now I can write my first program 💻",
    likes: 20,
    replies: 4,
  },
  {
    id: 5,
    author: "Lisa M.",
    initials: "LM",
    time: "3 hours ago",
    message: "Study group forming for the history quiz tomorrow! Reply if you want to join 📚",
    likes: 18,
    replies: 9,
  },
];

export default function Community() {
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
          />
          <div className="flex justify-end">
            <Button variant="warm">
              <Send className="w-4 h-4" />
              Post Message
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Discussions */}
      <div className="space-y-4">
        {discussions.map((discussion) => (
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
                    <button className="flex items-center gap-2 hover:text-destructive transition-colors">
                      <Heart className="w-4 h-4" />
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
