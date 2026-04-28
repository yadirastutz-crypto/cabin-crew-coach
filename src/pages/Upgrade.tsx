import { useLocation } from "wouter";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Upgrade() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-[100dvh] bg-background pb-12 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <div className="w-20 h-20 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-success" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-3">Everything Is Free</h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          Cabin Crew Coach is completely free. All training content, phases, interview prep, written in blood case studies, voice coaching, and exam modes are fully unlocked for every user.
        </p>
        <Button
          className="w-full h-14 text-base font-bold rounded-xl bg-primary text-primary-foreground"
          onClick={() => setLocation("/")}
        >
          Back to Training
        </Button>
      </div>
    </div>
  );
}
