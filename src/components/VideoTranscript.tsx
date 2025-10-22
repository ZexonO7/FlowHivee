import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Loader2, AlertCircle, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VideoTranscriptProps {
  videoUrl: string;
}

// Map video URLs to transcript files
const getTranscriptPath = (videoUrl: string): string | null => {
  if (videoUrl.includes('Introduction to Algebra')) {
    return '/video lessons/Introduction to Algebra.txt';
  } else if (videoUrl.includes('Variables and Constents')) {
    return '/video lessons/Variables and Constants.txt';
  }
  return null;
};

export const VideoTranscript = ({ videoUrl }: VideoTranscriptProps) => {
  const [transcript, setTranscript] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    // Reset and auto-load transcript when video URL changes
    setTranscript('');
    setError('');
    if (videoUrl) {
      loadTranscript();
    }
  }, [videoUrl]);

  const loadTranscript = async () => {
    if (!videoUrl) return;

    const transcriptPath = getTranscriptPath(videoUrl);
    
    if (!transcriptPath) {
      setError('No transcript available for this video');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(transcriptPath);
      
      if (!response.ok) {
        throw new Error('Transcript file not found');
      }

      const text = await response.text();
      setTranscript(text);
      
      toast({
        title: 'Transcript Loaded! ✓',
        description: 'Video transcript is ready',
      });
    } catch (err) {
      console.error('Error loading transcript:', err);
      setError('Failed to load transcript. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadTranscript = () => {
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'video-transcript.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Download started',
      description: 'Transcript is being downloaded',
    });
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-secondary/10 rounded-lg">
              <FileText className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <CardTitle>Video Transcript</CardTitle>
              <CardDescription>
                {transcript ? 'Ready to read' : 'Loading transcript...'}
              </CardDescription>
            </div>
          </div>
          {transcript && (
            <Button onClick={downloadTranscript} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="font-medium">Loading transcript...</p>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium text-destructive">Error Loading Transcript</p>
              <p className="text-sm text-destructive/80">{error}</p>
              <Button
                onClick={loadTranscript}
                variant="outline"
                size="sm"
                className="mt-2"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        {transcript && !isLoading && (
          <ScrollArea className="h-[400px] w-full rounded-lg border bg-muted/30 p-4">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{transcript}</p>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
