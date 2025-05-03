import { NavigateFunction } from "react-router";
import { SidebarHeader as Header, SidebarTrigger } from "~/components/ui/sidebar";
import { Button } from "~/components/ui/button";

interface SidebarHeaderProps {
  navigate: NavigateFunction;
}

export function SidebarHeader({ navigate }: SidebarHeaderProps) {
  return (
    <Header>
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          type="button"
          className="justify-start gap-2 h-10"
          onClick={() => navigate("/")}
        >
          <span className="font-semibold">WOW PKM</span>
        </Button>
        <SidebarTrigger className="md:hidden" />
      </div>
    </Header>
  );
}
