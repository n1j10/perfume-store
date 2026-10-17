"use client";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { LuShare2 } from "react-icons/lu";
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
} from "react-share";

function ShareButton({ id, name }: { id: string; name: string }) {
    const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
    const shareLink = `${url}/products/${id}`;

    return (
        <Popover>
            <PopoverTrigger
                render={
                    <button
                        type='button'
                        aria-label='مشاركة المنتج'
                        className='grid h-10 w-10 place-items-center rounded-full border-2 border-foreground transition-colors hover:bg-foreground hover:text-background'
                    >
                        <LuShare2 />
                    </button>
                }
            />
            <PopoverContent
                side='bottom'
                align='start'
                sideOffset={10}
                className='flex w-auto items-center gap-x-2'
            >
                <FacebookShareButton url={shareLink} title={name} >
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
                <LinkedinShareButton url={shareLink} title={name} >
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <EmailShareButton url={shareLink} title={name}>
                    <EmailIcon size={32} round />
                </EmailShareButton>
            </PopoverContent>
        </Popover>
    )
}

export default ShareButton
