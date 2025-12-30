import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingDown, Zap } from 'lucide-react';

interface TokenUsageDisplayProps {
  roleId: string;
}

export function TokenUsageDisplay({ roleId }: TokenUsageDisplayProps) {
  // Token calculations based on our Skills architecture
  const traditionalTokens = 35000;
  const skillsTokens = 2600; // Metadata (100) + Instructions (2500)
  const savings = traditionalTokens - skillsTokens;
  const savingsPercent = Math.round((savings / traditionalTokens) * 100);

  const breakdown = [
    {
      category: 'Skills Metadata',
      tokens: 100,
      description: 'Orchestrator + role discovery',
      color: 'bg-blue-500',
    },
    {
      category: 'Role Instructions',
      tokens: 2500,
      description: `${roleId} onboarding workflow`,
      color: 'bg-purple-500',
    },
    {
      category: 'Context (On-demand)',
      tokens: 0,
      description: 'Loaded only when referenced',
      color: 'bg-green-500',
    },
  ];

  const comparisonData = [
    {
      approach: 'Traditional',
      description: 'All policies, all roles, all context loaded upfront',
      tokens: traditionalTokens,
      percentage: 100,
      color: 'bg-red-500',
    },
    {
      approach: 'Agent Skills',
      description: 'Progressive disclosure - load only what\'s needed',
      tokens: skillsTokens,
      percentage: Math.round((skillsTokens / traditionalTokens) * 100),
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Token Savings Hero */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <TrendingDown className="h-5 w-5 text-green-600" />
          <span className="text-sm font-semibold text-green-900">Token Efficiency</span>
        </div>
        <div className="text-4xl font-bold text-green-600 mb-1">
          {savingsPercent}%
        </div>
        <div className="text-sm text-green-800">
          savings with Skills architecture
        </div>
        <div className="mt-2 text-xs text-green-700">
          {savings.toLocaleString()} fewer tokens per request
        </div>
      </div>

      {/* Token Breakdown */}
      <div>
        <div className="text-sm font-semibold text-gray-900 mb-3">
          Current Token Usage
        </div>
        <div className="space-y-3">
          {breakdown.map((item) => (
            <div key={item.category} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{item.category}</span>
                <Badge variant="outline">
                  {item.tokens > 0 ? `${item.tokens.toLocaleString()} tokens` : 'On-demand'}
                </Badge>
              </div>
              <div className="text-xs text-gray-500">{item.description}</div>
              {item.tokens > 0 && (
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color}`}
                    style={{ width: `${(item.tokens / 3000) * 100}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span>Total Loaded</span>
            <span className="text-lg text-blue-600">
              {skillsTokens.toLocaleString()} tokens
            </span>
          </div>
        </div>
      </div>

      {/* Comparison */}
      <div>
        <div className="text-sm font-semibold text-gray-900 mb-3">
          Approach Comparison
        </div>
        <div className="space-y-3">
          {comparisonData.map((item) => (
            <div
              key={item.approach}
              className="border rounded-lg p-3 bg-gray-50"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-900">
                  {item.approach}
                </span>
                <Badge variant="outline">
                  {item.tokens.toLocaleString()} tokens
                </Badge>
              </div>
              <div className="text-xs text-gray-600 mb-2">
                {item.description}
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Token usage</span>
                  <span className="font-semibold">{item.percentage}%</span>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Benefits */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="h-4 w-4 text-blue-600" />
          <span className="text-xs font-semibold text-blue-900">Why This Matters</span>
        </div>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>✓ Faster response times (less context to process)</li>
          <li>✓ Lower API costs (fewer tokens per request)</li>
          <li>✓ Better focus (only relevant context loaded)</li>
          <li>✓ Scales to 100+ roles without context bloat</li>
        </ul>
      </div>
    </div>
  );
}
