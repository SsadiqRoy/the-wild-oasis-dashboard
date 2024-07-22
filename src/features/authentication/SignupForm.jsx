import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSignup } from './authHooks';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm();

  const { signup, isSigningUP } = useSignup();

  function onSubmit(data) {
    signup(data, { onSettled: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input type="text" disabled={isSigningUP} id="fullName" {...register('fullName', { required: 'This field is required' })} />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          disabled={isSigningUP}
          id="email"
          {...register('email', { required: 'This field is required', pattern: /\S+@\S+\.\S+/ })}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input type="password" disabled={isSigningUP} id="password" {...register('password', { required: 'This field is required', minLength: 8 })} />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isSigningUP}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (v) => v === getValues()?.password || 'Passwords do not match',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isSigningUP}>
          Cancel
        </Button>
        <Button disabled={isSigningUP}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
