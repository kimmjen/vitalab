// src/lib/constants/home.ts
export const STATS = [
    {
        id: 1,
        content: {
            researcherCount: 2712,
            bedCount: 732
        }
    },
    {
        id: 2,
        content: {
            monitoringBeds: 749
        }
    },
    {
        id: 3,
        content: {
            totalCases: 5446096
        }
    }
];

export const NOTICES = [
    { text: "VitalDB was introduced in the BJA journal." },
    { text: "Drager Infinity patient monitor is now supported" },
    { text: "MAIC 2020 (Medical AI Challenge 2020)" },
    { text: "Masimo's ROOT is supported", count: 3 },
    { text: "We are testing VitalConnect.", count: 3 }
];

export const DISCUSSIONS = [
    { text: "Anesthesia and ICU charting using Vital Record..." },
    { text: "Incomlete data from pivr Datex-Ohmeda" },
    { text: "Does vital recorder have a way to identify patie..." },
    { text: "Obtain data from Arcomed Pumps", count: 2 },
    { text: "Data from GE monitors", count: 1 }
];

export const VITAL_RECORDER_VERSION = {
    os: [
        { label: "Windows", value: "windows" }
    ],
    version: [
        { label: "1.15.1", value: "1.15.1" }
    ],
    downloadCount: 161381,
    lastUpdate: "Feb 2017"
};