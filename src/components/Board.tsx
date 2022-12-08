import React, { useMemo } from "react";
import { useSnapshot } from "valtio";
import { BookmarkCategory, categoriesState, widgetsState } from "../context/states";
import CategoryView from "./CategoryView";
import { ScopioWidgetView } from "../widgets/ScopioWidgetView";

export interface BoardProps {}

const Board: React.FC<BoardProps> = (props) => {
	const { categories } = useSnapshot(categoriesState);
	const { widgets } = useSnapshot(widgetsState);

	const sorted = useMemo(() => {
		return [...categories].sort(
			(a: BookmarkCategory, b: BookmarkCategory) => a.order - b.order
		) as BookmarkCategory[];
	}, [categories]);

	return (
		<div className={"w-full "}>
			<div className={"flex mb-4 gap-2"}>
				{widgets.map((w) => {
					if (w.type === "scopio") return <ScopioWidgetView key={w.id} widget={w} />;
					return null;
				})}
			</div>
			<div className={"w-full grid grid-cols-3 gap-8"}>
				{sorted.map((category) => (
					<CategoryView key={category.id} category={category} />
				))}
			</div>
		</div>
	);
};

export { Board };
