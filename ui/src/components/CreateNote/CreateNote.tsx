import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { useMediaQuery } from "react-responsive";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { CreateForm } from "..";
import { DEFUALT_MOBILE_WIDTH } from "@/constants/mobile";

const CreateNote: React.FC = () => {
    const { isAuthenticated } = useAuth()
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);
    const isMobile = useMediaQuery({ maxWidth: DEFUALT_MOBILE_WIDTH });

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

    if (!isAuthenticated) {
        return (
            <div className="flex justify-center">
                <div className="w-full max-w-lg cursor-pointer p-2 opacity-50">
                    <div className="w-full rounded-md border p-3">
                        <p className="text-gray-500">{t("pages.home.create_note.take_a_note")}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex justify-center">
            {isMobile ? (
                <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerTrigger asChild>
                        <div className="w-full max-w-lg cursor-pointer p-2">
                            <div className="w-full rounded-md border p-3">
                                <p className="text-gray-500">{t("pages.home.create_note.take_a_note")}</p>
                            </div>
                        </div>
                    </DrawerTrigger>
                    <DrawerContent className="mx-">
                        <DrawerHeader>
                            <DrawerTitle className="mb-2 mt-2">{t("pages.home.create_note.whats_on_your_mind")}</DrawerTitle>
                        </DrawerHeader>
                        <CreateForm setOpen={setOpen} />
                    </DrawerContent>
                </Drawer>
            ) : (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <div className="w-full max-w-lg cursor-pointer p-2">
                            <div className="w-full rounded-md border p-3">
                                <p className="text-gray-500">{t("pages.home.create_note.take_a_note")}</p>
                            </div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="w-full">
                        <DialogHeader className="items-center">
                            <DialogTitle className="mb-1">{t("pages.home.create_note.whats_on_your_mind")}</DialogTitle>
                        </DialogHeader>
                        <CreateForm setOpen={setOpen} />
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default CreateNote;
