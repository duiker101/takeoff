import { createContext, Dispatch, PropsWithChildren } from "react";
import { AnyAction, useCRUD } from "../hooks";

export interface Bookmark {
	id: number;
	category_id: number;
	name: string;
	url: string;
	color: string;
}

type BookmarkCRUDAction = AnyAction<Bookmark>;

const BookmarkContext = createContext<{
	bookmarks: Bookmark[];
	dispatch: Dispatch<BookmarkCRUDAction>;
}>({
	bookmarks: [],
	dispatch: () => {},
});

export const BookmarkContextWrapper = ({ children }: PropsWithChildren<{}>) => {
	const [bookmarks, dispatch] = useCRUD<Bookmark>("bookmarks");

	return (
		<BookmarkContext.Provider
			value={{
				bookmarks,
				dispatch,
			}}
		>
			{children}
		</BookmarkContext.Provider>
	);
};

export default BookmarkContext;
