import React from "react";
import { BookmarkView } from "./BookmarkView";
import { BookmarkCategory, bookmarksState } from "../context/states";
import { useSnapshot } from "valtio";

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

export const useBookmarksForCategory = (categoryId: number) => {
	const { bookmarks } = useSnapshot(bookmarksState);
	return bookmarks.filter((b) => b.category_id === categoryId);
};

const CategoryView = ({ category }: Props) => {
	const bookmarks = useBookmarksForCategory(category.id);

	return (
		<div className={"bg-gray-700 category rounded p-4"}>
			<div className={"flex justify-between"}>
				<h4 className={"my-0 mb-2  text-2xl text-gray-200 font-semibold"}>
					{category.name}
				</h4>
			</div>
			{bookmarks.map((link) => (
				<BookmarkView bookmark={link} key={link.id} />
			))}
		</div>
	);
};

export default CategoryView;
