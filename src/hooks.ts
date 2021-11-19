import { useReducer } from "react";
import { BookmarkCategory } from "./context/CategoryContext";

interface SetAllAction<T> {
	type: "SET_ALL";
	data: T[];
}

interface AddAction<T> {
	type: "ADD";
	data: Omit<T, "id">;
	// data: T;
}

interface UpdateAction<T> {
	type: "UPDATE";
	data: T;
}

interface DeleteAction<T> {
	type: "DELETE";
	data: { id: number };
}

interface ClearAction<T> {
	type: "CLEAR";
}

export type AnyAction<T> =
	| AddAction<T>
	| SetAllAction<T>
	| UpdateAction<T>
	| DeleteAction<T>
	| ClearAction<T>;

function useCRUD<T extends { id: number }>(key: "bookmarks" | "categories") {
	const initialState = JSON.parse(localStorage.getItem(key) || "[]");
	return useReducer((state: T[], action: AnyAction<T>) => {
		switch (action.type) {
			case "SET_ALL":
				state = [...action.data];
				break;
			case "ADD":
				const newId = Math.max(...state.map((v) => v.id)) + 1 || 1;
				const newData = { ...action.data, id: newId } as T;
				state = [...state, newData];
				break;
			case "DELETE":
				state = [...state.filter((v) => v.id !== action.data.id)];
				break;
			case "UPDATE":
				state = [...state.map((v) => (v.id === action.data.id ? action.data : v))];
				break;
			case "CLEAR":
				state = [];
				break;
		}
		localStorage.setItem(key, JSON.stringify(state));
		return state;
	}, initialState);
}

export { useCRUD };
