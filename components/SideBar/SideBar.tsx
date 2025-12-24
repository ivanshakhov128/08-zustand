"use client";

import Link from "next/link";
import css from "./Sidebar.module.css";

const tags = ["Work", "Personal", "Important", "Todo"];

export default function SidebarNotes() {
  return (
    <aside className={css.sidebar}>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href="/notes/filter/all" className={css.menuLink}>
            All notes
          </Link>
        </li>
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
