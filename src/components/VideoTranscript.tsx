import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Loader2, AlertCircle, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VideoTranscriptProps {
  videoUrl: string;
  videoElement?: HTMLVideoElement | null;
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

// Parse transcript into segments with timestamps
interface TranscriptSegment {
  timestamp: number;
  text: string;
}

const parseTranscript = (text: string): TranscriptSegment[] => {
  const segments: TranscriptSegment[] = [];
  const lines = text.split('\n');
  
  let currentSegment: TranscriptSegment | null = null;
  
  for (const line of lines) {
    const timestampMatch = line.match(/^\[(\d+):(\d+)\]/);
    
    if (timestampMatch) {
      if (currentSegment) {
        segments.push(currentSegment);
      }
      const minutes = parseInt(timestampMatch[1]);
      const seconds = parseInt(timestampMatch[2]);
      const timestamp = minutes * 60 + seconds;
      
      const text = line.replace(/^\[\d+:\d+\]\s*/, '');
      currentSegment = { timestamp, text };
    } else if (currentSegment && line.trim()) {
      currentSegment.text += ' ' + line.trim();
    }
  }
  
  if (currentSegment) {
    segments.push(currentSegment);
  }
  
  return segments;
};

export const VideoTranscript = ({ videoUrl, videoElement }: VideoTranscriptProps) => {
  const [transcript, setTranscript] = useState<string>('');
  const [segments, setSegments] = useState<TranscriptSegment[]>([]);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const activeSegmentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset and auto-load transcript when video URL changes
    setTranscript('');
    setSegments([]);
    setCurrentSegmentIndex(-1);
    setError('');
    if (videoUrl) {
      loadTranscript();
    }
  }, [videoUrl]);

  // Track video time and update highlighted segment
  useEffect(() => {
    if (!videoElement || segments.length === 0) return;

    const handleTimeUpdate = () => {
      const currentTime = videoElement.currentTime;
      
      // Find the current segment based on video time
      let newIndex = -1;
      for (let i = segments.length - 1; i >= 0; i--) {
        if (currentTime >= segments[i].timestamp) {
          newIndex = i;
          break;
        }
      }
      
      if (newIndex !== currentSegmentIndex) {
        setCurrentSegmentIndex(newIndex);
      }
    };

    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    return () => videoElement.removeEventListener('timeupdate', handleTimeUpdate);
  }, [videoElement, segments, currentSegmentIndex]);

  // Auto-scroll to active segment
  useEffect(() => {
    if (activeSegmentRef.current && scrollAreaRef.current) {
      activeSegmentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentSegmentIndex]);

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
      
      // Parse transcript into segments
      const parsedSegments = parseTranscript(text);
      setSegments(parsedSegments);
      
      toast({
        title: 'Transcript Loaded! ✓',
        description: 'Follow along as the video plays',
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
          <ScrollArea className="h-[400px] w-full rounded-lg border bg-muted/30 p-4" ref={scrollAreaRef}>
            <div className="space-y-3">
              {segments.map((segment, index) => {
                const minutes = Math.floor(segment.timestamp / 60);
                const seconds = segment.timestamp % 60;
                const isActive = index === currentSegmentIndex;
                
                return (
                  <div
                    key={index}
                    ref={isActive ? activeSegmentRef : null}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'bg-primary/20 border-l-4 border-primary shadow-sm scale-[1.02]' 
                        : 'bg-transparent hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`text-xs font-mono flex-shrink-0 mt-0.5 ${
                        isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
                      }`}>
                        {minutes}:{seconds.toString().padStart(2, '0')}
                      </span>
                      <p className={`text-sm leading-relaxed ${
                        isActive ? 'font-medium' : ''
                      }`}>
                        {segment.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
