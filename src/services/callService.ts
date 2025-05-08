
import callData from '../data/call-data.json';

export interface CallRecord {
  id: string;
  date: string;
  time: string;
  agent: string;
  customer: string;
  duration: string;
  status: "compliant" | "warning" | "violation";
  score: number;
}

export interface TranscriptSegment {
  id: string;
  speaker: "agent" | "customer";
  text: string;
  time: string;
  flagged?: boolean;
  flagReason?: string;
}

export interface ComplianceItem {
  id: string;
  category: string;
  requirement: string;
  status: "compliant" | "warning" | "violation";
  details: string;
  timestamp?: string;
}

export interface CallAnalytics {
  agentTalkTime: number;
  customerTalkTime: number;
  agentTone: number;
  customerSentiment: number;
  silencePeriods: number;
  interruptionCount: number;
  keyPhrases: string[];
}

export interface DetailedCallData {
  id: string;
  date: string;
  time: string;
  agent: string;
  customer: string;
  duration: string;
  status: "compliant" | "warning" | "violation";
  score: number;
  transcript: TranscriptSegment[];
  complianceItems: ComplianceItem[];
  analytics: CallAnalytics;
}

export const getCallHistory = async (): Promise<CallRecord[]> => {
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(callData.callHistory.map(call => ({
        id: call.id,
        date: call.date,
        time: call.time,
        agent: call.agent,
        customer: call.customer,
        duration: call.duration,
        status: call.status as "compliant" | "warning" | "violation",
        score: call.score
      })));
    }, 500);
  });
};

export const getCallById = async (id: string): Promise<DetailedCallData | undefined> => {
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const call = callData.callHistory.find(call => call.id === id);
      resolve(call as DetailedCallData);
    }, 300);
  });
};
