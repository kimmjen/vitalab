import { ForumTable } from "@/components/forum/ForumTable"

const discussionPosts = [
    {
        category: "Question",
        title: "How to install VitalDB?",
        name: "user123",
        views: 1234,
        date: "2024-02-15"
    },
    // ... 더 많은 게시물
]

export default function DiscussionPage() {
    return <ForumTable posts={discussionPosts} />
}