import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { fetchServerSideData } from "@/lib/fetchServerSideData";
import { formatDate, getInitials, getLifecycleStageColor } from "@/lib/ticketUtils";
import { HubSpotContact } from "@/types";
import { Building2, Calendar, Mail, Phone } from "lucide-react";

export default async function GetUserContactDetails({ id }: { id: number }) {
  const res:{contact:HubSpotContact}=await fetchServerSideData(`/api/tickets/${id}/contact`,
    {
        method: "GET",
        cache: "no-store",
    }
  )


  const properties = res.contact?.properties || {};
  const fullName = [properties.firstname, properties.lastname].filter(Boolean).join(" ");

  if (!res.contact) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            CRM Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">No CRM data found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

 

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          CRM Data
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Contact Info */}
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback>
              {getInitials(properties?.firstname ?? "")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium">{fullName}</p>
            {properties.lifecyclestage && (
              <Badge 
                variant="secondary" 
                className={`text-xs ${getLifecycleStageColor(properties.lifecyclestage)}`}
              >
                {properties.lifecyclestage.replace(/([A-Z])/g, ' $1').trim()}
              </Badge>
            )}
          </div>
        </div>

        <Separator />

        {/* Contact Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">{properties.email}</span>
          </div>
          
          {properties.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{properties.phone}</span>
            </div>
          )}
          
          {properties.company && (
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{properties.company}</span>
            </div>
          )}
        </div>

        <Separator />

        {/* Timeline */}
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-muted-foreground">First Contact</p>
            <p className="font-medium flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(properties.createdate)}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Last Updated</p>
            <p className="font-medium flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(properties.lastmodifieddate)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
