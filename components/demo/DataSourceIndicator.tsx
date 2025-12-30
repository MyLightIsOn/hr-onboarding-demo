import { Badge } from '@/components/ui/badge';
import { Database, Server, FileJson, CheckCircle2 } from 'lucide-react';

interface DataSourceIndicatorProps {
  roleId: string;
}

export function DataSourceIndicator({ roleId }: DataSourceIndicatorProps) {
  // Simulated data sources accessed
  const dataSources = [
    {
      name: 'Workday HRIS',
      description: 'Employee data, org chart, manager info',
      status: 'active',
      queriesCount: 3,
      icon: Database,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      examples: [
        'Employee profile (name, role, team)',
        'Manager & buddy assignments',
        'Start date & location',
      ],
    },
    {
      name: 'Greenhouse ATS',
      description: 'Role requirements, training needs',
      status: 'active',
      queriesCount: 2,
      icon: Server,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      examples: [
        'Role-specific requirements',
        'Required training courses',
      ],
    },
    {
      name: 'Confluence Wiki',
      description: 'Policies, team documentation',
      status: 'active',
      queriesCount: 5,
      icon: FileJson,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      examples: [
        'Remote work policy',
        'Expense policy',
        'PTO policy',
        'Security guidelines',
        'Benefits overview',
      ],
    },
    {
      name: 'Degreed LMS',
      description: 'Learning paths, course data',
      status: 'active',
      queriesCount: 4,
      icon: Server,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      examples: [
        'Required courses for role',
        'Recommended courses',
        'Course progress tracking',
        'Completion deadlines',
      ],
    },
    {
      name: 'Slack Directory',
      description: 'People recommendations, expertise',
      status: 'active',
      queriesCount: 2,
      icon: Database,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
      examples: [
        'Team members & cross-functional partners',
        'Recommended connections',
      ],
    },
  ];

  const totalQueries = dataSources.reduce((sum, source) => sum + source.queriesCount, 0);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-4">
        <div className="text-sm font-semibold text-gray-900 mb-1">
          Data Sources Integration
        </div>
        <div className="text-2xl font-bold text-blue-600 mb-2">
          {dataSources.length} Systems
        </div>
        <div className="text-xs text-gray-600">
          {totalQueries} queries executed for {roleId}
        </div>
      </div>

      {/* Data Sources */}
      <div className="space-y-3">
        {dataSources.map((source) => {
          const Icon = source.icon;
          return (
            <div
              key={source.name}
              className="border rounded-lg p-3 bg-gray-50 hover:bg-white transition-colors"
            >
              <div className="flex items-start gap-3 mb-2">
                <div className={`${source.bgColor} p-2 rounded-lg`}>
                  <Icon className={`h-4 w-4 ${source.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-900">
                      {source.name}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {source.queriesCount} queries
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">
                    {source.description}
                  </p>
                </div>
              </div>

              {/* Example queries */}
              <div className="ml-11">
                <div className="text-xs font-medium text-gray-700 mb-1">
                  Data Retrieved:
                </div>
                <ul className="space-y-1">
                  {source.examples.map((example, idx) => (
                    <li key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                      <CheckCircle2 className="h-3 w-3 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* How Skills Integrate */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="text-xs font-semibold text-blue-900 mb-2">
          How Skills Query Data:
        </div>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>1. Skills identify what data is needed</li>
          <li>2. Query only relevant systems (not all data)</li>
          <li>3. Cache results to minimize API calls</li>
          <li>4. Present personalized, role-aware information</li>
        </ul>
      </div>

      {/* Production Note */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <div className="text-xs font-semibold text-yellow-900 mb-1">
          📝 Demo Note
        </div>
        <p className="text-xs text-yellow-800">
          This demo uses mock data files. In production, Skills would query real APIs 
          (Workday, Greenhouse, Confluence, etc.) with proper authentication and caching.
        </p>
      </div>
    </div>
  );
}
