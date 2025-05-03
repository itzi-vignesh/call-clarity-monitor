
import { useState } from "react";
import { Calendar, Download } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { CallTable, type CallRecord } from "@/components/call-history/CallTable";

const HistoryPage = () => {
  // Mock call history data
  const [callHistory] = useState<CallRecord[]>([
    { 
      id: "call-123", 
      date: "May 3, 2025", 
      time: "14:30", 
      agent: "Jane Smith", 
      customer: "Robert Johnson",
      duration: "05:42", 
      status: "compliant", 
      score: 92
    },
    { 
      id: "call-122", 
      date: "May 3, 2025", 
      time: "11:15", 
      agent: "John Doe", 
      customer: "Sarah Williams",
      duration: "08:19", 
      status: "warning", 
      score: 78
    },
    { 
      id: "call-121", 
      date: "May 2, 2025", 
      time: "16:45", 
      agent: "Alice Johnson", 
      customer: "Michael Brown",
      duration: "12:05", 
      status: "violation", 
      score: 68
    },
    { 
      id: "call-120", 
      date: "May 2, 2025", 
      time: "09:22", 
      agent: "John Doe", 
      customer: "Emily Davis",
      duration: "03:57", 
      status: "compliant", 
      score: 95
    },
    { 
      id: "call-119", 
      date: "May 1, 2025", 
      time: "15:10", 
      agent: "Jane Smith", 
      customer: "Thomas Anderson",
      duration: "07:12", 
      status: "compliant", 
      score: 89
    },
    { 
      id: "call-118", 
      date: "May 1, 2025", 
      time: "10:30", 
      agent: "Alice Johnson", 
      customer: "Jessica Wilson",
      duration: "04:45", 
      status: "warning", 
      score: 75
    },
    { 
      id: "call-117", 
      date: "Apr 30, 2025", 
      time: "13:20", 
      agent: "John Doe", 
      customer: "Christopher Martin",
      duration: "09:33", 
      status: "violation", 
      score: 65
    },
    { 
      id: "call-116", 
      date: "Apr 30, 2025", 
      time: "09:05", 
      agent: "Jane Smith", 
      customer: "Amanda Taylor",
      duration: "06:18", 
      status: "compliant", 
      score: 91
    },
    { 
      id: "call-115", 
      date: "Apr 29, 2025", 
      time: "16:40", 
      agent: "Alice Johnson", 
      customer: "Daniel White",
      duration: "11:27", 
      status: "warning", 
      score: 79
    },
    { 
      id: "call-114", 
      date: "Apr 29, 2025", 
      time: "14:15", 
      agent: "John Doe", 
      customer: "Olivia Jackson",
      duration: "05:53", 
      status: "compliant", 
      score: 87
    },
  ]);

  return (
    <AppLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Call History</h2>
        <p className="text-muted-foreground">
          Review past calls and compliance analysis results
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-auto">
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="compliant">Compliant</SelectItem>
                <SelectItem value="warning">Needs Review</SelectItem>
                <SelectItem value="violation">Non-compliant</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-auto">
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="jane">Jane Smith</SelectItem>
                <SelectItem value="john">John Doe</SelectItem>
                <SelectItem value="alice">Alice Johnson</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-auto">
            <Button variant="outline" className="w-full md:w-auto">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
          </div>
        </div>
        <Button variant="outline" className="w-full md:w-auto">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <CallTable data={callHistory} />
    </AppLayout>
  );
};

export default HistoryPage;
