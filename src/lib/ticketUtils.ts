import { CheckCircle, Circle, Clock } from "lucide-react";

// Utility functions
export const getStatusInfo = (status: number) => {
  const statusMap = {
    2: { label: 'Open', color: 'bg-blue-500', icon: Circle },
    3: { label: 'Pending', color: 'bg-yellow-500', icon: Clock },
    4: { label: 'Resolved', color: 'bg-green-500', icon: CheckCircle },
    5: { label: 'Closed', color: 'bg-gray-500', icon: CheckCircle }
  };
  return statusMap[status as keyof typeof statusMap] || { label: 'Unknown', color: 'bg-gray-500', icon: Circle };
};

export const getPriorityInfo = (priority: number) => {
  const priorityMap = {
    1: { label: 'Low', color: 'bg-green-100 text-green-800' },
    2: { label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    3: { label: 'High', color: 'bg-orange-100 text-orange-800' },
    4: { label: 'Urgent', color: 'bg-red-100 text-red-800' }
  };
  return priorityMap[priority as keyof typeof priorityMap] || { label: 'Unknown', color: 'bg-gray-100 text-gray-800' };
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

export function getLifecycleStageColor(stage?: string): string {
  switch (stage?.toLowerCase()) {
    case 'lead':
      return 'bg-yellow-100 text-yellow-800';
    case 'marketingqualifiedlead':
      return 'bg-orange-100 text-orange-800';
    case 'salesqualifiedlead':
      return 'bg-blue-100 text-blue-800';
    case 'opportunity':
      return 'bg-purple-100 text-purple-800';
    case 'customer':
      return 'bg-green-100 text-green-800';
    case 'evangelist':
      return 'bg-emerald-100 text-emerald-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}