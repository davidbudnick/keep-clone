import React from "react"
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Status, useCreateNewNoteMutation } from "@/graphql/generated/schema";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { DEFUALT_MOBILE_WIDTH } from "@/constants/mobile";

interface IFormInput {
    title: string;
    body: string;
}

interface CreateFormProps {
    setOpen: (value: boolean) => void;
}

const CreateForm: React.FC<CreateFormProps> = ({ setOpen }) => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery({ maxWidth: DEFUALT_MOBILE_WIDTH });
    const [createNote] = useCreateNewNoteMutation({
        update(cache) {
            cache.evict({ fieldName: "notes" });
        },
    });

    const { control, handleSubmit, reset } = useForm<IFormInput>({
        defaultValues: {
            title: "",
            body: ""
        }
    });

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        createNote({
            variables: {
                input: {
                    title: data.title,
                    body: data.body,
                    pinned: false,
                    status: Status.Active,
                }
            }
        });
        reset();
        setOpen(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-6 mb-4">
            <Controller
                name="title"
                control={control}
                render={({ field }) =>
                    <Input {...field}
                        autoFocus={!isMobile}
                        placeholder={t("pages.home.create_note.title_placeholder")}
                    />
                }
            />
            <Controller
                name="body"
                control={control}
                render={({ field }) => (
                    <Textarea
                        {...field}
                        onClick={(e) => { e.stopPropagation(); }}
                        className="mt-2 h-48"
                        placeholder={t("pages.home.create_note.take_a_note")}
                    />
                )}
            />
            <div className="flex justify-end">
                <Button type="submit" variant="outline" className='mt-4'>{t("pages.home.create_note.add_note")}</Button>
            </div>
        </form>
    )
}

export default CreateForm
