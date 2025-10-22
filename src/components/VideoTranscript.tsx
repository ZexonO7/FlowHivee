import { useState, useEffect, useRef } from 'react';
import { pipeline } from '@huggingface/transformers';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Loader2, AlertCircle, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VideoTranscriptProps {
  videoUrl: string;
}

export const VideoTranscript = ({ videoUrl }: VideoTranscriptProps) => {
  const [transcript, setTranscript] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [progress, setProgress] = useState<string>('');
  const { toast } = useToast();
  const hasTranscribed = useRef(false);

  useEffect(() => {
    // Reset when video URL changes
    hasTranscribed.current = false;
    setTranscript('');
    setError('');
  }, [videoUrl]);

  const extractAudioFromVideo = async (videoUrl: string): Promise<Float32Array> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.crossOrigin = 'anonymous';
      video.src = videoUrl;

      video.addEventListener('loadedmetadata', async () => {
        try {
          const audioContext = new AudioContext({ sampleRate: 16000 });
          const source = audioContext.createMediaElementSource(video);
          const destination = audioContext.createMediaStreamDestination();
          source.connect(destination);

          const mediaRecorder = new MediaRecorder(destination.stream);
          const chunks: Blob[] = [];

          mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
              chunks.push(e.data);
            }
          };

          mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(chunks, { type: 'audio/webm' });
            const arrayBuffer = await audioBlob.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            const float32Array = audioBuffer.getChannelData(0);
            resolve(float32Array);
          };

          video.play();
          mediaRecorder.start();

          video.onended = () => {
            mediaRecorder.stop();
            audioContext.close();
          };
        } catch (err) {
          reject(err);
        }
      });

      video.onerror = () => {
        reject(new Error('Failed to load video'));
      };
    });
  };

  const transcribeVideo = async () => {
    if (hasTranscribed.current || !videoUrl) return;
    
    setIsLoading(true);
    setError('');
    setTranscript('');
    hasTranscribed.current = true;

    try {
      setProgress('Loading transcription model...');
      
      // Load Whisper model
      const transcriber = await pipeline(
        'automatic-speech-recognition',
        'onnx-community/whisper-tiny.en',
        {
          device: 'webgpu',
          dtype: 'fp32',
        }
      );

      setProgress('Extracting audio from video...');
      
      // Extract audio from video
      const audioData = await extractAudioFromVideo(videoUrl);

      setProgress('Transcribing audio... This may take a few minutes.');

      // Transcribe
      const result = await transcriber(audioData, {
        chunk_length_s: 30,
        stride_length_s: 5,
        return_timestamps: false,
      });

      const transcriptText = Array.isArray(result) ? result[0]?.text : result.text;
      setTranscript(transcriptText || '');
      setProgress('');
      
      toast({
        title: 'Transcription Complete!',
        description: 'Video transcript is ready',
      });
    } catch (err) {
      console.error('Transcription error:', err);
      setError(`Failed to transcribe video: ${err instanceof Error ? err.message : 'Unknown error'}`);
      hasTranscribed.current = false;
      setProgress('');
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
                {transcript ? 'Transcription complete' : 'Generate text from video audio'}
              </CardDescription>
            </div>
          </div>
          {!isLoading && !transcript && (
            <Button onClick={transcribeVideo} variant="warm">
              Generate Transcript
            </Button>
          )}
          {transcript && (
            <Button onClick={downloadTranscript} variant="outline" size="sm">
              <Download className="w-4 h-4" />
              Download
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <div className="text-center space-y-2">
              <p className="font-medium">{progress}</p>
              <p className="text-sm text-muted-foreground">
                This process may take a few minutes depending on video length
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium text-destructive">Transcription Error</p>
              <p className="text-sm text-destructive/80">{error}</p>
              <Button
                onClick={() => {
                  hasTranscribed.current = false;
                  transcribeVideo();
                }}
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
          <ScrollArea className="h-[300px] w-full rounded-lg border bg-muted/30 p-4">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{transcript}</p>
          </ScrollArea>
        )}

        {!isLoading && !transcript && !error && (
          <div className="text-center py-12 space-y-3">
            <div className="p-4 bg-muted/50 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              Click "Generate Transcript" to create a text version of the video audio
            </p>
            <p className="text-xs text-muted-foreground">
              Note: Transcription runs in your browser and may take a few minutes
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
