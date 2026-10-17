import AdminPanel from "@/components/admin/AdminPanel";
import ImageInputEditContainer from "@/components/admin/products/ImageInputContainer";
import SubmitButton from "@/components/form/Buttons";
import CategoryInput from "@/components/form/CategoryInput";
import CheckBoxInput from "@/components/form/CheckBoxInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import {
  fetchSingleProduct,
  updateProductAction,
  updateProductImageAction,
} from "@/utils/api";

interface EditParamsProps {
  params: { id: string };
}

async function EditProductPage({ params }: EditParamsProps) {
  const { id } = await params;
  const product = await fetchSingleProduct(id);
  const { name, description, price, featured, image, categoryId } = product;
  return (
    <AdminPanel title="تعديل المنتج">
      <ImageInputEditContainer
        name={name}
        image={image}
        action={updateProductImageAction}
        text="تغيير الصورة"
      >
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="url" value={image} />
      </ImageInputEditContainer>

      <FormContainer action={updateProductAction}>
        <input type="hidden" name="id" value={id} />

        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            name="name"
            type="text"
            label="اسم المنتج"
            defaultValue={name}
          />
          <PriceInput defaultValue={price} />
          <CategoryInput defaultValue={categoryId} />
        </div>
        <div className="mt-4">
          <TextAreaInput
            name="description"
            labelText="وصف المنتج"
            defaultValue={description}
          />
        </div>
        <div className="mt-4">
          <CheckBoxInput
            name="featured"
            label="منتج مميز (يظهر في الصفحة الرئيسية)"
            defaultChecked={featured}
          />
        </div>
        <SubmitButton text="حفظ التعديلات" className="mt-6 h-11 rounded-none" />
      </FormContainer>
    </AdminPanel>
  );
}

export default EditProductPage;
