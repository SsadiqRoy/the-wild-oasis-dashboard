import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
// import { useState } from 'react';
import CreateCabinForm from './CreateCabinForm';
import { useCreateEditCabin, useDeleteCabin } from './cabinHooks';
import { HiPencilSquare, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin: mutate } = useDeleteCabin();
  const { createEdit } = useCreateEditCabin();

  const { id: cabinId, name, image, maxCapacity, regularPrice, discount, description } = cabin;
  //

  function handleDuplicate(e) {
    const cabinCopy = { name: `${name} Copy`, image, maxCapacity, regularPrice, discount, description };
    createEdit({ data: cabinCopy });
  }

  const buttonStyle = {
    width: ' 100%',
    textAlign: ' left',
    background: ' none',
    border: ' none',
    padding: ' 1.2rem 2.4rem',
    fontSize: ' 1.4rem',
    transition: ' all 0.2s',

    display: ' flex',
    alignItems: ' center',
    gap: ' 1.6rem',
  };

  return (
    <Table.Row role="row">
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>get up to {maxCapacity} fits</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}

      <div style={{ display: 'flex', gap: '7px', fontSize: '16px' }}>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />

            <Menus.List id={cabinId}>
              <Menus.Button onclick={handleDuplicate} icon={<HiSquare2Stack />}>
                <span>Duplicate</span>
              </Menus.Button>
              {/* <Menus.Button icon={<HiPencilSquare />}>
                <span>Older</span>
              </Menus.Button> */}

              <Modal.Open opens="edit">
                <button style={buttonStyle}>
                  <HiPencilSquare /> Edit
                </button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <button style={buttonStyle}>
                  <HiTrash /> Delete
                </button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm cabin={cabin} formType="modal" />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete disabled={isDeleting} resourceName="Cabin" onConfirm={() => mutate(cabinId)} />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
