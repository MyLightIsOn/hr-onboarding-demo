import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { RecommendedPerson } from '@/lib/types';
import { Mail, Calendar, MapPin, Briefcase } from 'lucide-react';

interface PersonCardProps {
  recommendation: RecommendedPerson;
}

export function PersonCard({ recommendation }: PersonCardProps) {
  const { person, relationship, reason, priority } = recommendation;

  const getRelationshipColor = (rel: string) => {
    switch (rel) {
      case 'manager':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'buddy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'peer':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cross-functional':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'mentor':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityBadge = () => {
    if (priority === 1) return <Badge variant="destructive" className="text-xs">High Priority</Badge>;
    if (priority === 2) return <Badge variant="default" className="text-xs">Priority</Badge>;
    return null;
  };

  // Generate avatar initials
  const initials = person.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  // Generate gradient for avatar
  const getGradient = () => {
    const gradients = [
      'from-blue-400 to-purple-500',
      'from-green-400 to-blue-500',
      'from-purple-400 to-pink-500',
      'from-orange-400 to-red-500',
      'from-teal-400 to-cyan-500',
    ];
    const index = person.name.length % gradients.length;
    return gradients[index];
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        {/* Avatar & Header */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className={`w-16 h-16 rounded-full bg-gradient-to-br ${getGradient()} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 mb-1 truncate">
              {person.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2 truncate">{person.title}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className={getRelationshipColor(relationship)}>
                {relationship}
              </Badge>
              {getPriorityBadge()}
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {person.bio}
        </p>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Briefcase className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">{person.team}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">{person.location}</span>
          </div>
        </div>

        {/* Expertise Tags */}
        {person.expertise.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-medium text-gray-700 mb-2">Expertise:</p>
            <div className="flex flex-wrap gap-1">
              {person.expertise.slice(0, 3).map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="text-xs bg-gray-100 text-gray-700"
                >
                  {skill}
                </Badge>
              ))}
              {person.expertise.length > 3 && (
                <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                  +{person.expertise.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Reason */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4">
          <p className="text-xs font-medium text-blue-900 mb-1">Why connect:</p>
          <p className="text-xs text-blue-800">{reason}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="default" size="sm" className="flex-1">
            <Calendar className="h-3.5 w-3.5 mr-1.5" />
            Schedule intro
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Mail className="h-3.5 w-3.5 mr-1.5" />
            Send message
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
