import Link from "next/link"
import getFormattedDate from "@/lib/getFormattedDate"

type Props = {
    post: Articles
}

export default function ListItem({ post }: Props) {
    const { title, description, author, publishedAt } = post
    const formattedDate = getFormattedDate(publishedAt)

    return (
        <li className="mt-4 text-2xl dark:text-white/90">
            <Link className="underline hover:text-black/70 dark:hover:text-white" href={`/posts/${title}`}>{title}</Link>
            <br />
            <p className="text-sm mt-1">{description}</p>
            
            <div className="flex flex-col items-end">
                <p className="text-sm mt-1">{author}</p>
                <p className="text-sm mt-1">{formattedDate}</p>
            </div>
        </li>
    )
}