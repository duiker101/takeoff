import React from "react";
import {Bookmark} from "../context/states";

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
		<a
			onClick={handleClick}
			href={"#"}
			className={"p-1 px-2 rounded flex items-center hover:bg-gray-800 text-gray-300"}
		>
			<div className={"mr-2 favColor"} style={{ backgroundColor: bookmark.color }} />
			<div className={"flex-1"}>{bookmark.name}</div>
		</a>
	);
};

export { BookmarkView };
