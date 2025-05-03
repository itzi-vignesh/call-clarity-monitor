
import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import ComplianceChecklist, { ComplianceItem } from "@/components/compliance/ComplianceChecklist";
import ComplianceScore from "@/components/compliance/ComplianceScore";
import { cn } from "@/lib/utils";

interface TranscriptSegment {
  id: string;
  speaker: "agent" | "customer";
  text: string;
  time: string;
  flagged?: boolean;
  flagReason?: string;
}

const TranscriptPage = () => {
  const [activeTab, setActiveTab] = useState("transcript");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [highlightedSegment, setHighlightedSegment] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  
  // Mock transcript data
  const [transcript] = useState<TranscriptSegment[]>([
    { id: "1", speaker: "agent", text: "Thank you for calling customer support. My name is John. How can I help you today?", time: "00:00" },
    { id: "2", speaker: "customer", text: "Hi, I'm having trouble with my account. I can't access my dashboard.", time: "00:05" },
    { id: "3", speaker: "agent", text: "I'm sorry to hear that. I'd be happy to help you with that. Could you please confirm your email address for verification?", time: "00:10" },
    { id: "4", speaker: "customer", text: "Sure, it's customer@example.com", time: "00:15" },
    { id: "5", speaker: "agent", text: "Thank you. Can you also provide your full name as it appears on the account?", time: "00:18" },
    { id: "6", speaker: "customer", text: "It's Jane Smith", time: "00:22" },
    { id: "7", speaker: "agent", text: "Thanks Jane. Let me take a look at your account. I can see that your account is currently locked due to multiple failed login attempts. Would you like me to reset it for you?", time: "00:25" },
    { id: "8", speaker: "customer", text: "Yes please, that would be great.", time: "00:40" },
    { id: "9", speaker: "agent", text: "I'll go ahead and reset that for you now. While I do that, could I get your phone number in case we need to contact you about this issue in the future?", time: "00:43", flagged: true, flagReason: "Unnecessary collection of personal data" },
    { id: "10", speaker: "customer", text: "It's 555-123-4567", time: "00:50" },
    { id: "11", speaker: "agent", text: "Great, I've reset your account. You should receive a temporary password via email within the next few minutes. Is there anything else I can assist you with today?", time: "00:55" },
    { id: "12", speaker: "customer", text: "No, that's all. Thank you for your help.", time: "01:05" },
    { id: "13", speaker: "agent", text: "You're welcome. Thank you for contacting customer support. Have a great day!", time: "01:08" }
  ]);

  // Mock compliance data
  const [complianceItems] = useState<ComplianceItem[]>([
    { 
      id: "1", 
      category: "Personal Data Handling", 
      requirement: "Only collect necessary information", 
      status: "violation", 
      details: "Agent collected phone number without business necessity",
      timestamp: "00:43"
    },
    { 
      id: "2", 
      category: "Personal Data Handling", 
      requirement: "Verify customer identity", 
      status: "compliant", 
      details: "Agent properly verified email and name",
      timestamp: "00:18"
    },
    { 
      id: "3", 
      category: "Customer Communication", 
      requirement: "Clear communication", 
      status: "compliant", 
      details: "Agent communicated clearly throughout the call",
    },
    { 
      id: "4", 
      category: "Customer Communication", 
      requirement: "Proper greeting", 
      status: "compliant", 
      details: "Agent introduced themselves and offered help",
      timestamp: "00:00"
    },
    { 
      id: "5", 
      category: "Call Handling", 
      requirement: "Proper closing", 
      status: "compliant", 
      details: "Agent thanked customer and offered additional help",
      timestamp: "01:08"
    },
    { 
      id: "6", 
      category: "Problem Resolution", 
      requirement: "Issue resolved", 
      status: "compliant", 
      details: "Agent successfully resolved customer's access issue"
    },
    { 
      id: "7", 
      category: "Personal Data Handling", 
      requirement: "Data security practices", 
      status: "warning", 
      details: "Agent sent temporary password via email, which is not the most secure method",
      timestamp: "00:55"
    }
  ]);

  const [complianceScore] = useState(82);

  useEffect(() => {
    if (highlightedSegment && transcriptRef.current) {
      const element = document.getElementById(`segment-${highlightedSegment}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [highlightedSegment]);

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const timeToSeconds = (timeStr: string) => {
    const [minutes, seconds] = timeStr.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  return (
    <AppLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Call Analysis</h2>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Customer support call - May 3, 2025 02:15 PM | Agent: John Doe
          </p>
          <div className="flex items-center">
            <audio 
              ref={audioRef} 
              src="/demo-audio.mp3" 
              onTimeUpdate={(e) => setCurrentTime(Math.floor(e.currentTarget.currentTime))}
              className="hidden" 
            />
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full"
              onClick={togglePlayback}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <span className="text-sm font-mono">
              {Math.floor(currentTime / 60).toString().padStart(2, '0')}:
              {(currentTime % 60).toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
              <TabsTrigger value="metrics">Detailed Metrics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="transcript">
              <div 
                ref={transcriptRef} 
                className="rounded-lg border bg-card p-4 h-[calc(100vh-250px)] overflow-y-auto"
              >
                {transcript.map((segment) => (
                  <div 
                    key={segment.id} 
                    id={`segment-${segment.id}`}
                    className={cn(
                      "mb-4 p-3 rounded-lg transition-colors",
                      segment.speaker === "agent" ? "bg-muted" : "bg-accent/10",
                      segment.flagged ? "border border-destructive/30" : "",
                      highlightedSegment === segment.id ? "ring-2 ring-ring" : ""
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={cn(
                        "text-xs font-medium",
                        segment.speaker === "agent" ? "text-primary" : "text-secondary"
                      )}>
                        {segment.speaker.charAt(0).toUpperCase() + segment.speaker.slice(1)}
                      </span>
                      <span className="text-xs text-muted-foreground">{segment.time}</span>
                    </div>
                    <p className="text-sm">{segment.text}</p>
                    {segment.flagged && (
                      <div className="mt-2 text-xs p-1.5 bg-destructive/10 text-destructive rounded border border-destructive/20">
                        <span className="font-medium">Compliance Issue:</span> {segment.flagReason}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="metrics">
              <div className="rounded-lg border bg-card p-4 h-[calc(100vh-250px)] overflow-y-auto">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Call Statistics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="text-xl font-medium">01:13</p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">Agent Talk Time</p>
                        <p className="text-xl font-medium">60%</p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">Customer Talk Time</p>
                        <p className="text-xl font-medium">40%</p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">Issue Resolved</p>
                        <p className="text-xl font-medium text-success">Yes</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-2">Language Analysis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">Agent Tone</p>
                        <p className="text-xl font-medium">Professional</p>
                        <div className="mt-2 h-2 bg-muted-foreground/20 rounded-full">
                          <div className="h-full bg-success rounded-full" style={{ width: '90%' }}></div>
                        </div>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">Customer Sentiment</p>
                        <p className="text-xl font-medium">Positive</p>
                        <div className="mt-2 h-2 bg-muted-foreground/20 rounded-full">
                          <div className="h-full bg-success rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-2">Script Adherence</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                        <span className="text-sm">Proper Greeting</span>
                        <span className="text-success text-sm">✓ Compliant</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                        <span className="text-sm">Identity Verification</span>
                        <span className="text-success text-sm">✓ Compliant</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                        <span className="text-sm">Problem Resolution</span>
                        <span className="text-success text-sm">✓ Compliant</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                        <span className="text-sm">Data Collection Practices</span>
                        <span className="text-destructive text-sm">✗ Non-compliant</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                        <span className="text-sm">Proper Closing</span>
                        <span className="text-success text-sm">✓ Compliant</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <ComplianceScore score={complianceScore} />
          
          <ComplianceChecklist 
            items={complianceItems}
            className="h-[calc(100vh-370px)] overflow-y-auto"
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default TranscriptPage;
