"use client";

import { useCallback, useState } from "react";
import {
    Frame,
    FrameDescription,
    FrameHeader,
    FramePanel,
    FrameTitle,
    FrameFooter,
} from "@/components/ui/frame";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectItem,
    SelectPopup,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { WeatherBody } from "@/components/weather-body";
import { WeatherFooter } from "@/components/weather-footer";
import { SearchIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { fetchWeather, UnitGroup } from "@/lib/data";
import {
    getDefaultCity,
    getDefaultUnit,
    saveLatestSearch,
    LAST_SUCCESSFUL_CITY_KEY,
    LAST_SUCCESSFUL_UNIT_KEY,
    getLatestSearches,
    LatestSearchEntry,
} from "@/lib/storage";

export default function Home() {
    const [city, setCity] = useState(getDefaultCity());
    const [unit, setUnit] = useState<UnitGroup>(getDefaultUnit());
    const [latestSearches, setLatestSearches] = useState<LatestSearchEntry[]>(
        () => getLatestSearches()
    );
    const { data, isPending, error, mutate } = useMutation({
        mutationFn: async ({ city, unit }: { city: string; unit: UnitGroup }) =>
            fetchWeather(city, unit),
        onSuccess: (data) => {
            if (!data) return;
            localStorage.setItem(LAST_SUCCESSFUL_CITY_KEY, data.city);
            localStorage.setItem(LAST_SUCCESSFUL_UNIT_KEY, data.unitGroup);
            saveLatestSearch(data.city, data.unitGroup);
            setLatestSearches(getLatestSearches());
        },
    });

    const search = useCallback(
        (searchCity?: string, searchUnit?: UnitGroup) => {
            const localCity = searchCity ?? city;
            const localUnit = searchUnit ?? unit;

            if (!localCity.trim()) return;
            mutate({ city: localCity, unit: localUnit });
        },
        [mutate, city, unit]
    );

    const updateSearch = useCallback(
        (newCity: string, newUnit: UnitGroup) => {
            setCity(newCity);
            setUnit(newUnit);
            search(newCity, newUnit);
        },
        [search]
    );

    const selectItems = [
        { value: "metric", label: "Metric" },
        { value: "us", label: "US" },
    ];

    return (
        <div className="pt-16 md:pt-32">
            <Frame className="w-full md:w-3/4 p-1 px-2 md:p-1 mx-auto">
                <FrameHeader className="px-0 md:px-5 py-2">
                    <FrameTitle className="text-lg">Weather App</FrameTitle>
                    <FrameDescription className="flex gap-2 text-foreground">
                        <InputGroup>
                            <InputGroupInput
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        search();
                                    }
                                }}
                                aria-label="Search"
                                placeholder="Enter city name"
                                type="search"
                            />
                            <InputGroupAddon>
                                <SearchIcon />
                            </InputGroupAddon>
                        </InputGroup>
                        <Select
                            value={unit}
                            onValueChange={(value) =>
                                setUnit(value || "metric")
                            }
                            items={selectItems}
                        >
                            <SelectTrigger className="w-24 min-w-24 md:max-w-48">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectPopup>
                                {selectItems.map(({ label, value }) => (
                                    <SelectItem key={value} value={value}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectPopup>
                        </Select>
                        <Button onClick={() => search()} variant="outline">
                            Search
                        </Button>
                    </FrameDescription>
                </FrameHeader>
                <FramePanel className="h-48 md:h-38 flex items-center">
                    <WeatherBody
                        weather={data}
                        isLoading={isPending}
                        error={error}
                    />
                </FramePanel>
                <FrameFooter className="px-0 md:px-5 py-2">
                    <WeatherFooter
                        latestSearches={latestSearches}
                        updateSearch={updateSearch}
                    />
                </FrameFooter>
            </Frame>
        </div>
    );
}
