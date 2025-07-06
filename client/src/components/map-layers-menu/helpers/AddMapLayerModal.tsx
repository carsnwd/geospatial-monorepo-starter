import { GMSButton, IconAddLayer, useModal } from "ui";
import { GMSModal } from "ui/components/GMSModal/GMSModal";

export default function AddMapLayerModal() {
  const { isOpen, openModal, closeModal, handleConfirm, handleCancel } =
    useModal({
      onConfirm: () => {
        // Handle the confirm action here
        console.log("Layer added");
        closeModal();
      },
      onCancel: () => {
        // Handle the cancel action here
        console.log("Add layer cancelled");
        closeModal();
      },
    });
  return (
    <>
      <GMSButton
        label="Add Layer"
        style="soft"
        icon={IconAddLayer}
        onClick={openModal}
      />
      <GMSModal
        id={"add-map-layer-modal"}
        confirmBtnConfig={{
          isDisabled: true,
          confirmCallback: handleConfirm,
          confirmLabel: "Add Layer",
        }}
        cancelBtnConfig={{
          cancelCallback: handleCancel,
          cancelLabel: "Cancel",
        }}
        isOpen={isOpen}
        modalSize="3xlarge"
      >
        Hello
      </GMSModal>
    </>
  );
}
