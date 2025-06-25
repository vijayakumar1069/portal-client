
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate, getInitials, getPriorityInfo, getStatusInfo } from "@/lib/ticketUtils";
import { Conversation, TicketDetails } from "@/types";
import { ArrowLeft, Mail, MessageSquare, Phone, User } from "lucide-react";
import Link from "next/link";
import GetUserContactDetails from "./GetUserContactDetails";

const TicketDetail: React.FC<{ 
  ticket: TicketDetails;
  conversations: Conversation[]; 
  
}> = ({ 
  ticket, 
  conversations
 
}) => {
    
 

  const statusInfo = getStatusInfo(ticket?.status);
  const priorityInfo = getPriorityInfo(ticket?.priority);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button  variant="ghost" size="icon" asChild>
            <Link href={`/tickets`}>
            
          <ArrowLeft className="w-4 h-4" />
            </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">#{ticket.id}</Badge>
            <Badge className={priorityInfo.color}>
              {priorityInfo.label}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <StatusIcon className="w-3 h-3" />
              {statusInfo.label}
            </Badge>
          </div>
          <h1 className="text-2xl font-bold">{ticket.subject}</h1>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ticket Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                {ticket.description_text || "No description available for this ticket."}
              </p>
            </CardContent>
          </Card>
          <GetUserContactDetails id={ticket.id} />

          {/* Conversations */}
          {conversations && conversations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Conversation History</CardTitle>
                <CardDescription>
                  {conversations.length} messages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {conversations.map((conversation) => (
                  <div key={conversation.id} className="border-l-2 border-muted pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-mediusm">
                        {conversation.from_email || 'System'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(conversation.created_at)}
                      </p>
                    </div>
                    <div 
                      className="text-sm prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: conversation.body }}
                    />
                   {(conversations ?? []).map((conversation, index) => (
  <div key={conversation.id}>
    
    {index < (conversations?.length ?? 0) - 1 && (
      <Separator className="mt-4" />
    )}
  </div>
))}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Requester Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Requester
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>
                    {getInitials(ticket.requester.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{ticket.requester.name}</p>
                  <p className="text-sm text-muted-foreground">Customer</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{ticket.requester.email}</span>
                </div>
                {ticket.requester.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{ticket.requester.phone}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Ticket Details */}
          <Card>
            <CardHeader>
              <CardTitle>Ticket Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Type</p>
                  <p className="font-medium">{ticket.type}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Priority</p>
                  <Badge className={priorityInfo.color}>
                    {priorityInfo.label}
                  </Badge>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Created</p>
                  <p className="font-medium">{formatDate(ticket.created_at)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Updated</p>
                  <p className="font-medium">{formatDate(ticket.updated_at)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Due Date</p>
                  <p className="font-medium">{formatDate(ticket.due_by)}</p>
                </div>
              </div>

              {ticket.sentiment_score && (
                <>
                  <Separator />
                  <div>
                    <p className="text-muted-foreground text-sm">Sentiment Score</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${ticket.sentiment_score}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{ticket.sentiment_score}%</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;