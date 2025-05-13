import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VitalLab UI Components Showcase',
  description: 'A showcase of reusable UI components for the VitalLab platform',
};

export default function UIShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 pb-16">
      {children}
    </div>
  );
} 