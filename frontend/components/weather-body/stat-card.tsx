import {
    Card,
    CardDescription,
    CardPanel,
    CardTitle,
} from "@/components/ui/card";

export function StatCard({
    title,
    description,
    icon,
}: {
    title: string;
    description: string;
    icon?: React.ReactNode;
}) {
    return (
        <Card className="flex-1 md:flex gap-0 p-2 h-fit w-32 items-center">
            {icon}
            <CardTitle className="text-sm font-medium text-muted-foreground w-fit">
                {title}
            </CardTitle>
            <CardPanel className="px-0">
                <CardDescription className="text-foreground text-lg font-bold">
                    {description}
                </CardDescription>
            </CardPanel>
        </Card>
    );
}
