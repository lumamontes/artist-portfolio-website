import Link from "next/link";

export default function RightMenuLinkSlice({slice}) {

    return (
        <Link href={slice.primary.external_link.url} key={slice.id} legacyBehavior>
          <a
            className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500"
            target="_blank"
            rel={"noopener"}
          >
            <span> {slice.primary.title[0].text}</span>
            {slice.primary.badge && (
              <span className="bg-blue-100 text-blue-600 text-xs font-semibold ml-2 px-2 py-0.5 rounded dark:bg-cyan-200 dark:text-blue-800 ">
                {item.badge}
              </span>
            )}
          </a>
        </Link>
    );
}