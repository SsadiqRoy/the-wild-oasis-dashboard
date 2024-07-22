import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
// import CabinTable from './CabinTable';
import CreateCabinForm from './CreateCabinForm';

function AddCabin() {
  return (
    // <div>comethis</div>
    <Modal>
      <Modal.Open opens="new-cabin">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="new-cabin">
        <CreateCabinForm formType="modal" />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
