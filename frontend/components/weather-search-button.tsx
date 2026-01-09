import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverPopup, PopoverTrigger } from "@/components/ui/popover";

export function WeatherSearchButton({
    onClick,
    city,
    disabled,
}: {
    onClick: () => void;
    city: string;
    disabled: boolean;
}) {
    // If city is not empty
    if (city.trim()) {
        return (
            <Button
                onClick={() => onClick()}
                variant="outline"
                disabled={disabled}
            >
                <SearchIcon />
                Search
            </Button>
        );
    }

    return (
        <Popover>
            <PopoverTrigger render={<Button variant="outline" />}>
                <SearchIcon />
                Search
            </PopoverTrigger>
            <PopoverPopup className="w-64 px-2 py-1">
                <p>Please enter a city to search for weather information.</p>
            </PopoverPopup>
        </Popover>
    );
}
