import React from 'react';
import { useForm, Resolver } from "react-hook-form";
import { Input } from '@/components/ui/input';

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


    const {
        register,
        handleSubmit,
        reset,
    } = useForm<SearchValues>({ resolver })
    const onSubmit = handleSubmit((data) => {
        console.log(data.query)
        // router.push(`?search?${data.query}`)
        reset()
    })

    return (
        <div className="flex w-full max-w-lg items-center space-x-2">
            <Input type="text" placeholder="Search" onKeyDown={
                (e) => {
                    if (e.key === "Enter") {
                        onSubmit()
                    }
                }
            }
                className="w-full h-12"
                {...register("query")} />
        </div>
    );
}

export default Search;