import {
    Collapsible,
    CollapsiblePanel,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "./ui/button";
import { Card, CardPanel } from "./ui/card";
import { Separator } from "./ui/separator";
import { ChevronDownIcon } from "lucide-react";
import { LatestSearchEntry } from "@/lib/storage";
import { UnitGroup } from "@/lib/data";

export function WeatherFooter({
    latestSearches,
    updateSearch,
}: {
    latestSearches: LatestSearchEntry[];
    updateSearch: (city: string, unit: UnitGroup) => void;
}) {
    return (
        <Collapsible>
            <CollapsibleTrigger className="inline-flex items-center gap-2 font-medium text-sm data-panel-open:[&_svg]:rotate-180">
                Recent Searches
                <ChevronDownIcon className="size-4" />
            </CollapsibleTrigger>
            <CollapsiblePanel>
                <Card className="p-0">
                    <CardPanel className="p-1 flex flex-col gap-1">
                        {latestSearches.length > 0 &&
                            latestSearches.map((entry, index) => (
                                <Button
                                    key={`${entry.city}-${entry.unitGroup}-${index}`}
                                    className="w-full rounded-md first:rounded-t-xl last:rounded-b-xl"
                                    size="sm"
                                    variant="secondary"
                                    onClick={() =>
                                        updateSearch(
                                            entry.city,
                                            entry.unitGroup
                                        )
                                    }
                                >
                                    <div className="grid grid-cols-[1fr_auto_1fr] gap-1 items-center">
                                        <span className="text-right">
                                            {entry.city}
                                        </span>
                                        <Separator orientation="vertical" />
                                        <span className="text-left text-muted-foreground">
                                            {entry.unitGroup}
                                        </span>
                                    </div>
                                </Button>
                            ))}
                    </CardPanel>
                </Card>
            </CollapsiblePanel>
        </Collapsible>
    );
}
