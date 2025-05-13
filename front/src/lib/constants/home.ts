// src/lib/constants/home.ts
export const STATS = [
    {
        id: 1,
        content: {
            researcherCount: 2129,
            bedCount: 577
        }
    },
    {
        id: 2,
        content: {
            monitoringBeds: 577
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
        { label: "Windows", value: "windows" },
        { label: "Raspberry Pi 32bit", value: "raspberry-32" },
        { label: "Raspberry Pi 64bit", value: "raspberry-64" },
        { label: "Ubuntu", value: "ubuntu" }
    ],
    version: [
        { label: "1.15.5", value: "1.15.5", notes: "Bug Fixed: saving the raw data" },
        { label: "1.15.4", value: "1.15.4", notes: "Added: Recording alarms from Philips monitor" },
        { label: "1.15.3", value: "1.15.3", notes: "Bug fixed: saving the raw data" },
        { label: "1.15.2", value: "1.15.2", notes: "Fixed: bug in opening file" },
        { label: "1.15.1", value: "1.15.1", notes: "Supporting for Fresenius Kabi Conox, Minor Bug fixes" }
    ],
    downloadCount: 164375,
    lastUpdate: "Feb 2017",
    citation: "Lee HC, Jung CW. VitalRecorder-a free research tool for automatic recording of high-resolution time-synchronised physiological data from multiple anaesthesia devices. Sci Rep. 2018 Jan 24;8(1):1527. doi: 10.1038/s41598-018-20062-4.",
    citationLink: "https://www.nature.com/articles/s41598-018-20062-4"
};

export const SUPPORTED_DEVICES = [
    "GE® (Solar 8000®, Dash, Bx50®)",
    "Philips® (Intellivue®)",
    "Drager® (Infinity®)",
    "Nihon Kohden® (PSM®, Primus®)",
    "Maquet® (Flow-i®, Servo-i®) ventilators",
    "Fresenius Kabi® (Orchestra®, Agilia®, and Link+®)",
    "BBraun® syringe pumps",
    "Medtronic® BIS®",
    "Masimo® Root®",
    "DataQ® ADCs"
];