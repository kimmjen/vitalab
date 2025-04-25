// src/components/web-api/TableOfContents.tsx
export function TableOfContents() {
    return (
        <div className="border rounded p-4 bg-white">
            <h3 className="text-lg font-medium mb-4">Table of Contents</h3>
            <div className="space-y-3">
                <div className="font-medium">VitalDB Web API for Open Dataset</div>
                <div className="pl-4 space-y-2 text-sm">
                    <div className="cursor-pointer hover:text-blue-500">Introduction</div>
                    <div className="cursor-pointer hover:text-blue-500">Clinical information</div>
                    <div className="cursor-pointer hover:text-blue-500">Track list</div>
                    <div className="cursor-pointer hover:text-blue-500">Track data</div>
                    <div className="cursor-pointer hover:text-blue-500">Laboratory results</div>
                </div>
            </div>
        </div>
    )
}