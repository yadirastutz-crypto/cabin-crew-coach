interface PremiumGateProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function PremiumGate({ children }: PremiumGateProps) {
  return <>{children}</>;
}
