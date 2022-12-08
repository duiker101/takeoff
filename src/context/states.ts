import { proxy } from "valtio";

export interface BookmarkCategory {
	id: number;
	name: string;
	order: number;
}

export interface Bookmark {
	id: number;
	category_id: number;
	name: string;
	url: string;
	color: string;
	visits: number;
}

export interface BaseWidget {
	id: string;
}

export interface ScopioWidget extends BaseWidget{
	type: "scopio";
	name: string;
	url: string;
}

export type Widget = ScopioWidget;

const saved_bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
export const bookmarksState = proxy<{ bookmarks: Bookmark[] }>({ bookmarks: saved_bookmarks });

const saved_widgets = JSON.parse(localStorage.getItem("widgets") || "[]");
export const widgetsState = proxy<{ widgets: Widget[] }>({ widgets: saved_widgets });

const saved_categories = JSON.parse(localStorage.getItem("categories") || "[]");
export const categoriesState = proxy<{ categories: BookmarkCategory[] }>({
	categories: saved_categories,
});

export const uiState = proxy<{ editing: boolean }>({ editing: false });