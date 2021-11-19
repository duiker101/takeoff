import { createContext, Dispatch, PropsWithChildren, useContext } from "react";
import { AnyAction, useCRUD } from "../hooks";
import BookmarkContext, { Bookmark } from "./BookmarkContext";

export interface BookmarkCategory {
	id: number;
	name: string;
	order: number;
}

type CategoryCRUDAction = AnyAction<BookmarkCategory>;

const CategoryContext = createContext<{
	categories: BookmarkCategory[];
	dispatch: Dispatch<CategoryCRUDAction>;
}>({
	categories: [],
	dispatch: () => {},
});

export const CategoryContextWrapper = ({ children }: PropsWithChildren<{}>) => {
	const [categories, dispatch] = useCRUD<BookmarkCategory>("categories");

	return (
		<CategoryContext.Provider
			value={{
				categories,
				dispatch,
			}}
		>
			{children}
		</CategoryContext.Provider>
	);
};

export default CategoryContext;

export const useBookmarksForCategory = (categoryId: number) => {
	const { bookmarks } = useContext(BookmarkContext);
	return bookmarks.filter((b) => b.category_id === categoryId);
};
