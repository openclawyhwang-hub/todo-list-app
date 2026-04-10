"use client";

import { X } from "lucide-react";

interface TagBadgeProps {
  id: string;
  name: string;
  color: string;
  onRemove?: () => void;
}

export default function TagBadge({ id, name, color, onRemove }: TagBadgeProps) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: color, color: '#fff' }}
    >
      {name}
      {onRemove && (
        <button onClick={onRemove} className="hover:bg-white/20 rounded-full p-0.5">
          <X size={12} />
        </button>
      )}
    </span>
  );
}
