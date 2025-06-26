import { fetchServerSideData } from "@/lib/fetchServerSideData";
import { WebhookLog } from "@/types";
import { Ticket } from "lucide-react";
import TicketLogsTable from "./_components/TicketLogsTable";

export default async function LogsPage() {
    const res: { logs: WebhookLog[] }=await fetchServerSideData("/api/webhooks/logs",
        {
            method: "GET",
            cache: "no-cache",
        }
    );
    
    return (
        <div className="">

        <div className="text-center space-y-4">
      <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/20">
        <Ticket className="h-8 w-8 text-indigo-600" />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Ticket Webhook Logs
        </h1>
      </div>
      <p className="text-slate-600 text-lg max-w-2xl mx-auto">
        Monitor and track ticket webhook events from Freshdesk and HubSpot in real-time
      </p>
      <TicketLogsTable logsData={res?.logs} />
    </div>
        </div>
    );
}