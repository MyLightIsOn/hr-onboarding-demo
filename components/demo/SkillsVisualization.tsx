import { Badge } from '@/components/ui/badge';
import { getRoleSkillName } from '@/lib/data-access/roleService';
import { CheckCircle2, FileText, Folder } from 'lucide-react';

interface SkillsVisualizationProps {
  roleId: string;
}

export function SkillsVisualization({ roleId }: SkillsVisualizationProps) {
  const skillName = getRoleSkillName(roleId);

  // Simulate the 3-level architecture
  const levels = [
    {
      level: 1,
      name: 'Metadata',
      description: 'Skill discovery & routing',
      tokens: 100,
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: FileText,
      files: ['SKILL.md (metadata only)'],
      status: 'loaded',
    },
    {
      level: 2,
      name: 'Instructions',
      description: 'Role-specific workflow',
      tokens: 2500,
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      icon: FileText,
      files: [
        `roles/${roleId}/SKILL.md`,
        'Onboarding timeline',
        'Policy summaries',
      ],
      status: 'loaded',
    },
    {
      level: 3,
      name: 'Resources',
      description: 'On-demand context',
      tokens: 0,
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: Folder,
      files: [
        'SETUP.md (if referenced)',
        'TEAM_CONTEXT.md (if referenced)',
        'Policy files (when queried)',
      ],
      status: 'available',
    },
  ];

  const totalTokens = levels.reduce((sum, level) => sum + level.tokens, 0);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle2 className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-semibold text-blue-900">Active Skill</span>
        </div>
        <p className="text-sm text-blue-800 font-mono">{skillName}</p>
      </div>

      {/* Progressive Disclosure Levels */}
      <div className="space-y-3">
        {levels.map((level) => {
          const Icon = level.icon;
          return (
            <div
              key={level.level}
              className={`border-2 rounded-lg p-4 ${level.color}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <div>
                    <div className="font-semibold text-sm">
                      Level {level.level}: {level.name}
                    </div>
                    <div className="text-xs opacity-80">{level.description}</div>
                  </div>
                </div>
                <Badge
                  variant={level.status === 'loaded' ? 'default' : 'outline'}
                  className="text-xs"
                >
                  {level.status}
                </Badge>
              </div>

              {/* Files */}
              <div className="mt-3 space-y-1">
                {level.files.map((file, idx) => (
                  <div key={idx} className="text-xs font-mono bg-white/50 px-2 py-1 rounded">
                    {file}
                  </div>
                ))}
              </div>

              {/* Tokens */}
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="opacity-80">Token usage:</span>
                <span className="font-bold">
                  {level.tokens > 0 ? `${level.tokens.toLocaleString()} tokens` : 'As needed'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-4">
        <div className="text-sm font-semibold text-gray-900 mb-2">
          Total Tokens Loaded
        </div>
        <div className="text-3xl font-bold text-blue-600 mb-2">
          {totalTokens.toLocaleString()}
        </div>
        <div className="text-xs text-gray-600">
          vs. ~35,000 tokens in traditional approach
        </div>
        <div className="mt-2 text-xs font-semibold text-green-700">
          ✓ 82% token reduction with progressive disclosure
        </div>
      </div>

      {/* How it works */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
        <div className="text-xs font-semibold text-gray-700 mb-2">
          How Progressive Disclosure Works:
        </div>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Level 1 loads immediately (100 tokens)</li>
          <li>• Level 2 loads when role selected (2.5k tokens)</li>
          <li>• Level 3 loads only when explicitly needed (0 tokens initially)</li>
          <li>• Result: Fast, efficient, scalable architecture</li>
        </ul>
      </div>
    </div>
  );
}
