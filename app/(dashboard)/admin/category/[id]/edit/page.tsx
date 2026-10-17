import AdminPanel from "@/components/admin/AdminPanel";
import ImageInputEditContainer from "@/components/admin/products/ImageInputContainer";
import SubmitButton from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";

import {
  fetchSingleCategory,
  updateCategoryAction,
  updateCategoryImageAction,
} from "@/utils/api";

interface EditParamsProps {
  params: { id: string };
}

async function EditCategoryPage({ params }: EditParamsProps) {
  const { id } = await params;
  const category = await fetchSingleCategory(id);
  const { title, image } = category;
  return (
    <AdminPanel title="تعديل القسم">
      <ImageInputEditContainer
        name={title}
        image={image}
        action={updateCategoryImageAction}
        text="تغيير الصورة"
      >
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="url" value={image} />
      </ImageInputEditContainer>

      <FormContainer action={updateCategoryAction}>
        <input type="hidden" name="id" value={id} />

        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            name="title"
            type="text"
            label="اسم القسم"
            defaultValue={title}
          />
        </div>
        <SubmitButton text="حفظ التعديلات" className="mt-6 h-11 rounded-none" />
      </FormContainer>
    </AdminPanel>
  );
}

export default EditCategoryPage;
