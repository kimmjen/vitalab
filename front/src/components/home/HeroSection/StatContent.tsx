// src/components/home/HeroSection/StatContent.tsx
interface StatContentProps {
    data: {
        researcherCount?: number;
        bedCount?: number;
        monitoringBeds?: number;
        totalCases?: number;
    }
}

export function StatContent({ data }: StatContentProps) {
    if (data.researcherCount && data.bedCount) {
        return (
            <>
                <span className="font-medium">{data.researcherCount.toLocaleString()}</span> researchers are using VitalRecorders on{' '}
                <span className="font-medium">{data.bedCount.toLocaleString()}</span> beds.
            </>
        );
    }

    if (data.monitoringBeds) {
        return (
            <>
                Web monitorings are active on{' '}
                <span className="text-red-500 font-medium">{data.monitoringBeds.toLocaleString()}</span> Beds.
            </>
        );
    }

    if (data.totalCases) {
        return (
            <>
                A total of{' '}
                <span className="text-blue-500 font-medium">{data.totalCases.toLocaleString()}</span>{' '}
                cases have been recorded.
            </>
        );
    }

    return null;
}