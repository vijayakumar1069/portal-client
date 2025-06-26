"use client"
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/ticketUtils";
import { WebhookLog } from "@/types";
import { Clock, ExternalLink, Ticket, User, AlertCircle } from "lucide-react";
import Link from "next/link";

const getEventBadgeColor = (event: string) => {
  switch (event) {
    case 'ticket created':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'ticket updated from Open to Pending':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'ticket updated from Pending to Resolved':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'ticket updated from Resolved to Closed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'ticket reopened':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const ViewTicketButton = ({ ticketId }: { ticketId: string }) => {
  return (
    <Button
    asChild
      
      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 hover:border-blue-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
    >
        <Link href={`/tickets/${ticketId}`}>
        
      <Ticket className="w-4 h-4" />
      View Ticket
      <ExternalLink className="w-3 h-3" />
        </Link>
    </Button>
  );
};

const getEventIcon = (event: string) => {
  switch (event) {
    case 'ticket_resolved_processed':
      return '✅';
    case 'ticket_updated_processed':
      return '📝';
    case 'ticket_created_processed':
      return '🎫';
    default:
      return '📋';
  }
};

const getStatusBadgeColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'resolved':
      return 'bg-green-100 text-green-800 border border-green-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800 border border-blue-200';
    case 'open':
      return 'bg-orange-100 text-orange-800 border border-orange-200';
    case 'closed':
      return 'bg-gray-100 text-gray-800 border border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-200';
  }
};

const EmptyState = () => (
  <div className="text-center py-12">
    <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
    <h3 className="mt-2 text-sm font-medium text-gray-900">No logs found</h3>
    <p className="mt-1 text-sm text-gray-500">
      No ticket webhook logs have been recorded yet.
    </p>
  </div>
);

export default function TicketLogsTable({ logsData }: { logsData: WebhookLog[] }) {

  if (!logsData || logsData.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 bg-white">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Ticket Activity Log</h1>
          <p className="text-gray-600">Track all ticket events and activities</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Ticket Activity Log</h1>
        <p className="text-gray-600">Track all ticket events and activities</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ticket Id
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logsData.map((log: WebhookLog) => {
                const rawDate = log?.createdAt || log.timestamp;
                const date = formatDate(
                  typeof rawDate === "string"
                    ? rawDate
                    : rawDate instanceof Date
                      ? rawDate.toISOString()
                      : ""
                );
                return (
                  <tr key={log._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{getEventIcon(log.event)}</span>
                        <div>
                          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getEventBadgeColor(log.event)}`}>
                            {log.event.replace(/_/g, ' ').replace(/processed/g, '').trim()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-900">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="font-medium">{date}</div>
                          {/* <div className="text-gray-500">{time}</div> */}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                        {log.source}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-900">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                          {log.payload?.ticketId}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(log.payload?.status || 'N/A')}`}>
                        {log.payload?.status || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ViewTicketButton ticketId={log.payload?.ticketId || log._id || ""} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <div>Showing {logsData.length} entries</div>
        <div className="flex items-center gap-2">
          <span>Last updated:</span>
          <span className="font-medium">
            {logsData[0]?.updatedAt
              ? formatDate(
                  typeof logsData[0].updatedAt === "string"
                    ? logsData[0].updatedAt
                    : logsData[0].updatedAt instanceof Date
                      ? logsData[0].updatedAt.toISOString()
                      : ""
                )
              : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
}