"use client";
import FormContainer from "../form/FormContainer";
import { creatReviewAction } from "@/utils/api";
import { useUser } from "@clerk/nextjs";
import RatingInput from "./RatingInput";
import TextAreaInput from "../form/TextAreaInput";
import SubmitButton from "../form/Buttons";
import { useState } from "react";
import { LuPenLine } from "react-icons/lu";

function SubmitReview({ id }: { id: string }) {
  const user = useUser();
  const [isvisabile, setIsvisabile] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsvisabile((prev) => !prev)}
        className="inline-flex h-11 items-center gap-2 border-2 border-foreground px-5 text-sm font-semibold transition-colors hover:bg-foreground hover:text-background"
      >
        <LuPenLine className="h-4 w-4" />
        {isvisabile ? "إخفاء النموذج" : "اكتب تقييمك"}
      </button>
      {isvisabile && (
        <div className="my-8 max-w-2xl border-2 border-foreground bg-card p-6 sm:p-8">
          <h3 className="mb-6 font-display text-2xl font-bold">شاركنا رأيك</h3>
          <FormContainer action={creatReviewAction}>
            <input type="hidden" name={"productId"} value={id} />
            <input
              type="hidden"
              name={"authorName"}
              value={user.user?.firstName || ""}
            />
            <input
              type="hidden"
              name={"authorImageUrl"}
              value={user.user?.imageUrl || ""}
            />
            <RatingInput name="rating" />
            <TextAreaInput name="comment" labelText="رأيك في المنتج" />
            <SubmitButton text="إرسال التقييم" />
          </FormContainer>
        </div>
      )}
    </>
  );
}

export default SubmitReview;
