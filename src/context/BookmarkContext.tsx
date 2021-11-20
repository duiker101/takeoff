import { createContext, Dispatch, PropsWithChildren } from "react";
import { AnyAction, useCRUD } from "../hooks";

export interface Bookmark {
	id: number;
	category_id: number;
	name: string;
	url: string;
	color: string;
	visits: number;
}

type BookmarkCRUDAction = AnyAction<Bookmark>;

const BookmarkContext = createContext<{
	bookmarks: Bookmark[];
	dispatch: Dispatch<BookmarkCRUDAction>;
	visit: (bookmark: Bookmark) => void;
}>({
	bookmarks: [],
	dispatch: () => {},
	visit: (bookmark: Bookmark) => {},
});

export const BookmarkContextWrapper = ({ children }: PropsWithChildren<{}>) => {
	const [bookmarks, dispatch] = useCRUD<Bookmark>("bookmarks");

	const visit = (bookmark: Bookmark) => {
		bookmark.visits = (bookmark.visits || 0) + 1;
		dispatch({ type: "UPDATE", data: bookmark });
		window.location.href = bookmark.url;
	};

	return (
		<BookmarkContext.Provider
			value={{
				bookmarks,
				dispatch,
				visit,
			}}
		>
			{children}
		</BookmarkContext.Provider>
	);
};

export default BookmarkContext;
