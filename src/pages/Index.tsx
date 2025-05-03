
import { useState } from "react";
import { Link } from "react-router-dom";
import { Upload, Record, ArrowUp, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/components/layout/AppLayout";

const Dashboard = () => {
  const [recentCalls] = useState([
    { 
      id: "call-123", 
      agent: "Jane Smith", 
      date: "2025-05-03 14:30", 
      score: 92, 
      risk: "Low", 
      status: "Compliant"
    },
    { 
      id: "call-122", 
      agent: "John Doe", 
      date: "2025-05-03 11:15", 
      score: 78, 
      risk: "Medium", 
      status: "Needs Review"
    },
    { 
      id: "call-121", 
      agent: "Alice Johnson", 
      date: "2025-05-02 16:45", 
      score: 68, 
      risk: "High", 
      status: "Non-compliant"
    }
  ]);

  const complianceStats = [
    { title: "Overall Compliance", value: "87%", change: "+3.2%" },
    { title: "Calls Analyzed", value: "142", change: "+12" },
    { title: "Avg. Risk Level", value: "Low", change: "Improved" },
  ];

  return (
    <AppLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
        <p className="text-muted-foreground">
          Monitor and improve call compliance in real-time.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {complianceStats.map((stat) => (
          <Card key={stat.title} className="call-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-success flex items-center mt-1">
                <ArrowUp className="h-3 w-3 mr-1" /> {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}

        <Card className="call-card bg-primary/10 border-primary/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Real-time Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              <span>Active</span>
              <span className="h-3 w-3 bg-success rounded-full ml-2 animate-pulse"></span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card className="col-span-1 lg:col-span-2 call-card">
          <CardHeader>
            <CardTitle>Recent Call Analysis</CardTitle>
            <CardDescription>
              Your latest call compliance reviews
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCalls.map((call) => (
                <Link 
                  key={call.id}
                  to={`/transcript?id=${call.id}`}
                  className="block"
                >
                  <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div>
                      <div className="font-medium">{call.agent}</div>
                      <div className="text-sm text-muted-foreground">{call.date}</div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-medium">Score: {call.score}%</div>
                        <div className={cn(
                          "text-sm", 
                          call.risk === "Low" ? "text-success" : 
                          call.risk === "Medium" ? "text-warning" : 
                          "text-destructive"
                        )}>
                          {call.status}
                        </div>
                      </div>
                      <CheckCircle 
                        className={cn(
                          "h-5 w-5", 
                          call.risk === "Low" ? "text-success" : 
                          call.risk === "Medium" ? "text-warning" : 
                          "text-destructive"
                        )} 
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="call-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Start a new compliance review
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="default" 
              size="lg" 
              className="w-full justify-start"
              asChild
            >
              <Link to="/upload">
                <Upload className="mr-2 h-5 w-5" />
                Upload Call Recording
              </Link>
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              className="w-full justify-start"
              asChild
            >
              <Link to="/record">
                <Record className="mr-2 h-5 w-5" />
                Record Live Call
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full justify-start"
              asChild
            >
              <Link to="/history">
                <History className="mr-2 h-5 w-5" />
                View Call History
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
