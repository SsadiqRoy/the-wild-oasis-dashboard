// import styled from 'styled-components';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import FormRow from '../../ui/FormRow';
import { useCreateEditCabin } from './cabinHooks';

// const FormRow2 = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 24rem 1fr 1.2fr;
//   gap: 2.4rem;

//   padding: 1.2rem 0;

//   &:first-child {
//     padding-top: 0;
//   }

//   &:last-child {
//     padding-bottom: 0;
//   }

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }

//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `;

// const Label = styled.label`
//   font-weight: 500;
// `;

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;

function CreateCabinForm({ closeModal, cabin, formType }) {
  const { id: cabinId, ...dataValues } = cabin || {};
  const isEdit = Boolean(cabinId);
  const successMessage = isEdit ? 'Cabin Edited Successfully' : 'New Cabin Created';

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: isEdit ? dataValues : {} });
  const { isCreating, createEdit: mutate } = useCreateEditCabin();

  function onSubmit(data) {
    mutate(
      { data, id: cabinId },
      {
        onSuccess: () => {
          toast.success(successMessage);
          reset();
          closeModal?.();
        },
      }
    );
  }

  return (
    // <Form onSubmit={handleSubmit((data) => mutate(data))}>
    <Form onSubmit={handleSubmit(onSubmit)} type={formType}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input disabled={isCreating} type="text" id="name" {...register('name', { required: 'Feild is required' })} />
      </FormRow>

      <FormRow label="Maximum Capicity" error={errors?.maxCapacity?.message}>
        <Input disabled={isCreating} type="number" id="maxCapacity" {...register('maxCapacity', { required: 'Field is required' })} />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          disabled={isCreating}
          type="number"
          id="regularPrice"
          {...register('regularPrice', { required: 'Field is required', min: { value: 1, message: 'Regula price can not be less than 1' } })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          disabled={isCreating}
          type="number"
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: 'Field is required',
            validate: (v) => +v < +getValues().regularPrice || 'Discount can not be more than regular price',
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          disabled={isCreating}
          type="number"
          id="description"
          defaultValue=""
          {...register('description', { required: 'Feild is required' })}
        />
      </FormRow>

      <FormRow label="Cabin Photo" error={errors?.image?.message}>
        <FileInput
          disabled={isCreating}
          id="image"
          accept="image/*"
          type="file"
          {...register('image', { required: isEdit ? false : 'image is required' })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => closeModal?.()}>
          Cancel
        </Button>
        <Button disabled={isCreating}>{isEdit ? 'Edit Cabin' : 'Create Cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
