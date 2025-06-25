import { fetchServerSideData } from "@/lib/fetchServerSideData";
import { Conversation, TicketDetails } from "@/types";
import TicketDetail from "./_components/TicketDetail";

type TicketDetailsProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TicketDetailsPage({ params }: TicketDetailsProps) {
  const { id } = await params;
const res: { ticket: TicketDetails; conversations: Conversation[] } = await fetchServerSideData(`/api/tickets/${id}`, {
  method: "GET",
  cache: "no-store",
});

    
  return (
    <div>
      <TicketDetail ticket={res.ticket} conversations={res.conversations} />
    </div>
  );
}