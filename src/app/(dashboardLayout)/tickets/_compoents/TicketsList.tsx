import { AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { formatDate, getInitials, getPriorityInfo, getStatusInfo } from "@/lib/ticketUtils";
import { Ticket } from "@/types";
import { Avatar } from "@radix-ui/react-avatar";
import { 
  Calendar, 
  Clock, 
  Eye, 
  MoreHorizontal, 
  Tag, 
  FileText,
 
} from "lucide-react";
import Link from "next/link";

const TicketsList: React.FC<{ tickets: Ticket[]}> = ({ tickets }) => {
  return (
    <div className="space-y-6">
      {/* Clean Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Support Tickets</h1>
              <p className="text-gray-600">Manage your support requests</p>
            </div>
          </div>
          
          <Badge className="px-3 py-1 bg-blue-100 text-blue-800 border-blue-200">
            {tickets.length} Tickets
          </Badge>
        </div>
      </div>

      {/* Clean Tickets Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tickets.map((ticket) => {
          const statusInfo = getStatusInfo(ticket.status);
          const priorityInfo = getPriorityInfo(ticket.priority);
          const StatusIcon = statusInfo.icon;

          return (
            <Card 
              key={ticket.id} 
              className="bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${statusInfo.color}`} />
                    <Badge variant="outline" className="text-xs font-medium">
                      #{ticket.id}
                    </Badge>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href={`/tickets/${ticket.id}`} className="flex items-center">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <CardTitle className="text-base font-semibold text-gray-900 line-clamp-2 leading-tight">
                  {ticket.subject}
                </CardTitle>
                
                <div className="flex items-center gap-2 pt-2">
                  <Badge 
                    className={`${priorityInfo.color} text-xs font-medium border-0`}
                  >
                    {priorityInfo.label}
                  </Badge>
                  <Badge 
                    variant="secondary" 
                    className="flex items-center gap-1 bg-gray-100 text-gray-700 text-xs font-medium"
                  >
                    <StatusIcon className="w-3 h-3" />
                    {statusInfo.label}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Requester Info */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs font-medium bg-blue-100 text-blue-700">
                      {getInitials(ticket.requester.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {ticket.requester.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {ticket.requester.email}
                    </p>
                  </div>
                </div>

                {/* Metadata */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Created: {formatDate(ticket.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>Due: {formatDate(ticket.due_by)}</span>
                  </div>
                  {ticket.type && (
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <span>{ticket.type}</span>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <Button 
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  size="sm"
                >
                  <Link href={`/tickets/${ticket.id}`} className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    View Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {tickets.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No tickets yet
          </h3>
          <p className="text-gray-600 max-w-md">
            Your support tickets will appear here. Create your first ticket to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default TicketsList;