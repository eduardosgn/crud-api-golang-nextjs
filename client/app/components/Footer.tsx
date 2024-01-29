import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import GithubIcon from "./GithubIcon";

export default function Footer() {
  return (
    <div className="bg-slate-100 text-slate-600 border-t-[1px] py-3 fixed bottom-0 left-0 right-0">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-sm">Eduardo Nascimento</p>

        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <GithubIcon />
            </TooltipTrigger>
            <TooltipContent>
              <p>Repositório deste projeto no Github</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
