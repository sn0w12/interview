import {
    Cloud,
    CloudFog,
    CloudMoon,
    CloudRain,
    CloudSnow,
    CloudSun,
    Moon,
    Sun,
    Wind,
} from "lucide-react";

interface WeatherIconProps {
    iconId: string;
}

export function WeatherIcon({ iconId }: WeatherIconProps) {
    switch (iconId) {
        case "snow":
            return <CloudSnow />;
        case "rain":
            return <CloudRain />;
        case "fog":
            return <CloudFog />;
        case "wind":
            return <Wind />;
        case "cloudy":
            return <Cloud />;
        case "partly-cloudy-day":
            return <CloudSun />;
        case "partly-cloudy-night":
            return <CloudMoon />;
        case "clear-day":
            return <Sun />;
        case "clear-night":
            return <Moon />;
        default:
            return <Cloud />; // Fallback to cloudy
    }
}
