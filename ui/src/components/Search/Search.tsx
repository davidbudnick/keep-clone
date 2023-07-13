'use client';
import React from 'react';
import { useForm, Resolver } from "react-hook-form";
import { useRouter } from 'next/navigation';

const Search: React.FC = () => {
    type SearchValues = {
        query: string
    }

    const resolver: Resolver<SearchValues> = async (values) => {
        return {
            values: values.query ? values : {},
            errors: !values.query
                ? {
                    query: {
                        type: "required",
                        message: "This is required.",
                    },
                }
                : {},
        }
    }

    const router = useRouter()

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<SearchValues>({ resolver })
    const onSubmit = handleSubmit((data) => {
        router.push(`?search?${data.query}`)
        reset()
    })

    return (
        <form className="ml-5 hidden lg:block" onSubmit={onSubmit}>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input {...register("query")} type="search" id="default-search" className="block w-[48rem] p-3 pl-10 text-sm text-gray-900 rounded-lg bg-gray-50 focus:ring-white focus:border-white dark:bg-gray-700 dark:border-white dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white" placeholder="Search" required />
            </div>
        </form>
    );
};

export default Search;