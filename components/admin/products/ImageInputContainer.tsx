"use client"

import { actionFunction } from "@/utils/type";
import Image from "next/image";
import { useState } from "react";
import FormContainer from "../../form/FormContainer";
import ImageInput from "../../form/ImageInput";
import SubmitButton from "../../form/Buttons";

type ImageInputEditContainerProps = {
    name: string;
    image: string;
    action: actionFunction,
    text: string,
    children?: React.ReactNode
}


function ImageInputEditContainer(props: ImageInputEditContainerProps) {

    const { name, image, action, text, children } = props;
    const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
    return (
        <div className="mb-8 flex flex-col gap-5 border-b-2 border-dashed border-foreground/20 pb-8 sm:flex-row sm:items-start">

            <Image
                src={image}
                alt={name}
                width={160}
                height={200}
                className="h-[200px] w-[160px] border-2 border-foreground object-cover"
            />
            <div className="flex-1">
                <button
                    type="button"
                    className="inline-flex h-9 items-center border-2 border-foreground px-4 text-sm font-semibold transition-colors hover:bg-foreground hover:text-background"
                    onClick={() => setIsUpdateFormVisible(!isUpdateFormVisible)}>
                    {isUpdateFormVisible ? 'إلغاء' : text}
                </button>

                {
                    isUpdateFormVisible && (
                        <div className="mt-4 max-w-md">
                            <FormContainer action={action}>
                                {children}
                                <ImageInput
                                    name='image'
                                />
                                <SubmitButton text="رفع الصورة" className="rounded-none" />
                            </FormContainer>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default ImageInputEditContainer
