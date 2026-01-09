import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { Skeleton } from "./ui/skeleton";
import { WeatherIcon } from "./weather-icon";
import { StatCard } from "./weather-body/stat-card";
import { Cloud } from "lucide-react";
import { CurrentWeatherResponse } from "@/lib/data";
import { capitalize } from "@/lib/utils";

function WeatherBodySkeleton() {
    return (
        <div className="flex flex-col md:flex-row gap-2 justify-between w-full items-start md:items-center">
            <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                    <Skeleton className="size-6" />
                    <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-9 w-46" />
                <Skeleton className="h-4 w-18" />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
                <Skeleton className="flex-1 md:w-32 h-16.5 rounded-2xl" />
                <Skeleton className="flex-1 md:w-32 h-16.5 rounded-2xl" />
            </div>
        </div>
    );
}

export function WeatherBody({
    weather,
    error,
    isLoading,
}: {
    weather?: CurrentWeatherResponse;
    error: Error | null;
    isLoading: boolean;
}) {
    if (isLoading) {
        return <WeatherBodySkeleton />;
    }

    if (error) {
        return (
            <Alert variant="error">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
            </Alert>
        );
    }

    if (!weather) {
        return (
            <Empty className="p-0 md:p-0 gap-2">
                <EmptyHeader>
                    <EmptyMedia variant="icon" className="mb-0">
                        <Cloud />
                    </EmptyMedia>
                </EmptyHeader>
                <EmptyTitle>No weather data</EmptyTitle>
                <EmptyDescription>
                    Enter a city name to get started.
                </EmptyDescription>
            </Empty>
        );
    }

    return (
        <div className="flex flex-col md:flex-row gap-2 justify-between w-full items-start md:items-center">
            <div className="flex flex-col">
                <div className="flex gap-2">
                    <WeatherIcon iconId={weather.data.icon} />
                    <h2 className="font-semibold text-xl">
                        {capitalize(weather.city)}
                    </h2>
                </div>
                <span className="text-4xl font-bold flex gap-2 items-end leading-none">
                    {weather.data.temperature}°
                    {weather.unitGroup === "metric" ? "C" : "F"}
                    <p className="text-sm text-muted-foreground">
                        {capitalize(weather.data.description)}
                    </p>
                </span>
                <p className="text-muted-foreground text-xs">
                    As of {weather.data.timestamp}
                </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
                <StatCard
                    title="Wind Speed"
                    description={`${weather.data.windSpeed} ${
                        weather.unitGroup === "metric" ? "km/h" : "mph"
                    }`}
                />
                <StatCard
                    title="Humidity"
                    description={`${weather.data.humidity}%`}
                />
            </div>
        </div>
    );
}
