import { fetchServerSideData } from "@/lib/fetchServerSideData";
import TicketsList from "./_compoents/TicketsList";
import { Ticket } from "@/types";

export default async function TicketsPage() {
   const res: { tickets: Ticket[] } = await fetchServerSideData("/api/tickets", {
        method: "GET",
        cache: "no-store"
    });

    return (
        <div>
            <TicketsList tickets={res?.tickets} />
        </div>
    );
}