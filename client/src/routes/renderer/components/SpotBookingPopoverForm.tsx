import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useSelect from "../hooks/useSelect";
import { useEffect, useRef, useState } from "react";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

import { Timer, Infinity } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

function SpotBookingPopoverForm() {
  const { selectedObject } = useSelect();
  const focusRef = useRef<HTMLInputElement>(null);
  const [ parkType, setParkType ] = useState<string>("timed");

  // For automatically focusing on an element at start
  // Easier Accessibility
  useEffect(() => {
    if ( focusRef.current ) {
      focusRef.current.focus();
    }
  }, []);

  if ( !selectedObject ) return null;

  function handleParkTimeOptionSelect(value: string) {
    setParkType(value);
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col text-xs gap-2">
        <span className="text-md font-semibold">Book a spot</span>
        <hr />
        <div className="grid grid-cols-2 items-center gap-y-3">
          <Label>Parking type</Label>
          <ToggleGroup type="single" onValueChange={handleParkTimeOptionSelect} defaultValue="timed">
            <ToggleGroupItem value="timed" aria-label="Toggle timed">
              <Tooltip>
                <TooltipTrigger>
                  <Timer size={16} />
                </TooltipTrigger>
                <TooltipContent>
                  Timed
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
            <ToggleGroupItem value="infinite" aria-label="Toggle indefinite">
              <Tooltip>
                <TooltipTrigger>
                  <Infinity size={16} />
                </TooltipTrigger>
                <TooltipContent>
                  Indefinite
                </TooltipContent>
              </Tooltip>
            </ToggleGroupItem>
          </ToggleGroup>
          {
            parkType == "timed" && (
              <>
                <Label>Est. park end time</Label>
                <Input ref={focusRef} placeholder="MM/DD/YYYY" type="date"></Input>
              </>
            )
          }
          <Label>Note</Label>
          <Input placeholder="(Optional)" type="text"></Input>
        </div>
      </div>
    </TooltipProvider>
  )
}

export default SpotBookingPopoverForm;