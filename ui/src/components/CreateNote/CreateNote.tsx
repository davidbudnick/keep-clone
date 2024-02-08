import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Status, useCreateNewNoteMutation } from "@/graphql/generated/schema";
import { useTranslation } from "react-i18next";

interface IFormInput {
    title: string;
    body: string;
}

const CreateNote: React.FC = () => {
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);
    const [createNote] = useCreateNewNoteMutation(
        {
            update(cache) {
                cache.evict({ fieldName: "notes" });
            }
        }
    );

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

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === "n") {
                setOpen(true);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);



    return (
        <div className="flex justify-center">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <div className="w-full max-w-lg cursor-pointer p-2">
                        <div className="w-full rounded-md border p-3">
                            <p className="text-gray-500">{t("pages.home.create_note.take_a_note")}</p>
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] w-full max-w-2xl overflow-y-auto">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle className="mb-4">{t("pages.home.create_note.whats_on_your_mind")}</DialogTitle>
                        </DialogHeader>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => <Input {...field} autoFocus placeholder={t("pages.home.create_note.title_placeholder")} />}
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
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateNote;
