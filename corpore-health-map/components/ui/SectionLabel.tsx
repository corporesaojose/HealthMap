import React from "react";

interface SectionLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className = "", ...props }: SectionLabelProps) {
  return (
    <span className={`section-label ${className}`} {...props}>
      {children}
    </span>
  );
}
