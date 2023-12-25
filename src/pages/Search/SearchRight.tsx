import { FC, MouseEvent, useState } from "react";

interface Rows{
	label: string;
	checked: string;
}
interface FilterRow extends Rows {
	name: string;
	check: string;
}
interface SearchRightProps {
	rangeValue: number;
	setRangeValue: (value: number) => void;
	handlePriceRangeChange: (value: number) => void;
	handlePriceRowClick: (row: FilterRow) => void;
	handleTagRowClick: (row: FilterRow) => void;
	handleTagExcludeClick: (e: MouseEvent<HTMLDivElement>, row: FilterRow) => void;
	handleOSRowClick:  (row: FilterRow) => void;
	getPriceRangeLabel: (value: number) => string;
	priceFilterRows: Rows[],
	tagFilterRows: Rows[],
	OSFilterRows: Rows[],
	isViewport960: boolean,
}
export const SearchRight: FC<SearchRightProps> = ({
	rangeValue,
	setRangeValue,
	handlePriceRangeChange,
	handlePriceRowClick,
	handleTagRowClick,
	handleTagExcludeClick,
	handleOSRowClick,
	getPriceRangeLabel,
	priceFilterRows,
	tagFilterRows,
	OSFilterRows,
	isViewport960,
}) => {
	const [isShown, setIsShown] = useState(false);
	const rightCol = (
		<div className="search-rightcol">
			<div className="filter-block">
				<div className="filter-header">
					<div>Narrow by Price</div>
				</div>
				<div className="filter-content">
					<div className="range-container">
						<div className="range-inner">
							<input
								className="range-input"
								type="range"
								step={1}
								min={0}
								max={13}
								onChange={(e) => setRangeValue(Number(e.target.value))}
								onMouseUp={(e) => {
									handlePriceRangeChange(
										Number((e.target as HTMLInputElement).value)
									);
								}}
							/>
						</div>
						<div className="range-display">
							{getPriceRangeLabel(rangeValue)}
						</div>
					</div>
					<div className="block-rule" />
					{priceFilterRows.map((row) => (
						<div
							key={row.label}
							className={`filter-control-row ${
								row.checked === "checked" ? "checked" : ""
							}`}
							onClick={() =>
								handlePriceRowClick({
									label: row.label,
									name: "",
									check: "",
									checked: "",
								})
							}
						>
							<span className="filter-tab">
								<span>
									<span className="tab-checkbox" />
									<span className="tab-label">{row.label}</span>
								</span>
							</span>
						</div>
					))}
				</div>
			</div>
			<div className="filter-block">
				<div className="filter-header">
					<div>Narrow by tag</div>
				</div>
				<div className="filter-content">
					{tagFilterRows
						.filter((row) => row.checked === "checked")
						.map((row) => (
							<div
								key={row.label}
								className="filter-control-row checked"
								onClick={() =>
									handleTagRowClick({
										label: row.label,
										name: "",
										check: "",
										checked: "",
									})
								}
							>
								<span className="filter-tab">
									<span>
										<span className="tab-checkbox" />
										<span className="tab-label">{row.label}</span>
										<span className="tab-count" style={{ display: "none" }}>
											{/* TODO: results count here */}
										</span>
									</span>
								</span>
								<span className="tab-exclude">
									<img
										src="/images/search_checkbox_not.svg"
										alt="exclude"
										onClick={(e) =>
											handleTagExcludeClick(e, {
												label: row.label,
												name: "",
												check: "",
												checked: "",
											})
										}
									/>
								</span>
							</div>
						))}
					{tagFilterRows
						.filter((row) => row.checked === "excluded")
						.map((row) => (
							<div
								key={row.label}
								className="filter-control-row excluded"
								onClick={() =>
									handleTagRowClick({
										label: row.label,
										name: "",
										check: "",
										checked: "",
									})
								}
							>
								<span className="filter-tab">
									<span>
										<span className="tab-checkbox" />
										<span className="tab-label">{row.label}</span>
										<span className="tab-count" style={{ display: "none" }}>
											{/* TODO: results count here */}
										</span>
									</span>
								</span>
								<span className="tab-exclude">
									<img
										src="/images/search_checkbox_not.svg"
										alt="exclude"
										onClick={(e) =>
											handleTagExcludeClick(e, {
												label: row.label,
												name: "",
												check: "",
												checked: "",
											})
										}
									/>
								</span>
							</div>
						))}
					{tagFilterRows
						.filter(
							(row) => row.checked !== "excluded" && row.checked !== "checked"
						)
						.map((row) => (
							<div
								key={row.label}
								className="filter-control-row"
								onClick={() =>
									handleTagRowClick({
										label: row.label,
										name: "",
										check: "",
										checked: "",
									})
								}
							>
								<span className="filter-tab">
									<span>
										<span className="tab-checkbox" />
										<span className="tab-label">{row.label}</span>
										<span className="tab-count" style={{ display: "none" }}>
											{/* TODO: results count here */}
										</span>
									</span>
								</span>
								<span className="tab-exclude">
									<img
										src="/images/search_checkbox_not.svg"
										alt="exclude"
										onClick={(e) =>
											handleTagExcludeClick(e, {
												label: row.label,
												name: "",
												check: "",
												checked: "",
											})
										}
									/>
								</span>
							</div>
						))}
				</div>
			</div>
			<div className="filter-block">
				<div className="filter-header">
					<div>Narrow by OS</div>
				</div>
				<div className="filter-content">
					{OSFilterRows.map((row) => (
						<div
							key={row.label}
							className={`filter-control-row ${
								row.checked === "checked" ? "checked" : ""
							}`}
							onClick={() =>
								handleOSRowClick({
									label: row.label,
									name: "",
									check: "",
									checked: "",
								})
							}
						>
							<span className="filter-tab">
								<span>
									<span className="tab-checkbox" />
									<span className="tab-label">{row.label}</span>
								</span>
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
	return (
		!isViewport960 ? (
			rightCol
		) : (
			<>
			<div className="open-filters" onClick={() => setIsShown(true)}/>
			{isShown && <div className="overlay show" onClick={() => setIsShown(false)}/>}
				<div className={`s-slide-menu ${isShown ? "shown" : ""}`}>
					<div className="right-col-wrapper">
						{rightCol}
					</div>
				</div>
			</>
		)
	);
};
