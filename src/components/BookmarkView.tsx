import Tippy from "@tippyjs/react";
import React, { useContext, useState } from "react";
import BookmarkContext, { Bookmark } from "../context/BookmarkContext";
import EditContext from "../context/EditContext";
import { EditBookmarkForm } from "./EditBookmarkForm";

export interface BookmarkProps {
	bookmark: Bookmark;
}

const BookmarkView: React.FC<BookmarkProps> = ({ bookmark }) => {
	const { isEditing, setIsEditing } = useContext(EditContext);
	const { visit } = useContext(BookmarkContext);
	const [open, setOpen] = useState(false);

	const handleClick = (e: React.MouseEvent) => {
		if (isEditing) {
			e.stopPropagation();
			e.preventDefault();
			setOpen(true);
			return;
		}
		visit(bookmark);
	};

	return (
		<Tippy
			interactive={true}
			popperOptions={{
				modifiers: [
					{
						name: "arrow",
						options: {
							enabled: false,
						},
					},
				],
			}}
			content={<EditBookmarkForm bookmark={bookmark} onClose={() => setOpen(false)} />}
			visible={open}
			onClickOutside={() => setOpen(false)}
		>
			<a
				onClick={handleClick}
				href={"#"}
				className={"p-1 px-2 rounded flex items-center hover:bg-gray-800 text-gray-300"}
			>
				<div className={"mr-2 favColor"} style={{ backgroundColor: bookmark.color }} />
				<div className={"flex-1"}>{bookmark.name}</div>
				{isEditing && <div>[{bookmark.visits}]</div>}
			</a>
		</Tippy>
	);
};

export { BookmarkView };
