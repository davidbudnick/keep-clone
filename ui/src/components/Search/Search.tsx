import React from "react";
import { useForm, Resolver } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";

const Search: React.FC = () => {
    const { isAuthenticated } = useAuth()
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
        //TODO: Implement search
        console.log(data.query)
        // router.push(`?search?${data.query}`)
        reset()
    })
    const { t } = useTranslation();

    return (
        <div className="hidden md:block w-full max-w-lg md:max-w-sm">
            <Input disabled={!isAuthenticated} type="text" placeholder={t("navbar.search")} onKeyDown={
                (e) => {
                    if (e.key === "Enter") {
                        onSubmit()
                    }
                }
            } className="h-12 w-full" {...register("query")} />
        </div>
    );
}

export default Search;
