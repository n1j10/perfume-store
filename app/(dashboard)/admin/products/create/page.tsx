import AdminPanel from "@/components/admin/AdminPanel";
import SubmitButton from "@/components/form/Buttons";
import CategoryInput from "@/components/form/CategoryInput";
import CheckBoxInput from "@/components/form/CheckBoxInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { createProductAction } from "@/utils/api";

function CreateProductPage() {
  return (
    <AdminPanel title="إضافة منتج جديد">
      <FormContainer action={createProductAction}>
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput name="name" type="text" label="اسم المنتج" />
          <PriceInput />
          <CategoryInput />
          <ImageInput name="image" />
        </div>
        <div className="mt-4">
          <TextAreaInput name="description" labelText="وصف المنتج" />
        </div>
        <div className="mt-4">
          <CheckBoxInput name="featured" label="منتج مميز (يظهر في الصفحة الرئيسية)" />
        </div>
        <SubmitButton text="إنشاء المنتج" className="mt-6 h-11 rounded-none" />
      </FormContainer>
    </AdminPanel>
  );
}

export default CreateProductPage;
