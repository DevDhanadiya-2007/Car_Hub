"use client"
import { Transition, Combobox } from "@headlessui/react"
import Image from "next/image"
import { Fragment, useState } from "react"
import { manufacturers } from "@/constants"
import { SearchManuFacturerProps } from '@/types'
import { relative } from "path"

const SearchManufacturer = ({ manufacturer, setManuFacturer }: SearchManuFacturerProps) => {
    const [query, setQuery] = useState('')
    const filteredManufacturers =
        query === ""
            ? manufacturers
            : manufacturers.filter((item) =>
                item
                    .toLowerCase()
                    .replace(/\s+/g, "")
                    .includes(query.toLowerCase().replace(/\s+/g, ""))
            );
    return (
        <div>
            <div className='search-manufacturer'>
                <Combobox>
                    <div className='w-full relative'>
                        <Combobox.Button className=' absolute top-[14px]' />
                        <Image
                            src='/car-logo.svg'
                            width={20}
                            height={20}
                            className='ml-4'
                            alt='car logo'
                        />
                        <Combobox.Input className='search-manufacturer__input'
                            displayValue={(manufacturer: string) => manufacturer}
                            placeholder="Volkswagen"
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <Transition
                            as={Fragment} // group multiple elements without introducing an additional DOM node i.e., <></>
                            leave='transition ease-in duration-100'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                            afterLeave={() => setQuery("")}>
                            <Combobox.Options>
                                {filteredManufacturers.length === 0 && query !== "" ? (
                                    <Combobox.Option className='' value={query}>
                                        Create "{query}"
                                    </Combobox.Option>) : (
                                    filteredManufacturers.map((item) => (
                                        <Combobox.Option
                                            key={item}
                                            className={({ active }) =>
                                                `relative search-manufacturer__option ${active ? "bg-primary-blue text-white" : "text-gray-900"
                                                }`
                                            }
                                            value={item}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                                        {item}
                                                    </span>

                                                    {/* Show an active blue background color if the option is selected */}
                                                    {selected ? (
                                                        <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-pribg-primary-purple"}`}
                                                        ></span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Combobox.Option>
                                    )))
                                }
                            </Combobox.Options>
                        </Transition>
                    </div>
                </Combobox>
            </div>
        </div>
    )
}

export default SearchManufacturer
