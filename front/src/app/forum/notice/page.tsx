// src/app/forum/notice/page.tsx
import { ForumTable } from "@/components/forum/ForumTable"

const noticePosts = [
    {
        category: "Others",
        title: "VitalDB was introduced in the BJA journal.",
        name: "vitaldb2017",
        views: 6347,
        date: "2021-04-21"
    },
    {
        category: "Vital Recorder",
        title: "Drager Infinity patient monitor is now supported",
        name: "vitaldb2017",
        views: 3816,
        date: "2020-10-17"
    },
    {
        category: "Others",
        title: "MAIC 2020 (Medical AI Challenge 2020)",
        name: "vitaldb2017",
        views: 3932,
        date: "2020-09-04"
    },
    {
        category: "Vital Recorder",
        title: "Masimo's ROOT is supported",
        name: "Hyung-Chul",
        views: 4807,
        date: "2017-11-18",
        commentCount: 3
    },
    // ... 나머지 게시물
];

export default function NoticePage() {
    return <ForumTable posts={noticePosts} />
}