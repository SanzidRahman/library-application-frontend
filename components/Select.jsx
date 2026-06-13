import React, { useState, useEffect, useRef } from "react";
import { Check, ChevronDown, X } from "lucide-react";

export default function Select({
    options = [],
    selected,
    setSelected,
    placeholder = "Select option",
    isMulti = false,
}) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);

    const handleSelect = (option) => {
        if (isMulti) {
            if (selected.includes(option.value)) {
                setSelected(
                    selected.filter((item) => item !== option.value)
                );
            } else {
                setSelected([...selected, option.value]);
            }
        } else {
            setSelected(option.value);
            setOpen(false);
        }
    };

    const handleRemove = (value) => {
        setSelected(selected.filter((item) => item !== value));
    };

    const handleClearAll = (e) => {
        e.stopPropagation();
        setSelected(isMulti ? [] : null);
    };

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
    );

    const isSelected = (value) => {
        return isMulti
            ? selected?.includes(value)
            : selected === value;
    };

    return (
        <div
            className="relative w-full"
            ref={dropdownRef}
        >
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex min-h-10 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-left shadow-sm hover:border-gray-400"
            >
                <div className="flex flex-wrap gap-2">
                    {isMulti ? (
                        selected?.length > 0 ? (
                            selected.map((value) => {
                                const option = options.find(
                                    (o) => o.value === value
                                );

                                return (
                                    <span
                                        key={value}
                                        className="flex items-center gap-1 rounded-md bg-blue-100 px-2 py-1 text-sm text-blue-700"
                                    >
                                        {option?.label}

                                        <X
                                            size={14}
                                            className="cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemove(value);
                                            }}
                                        />
                                    </span>
                                );
                            })
                        ) : (
                            <span className="text-gray-500">
                                {placeholder}
                            </span>
                        )
                    ) : (
                        <span className={
                            selected
                                ? "text-green-900 font-medium"
                                : "text-gray-500"
                        }>
                            {options.find(
                                (o) => o.value === selected
                            )?.label || (
                                    <span className="text-gray-500">
                                        {placeholder}
                                    </span>
                                )}
                        </span>
                    )}
                </div>

                <div className="ml-2 flex items-center  gap-2">
                    {(isMulti
                        ? selected?.length > 0
                        : selected) && (
                            <X
                                size={16}
                                className="text-gray-500"
                                onClick={handleClearAll}
                            />
                        )}

                    <ChevronDown
                        size={18}
                        className={`transition-transform ${open ? "rotate-180" : ""
                            }`}
                    />
                </div>
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute z-50 mt-2 w-full rounded-lg border bg-slate-500 shadow-lg">
                    {/* Search */}
                    <div className="border-b p-2">
                        <input
                            type="text"
                            placeholder="Search options..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Options */}
                    <div className="max-h-60 overflow-y-auto">
                        {filteredOptions.length === 0 ? (
                            <p className="p-3 text-sm text-gray-500">
                                No options found.
                            </p>
                        ) : (
                            filteredOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() =>
                                        handleSelect(option)
                                    }
                                    className={`flex w-full items-center justify-between px-3 py-2 text-left hover:bg-slate-900/40 ${isSelected(option.value)
                                        ? "bg-red-100 text-red-900"
                                        : ""
                                        }`}
                                >
                                    <span>{option.label}</span>

                                    {isSelected(option.value) && (
                                        <Check
                                            size={16}
                                            className="text-green-600"
                                        />
                                    )}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}