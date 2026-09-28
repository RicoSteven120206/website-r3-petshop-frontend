"use client";

import React from 'react';
import { Button, Heading, Text } from "@/src/components/atoms/Index";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon,
  title, 
  description,
  actionLabel,
  onAction
}: EmptyStateProps) {
  return (
    <div className='flex flex-col items-center justify-center gap-3 py-16 text-center'>
      {icon && <div className='text-4xl'>{icon}</div>}
      <Heading level={5}>{title}</Heading>
      {description && (
        <Text tone='muted' size='sm' className='max-w-xs'>
          {description}
        </Text>
      )}
      {actionLabel && onAction && (
        <Button
          variant='outline'
          size='sm'
          onClick={onAction}
          className='mt-2'
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
