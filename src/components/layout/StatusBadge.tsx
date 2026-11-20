import React from 'react';
import { ValidationStatus } from '../../types/blueprint';
import { CheckCircle2, AlertTriangle, HelpCircle, Compass, Cpu } from 'lucide-react';

interface StatusBadgeProps {
  status: ValidationStatus;
  compact?: boolean;
}

const STATUS_CONFIG: Record<
  ValidationStatus,
  {
    shortLabel: string;
    classes: string;
    icon: React.FC<{ className?: string }>;
  }
> = {
  'CONFIRMED IN PROJECT DISCUSSION': {
    shortLabel: 'CONFIRMED',
    classes: 'border-[#3CA77A]/60 bg-[#3CA77A]/15 text-[#7AE0B3]',
    icon: CheckCircle2,
  },
  'SOURCE DOCUMENT PROPOSAL': {
    shortLabel: 'SOURCE PROPOSAL',
    classes: 'border-[#42C7E8]/60 bg-[#42C7E8]/15 text-[#86E1F7]',
    icon: Compass,
  },
  'PROPOSED DESIGN': {
    shortLabel: 'PROPOSED DESIGN',
    classes: 'border-[#1D9BF0]/60 bg-[#1D9BF0]/15 text-[#7FC6F8]',
    icon: Cpu,
  },
  'UNKNOWN / NEEDS VERIFICATION': {
    shortLabel: 'UNKNOWN / VERIFY',
    classes: 'border-[#D9534F]/70 bg-[#D9534F]/15 text-[#F69D9B]',
    icon: HelpCircle,
  },
  'ILLUSTRATIVE SIMULATION': {
    shortLabel: 'ILLUSTRATIVE SIM',
    classes: 'border-[#E9A23B]/70 bg-[#E9A23B]/15 text-[#F5C57B]',
    icon: AlertTriangle,
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, compact = false }) => {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;
  return (
    <span
      title={status}
      className={`inline-flex items-center gap-1.5 rounded border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap ${cfg.classes}`}
    >
      <Icon className="h-3 w-3 shrink-0" />
      <span>{compact ? cfg.shortLabel : status}</span>
    </span>
  );
};
