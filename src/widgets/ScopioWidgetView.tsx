import React, { useEffect, useState } from "react";
import { ScopioWidget } from "../context/states";

export interface ScopioWidgetProps {
	widget: ScopioWidget;
}

const ScopioWidgetView: React.FC<ScopioWidgetProps> = (props) => {
	const [data, setData] = useState<{
		memory: number;
		cpu: number;
		disk: number;
		temp: number | null;
	} | null>(null);
	useEffect(() => {
		async function load() {
			const res = await fetch(props.widget.url, {
				headers: {
					key: "RoXQL5b&ePu6F&ADK38MtP&!BGKVU!6Sww",
				},
				mode: "cors",
			});

			setData(await res.json());
		}

		load();
	}, [props.widget.url]);

	return (
		<div className={"p-2 opacity-40 rounded flex gap-1 text-white"}>
			<div>{props.widget.name}</div>
			<div className={"flex items-center gap-2"}>
				<ColorDot name={"CPU"} value={data?.cpu} />
				<ColorDot name={"RAM"} value={data?.memory} />
				<ColorDot name={"DISK"} value={data?.disk} />
				<ColorDot name={"TEMP"} value={data?.temp} />
			</div>
		</div>
	);
};

const ColorDot: React.FC<{ name: string; value: number | undefined | null }> = ({
	name,
	value,
}) => {
	const color =
		!!value || value === 0
			? value > 80
				? "#ff0000"
				: value > 50
				? "#a58500"
				: "#148d20"
			: "gray";
	return (
		<div
			title={`${name}: ${value}`}
			className={"rounded-full w-2 h-2"}
			style={{ backgroundColor: color }}
		></div>
	);
};

export { ScopioWidgetView };
