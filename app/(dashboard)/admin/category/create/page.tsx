import AdminPanel from "@/components/admin/AdminPanel";
import SubmitButton from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import { createCategoryAction } from "@/utils/api";

function CreateCategoryPage() {
  return (
    <AdminPanel title="إضافة قسم جديد">
      <FormContainer action={createCategoryAction}>
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput name="title" type="text" label="اسم القسم" />
          <ImageInput name="image" />
        </div>
        <SubmitButton text="إنشاء القسم" className="mt-6 h-11 rounded-none" />
      </FormContainer>
    </AdminPanel>
  );
}

export default CreateCategoryPage;
