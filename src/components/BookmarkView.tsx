import React from "react";
import { Bookmark } from "../context/states";

export interface BookmarkProps {
	bookmark: Bookmark;
}

const BookmarkView: React.FC<BookmarkProps> = ({ bookmark }) => {
	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		window.location.href = bookmark.url;
	};

	return (
		<button
			onClick={handleClick}
			className={"p-1 px-2 rounded flex items-center hover:bg-slate-600 text-gray-300 w-full"}
		>
			<div className={"mr-2 favColor"} style={{ backgroundColor: bookmark.color }} />
			<div className={"flex-1 text-left"}>{bookmark.name}</div>
		</button>
	);
};

export { BookmarkView };
