import { FC, MouseEvent, useEffect, useRef, useState, ChangeEvent } from "react";

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
	// Mobile filters menu state
	const [isShown, setIsShown] = useState(false);

	const [isPriceDropdownOpened, setIsPriceDropdownOpened] = useState(false);
	const [isTagDropdownOpened, setIsTagDropdownOpened] = useState(false);
	const [isOSDropdownOpened, setIsOSDropdownOpened] = useState(false);
	const [priceDropdownHeight, setPriceDropdownHeight] = useState(0);
	const [tagDropdownHeight, setTagDropdownHeight] = useState(0);
	const [OSDropdownHeight, setOSDropdownHeight] = useState(0);
	
	const [tagSearchValue, setTagSearchValue] = useState('');
	const [isTagFocused, setIsTagFocused] = useState(false);

	const priceDropdown = useRef<HTMLDivElement | null>(null);
	const tagDropdown = useRef<HTMLDivElement | null>(null);
	const filteredTags = useRef<HTMLDivElement | null>(null);
	const OSDropdown = useRef<HTMLDivElement | null>(null);

	// Add the dropdowns you want to be openend as default here
	useEffect(() => {
		setIsPriceDropdownOpened(true);
		setIsTagDropdownOpened(true);
	}, []);

	// Handle the expanding of the price dropdown
	useEffect(() => {
		setPriceDropdownHeight(priceDropdown.current?.scrollHeight ?? 0);
	}, [isPriceDropdownOpened]);

	// Handle the expanding of the tag dropdown
	useEffect(() => {
		setTagDropdownHeight(tagDropdown.current?.scrollHeight ?? 0);
	}, [isTagDropdownOpened]);

	// Handle the expanding of the OS dropdown
	useEffect(() => {
		setOSDropdownHeight(OSDropdown.current?.scrollHeight ?? 0);
	}, [isOSDropdownOpened]);

	const handleTagSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setTagSearchValue(e.target.value.toLowerCase());
		setTimeout(() => {
			// Set the height depending on how many children inside
			setTimeout(() => {
				if (filteredTags.current) {
					const heights: {[key: number]: number} = {0: 40, 1: 70, 2: 100, 3: 130, 4: 160};
					const childNodesLength = filteredTags.current.childNodes.length;
					const height = heights[childNodesLength] || 200;
					setTagDropdownHeight(height);
				}
			});
		});
	}
	const handleTagFocus = () => {
		setIsTagFocused(true);
	};
	
	const handleTagBlur = () => {
		setIsTagFocused(false);
	};

	const rightCol = (
		<div className="search-rightcol">
			<div className="filter-block">
				<div className="filter-header" onClick={() => setIsPriceDropdownOpened(!isPriceDropdownOpened)}>
					<div>Narrow by Price</div>
				</div>
				<div className={`filter-content ${!isPriceDropdownOpened ? "closed" : ""}`} style={{ 
					height: isPriceDropdownOpened ? `${priceDropdownHeight}px` : "0px"
				}} ref={priceDropdown}>
					<div className="range-container">
						<div className="range-inner">
							<input
								className="range-input"
								type="range"
								step={1}
								min={0}
								max={13}
								defaultValue={rangeValue}
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
				<div className="filter-header" onClick={() => setIsTagDropdownOpened(!isTagDropdownOpened)}>
					<div>Narrow by tag</div>
				</div>
				<div className={`filter-content ${!isTagDropdownOpened ? "closed" : ""}`} style={{ 
					height: isTagDropdownOpened ? `${tagDropdownHeight}px` : "0px", maxHeight: "190px"
				}} ref={tagDropdown}>
					<div style={{maxHeight: "150px", overflow: "hidden"}} ref={filteredTags}>
						{tagFilterRows
							.filter((row) => 
								row.checked === "checked" && 
								row.label.toLowerCase().includes(tagSearchValue)
							)
							.map((row) => (
							<div
								key={`checkedTag-${row.label}`}
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
							.filter((row) => 
								row.checked === "excluded" && 
								row.label.toLowerCase().includes(tagSearchValue)
							)
							.map((row) => (
							<div
								key={`exludedTag-${row.label}`}
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
							.filter((row) => (
								row.checked !== "excluded" && row.checked !== "checked") &&
								row.label.toLowerCase().includes(tagSearchValue)
							)
							.map((row) => (
							<div
								key={`tag${row.label}`}
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
					<input 
						className="search-filter"
						type="text"
						onFocus={handleTagFocus}
						onBlur={handleTagBlur}
						placeholder={isTagFocused ? '' : "search for more tags"}
						value={tagSearchValue}
						onChange={handleTagSearch}
					/>
				</div>
			</div>
			<div className="filter-block">
				<div className="filter-header" onClick={() => setIsOSDropdownOpened(!isOSDropdownOpened)}>
					<div>Narrow by OS</div>
				</div>
				<div className={`filter-content ${!isOSDropdownOpened ? "closed" : ""}`} style={{ 
					height: isOSDropdownOpened ? `${OSDropdownHeight}px` : "0px"
				}} ref={OSDropdown}>
					{OSFilterRows.map((row) => (
						<div
							key={`os-${row.label}`}
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
