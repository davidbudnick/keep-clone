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

interface IFormInput {
    title: string;
    body: string;
}


const CreateNote: React.FC = () => {
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
            if (e.key === "n") {
                e.preventDefault();
                setOpen(true);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const [open, setOpen] = React.useState(false);

    return (
        <div className="flex justify-center">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <div className="w-full max-w-lg cursor-pointer p-2">
                        <div className="w-full rounded-md border p-3">
                            <p className="text-gray-500">Take a note...</p>
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] w-full max-w-2xl overflow-y-auto">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle className="mb-2">What's on your mind?</DialogTitle>
                        </DialogHeader>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => <Input {...field} autoFocus placeholder="Title" />}
                        />
                        <Controller
                            name="body"
                            control={control}
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    onClick={(e) => { e.stopPropagation(); }}
                                    className="mt-2 h-48"
                                    placeholder="Take a note..."
                                />
                            )}
                        />
                        <div className="flex justify-end">
                            <Button type="submit" variant="outline" className='mt-2'>Add Note</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateNote;
