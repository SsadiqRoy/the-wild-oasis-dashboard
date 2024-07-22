import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useGetSetting, useUpdateSetting } from './settingHooks';

function UpdateSettingsForm() {
  const { setting: { maxBookingLength, minBookingLength, maxGuestPerBooking, breakfastPrice } = {}, islSetting } = useGetSetting();
  const { isUpdating, updateSetting } = useUpdateSetting();

  function handleBlur(e, field) {
    if (!e.target.value) return;

    updateSetting({ [field]: e.target.value });
  }

  if (islSetting) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) => handleBlur(e, 'minBookingLength')}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleBlur(e, 'maxBookingLength')}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestPerBooking}
          onBlur={(e) => handleBlur(e, 'maxGuestPerBooking')}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleBlur(e, 'breakfastPrice')}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
