import React, { useContext, useState } from "react";
import { BookmarkView } from "./BookmarkView";
import EditContext from "../context/EditContext";
import { AddBookmarkView } from "./AddBookmarkView";
import { BookmarkCategory, useBookmarksForCategory } from "../context/CategoryContext";
import { EditCategoryForm } from "./EditCategoryForm";
import { ReactComponent as Pencil } from "../icons/pen.svg";
import Tippy from "@tippyjs/react";

export interface Props {
	category: BookmarkCategory;
}

function getBaseUrl(url: string) {
	const urlParts = url.replace("http://", "").replace("https://", "").split(/[/?#]/);
	return urlParts[0];
}

function getFavicon(url: string) {
	return "https://www.google.com/s2/favicons?domain=" + getBaseUrl(url);
}

const CategoryView = ({ category }: Props) => {
	const [open, setOpen] = useState(false);
	const { isEditing, setIsEditing } = useContext(EditContext);
	const bookmarks = useBookmarksForCategory(category.id);

	return (
		<div className={"bg-gray-700 category rounded p-4"}>
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
				content={
					// this open here unmounts the component to clear the fields
					open && <EditCategoryForm category={category} onClose={() => setOpen(false)} />
				}
				visible={open}
				onClickOutside={() => setOpen(false)}
			>
				<div className={"flex justify-between"}>
					<h4 className={"my-0 mb-2  text-2xl text-gray-200 font-semibold"}>
						{category.name}
					</h4>
					{isEditing && (
						<Pencil
							width={20}
							className={"cursor-pointer text-gray-400 opacity-50 hover:opacity-90"}
							onClick={() => {
								isEditing && setOpen(true);
							}}
						/>
					)}
				</div>
			</Tippy>
			{bookmarks.map((link) => (
				<BookmarkView bookmark={link} key={link.id} />
			))}
			{isEditing && <AddBookmarkView category_id={category.id} />}
		</div>
	);
};

export default CategoryView;
