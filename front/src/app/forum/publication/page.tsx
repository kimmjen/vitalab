const publications = [
    {
        title: "VitalDB, a high-fidelity multi-parameter vital signs database in surgical patients",
        authors: "Lee, H.C., Jung, C.W.",
        journal: "Scientific Data",
        year: 2022,
        doi: "10.1038/s41597-022-01211-x"
    },
    // ... 더 많은 출판물
]

export default function PublicationPage() {
    return (
        <div className="space-y-6">
            {publications.map((pub, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium mb-2">{pub.title}</h3>
                    <p className="text-gray-600">{pub.authors}</p>
                    <p className="text-gray-500">{pub.journal}, {pub.year}</p>
                    <p className="text-blue-500">DOI: {pub.doi}</p>
                </div>
            ))}
        </div>
    )
}