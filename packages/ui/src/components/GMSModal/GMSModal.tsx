import { GMSButton } from "../GMSButton";

type ModalSizes =
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "2xlarge"
  | "3xlarge"
  | "4xlarge"
  | "5xlarge"
  | "6xlarge"
  | "7xlarge"
  | "full";

interface GMSModalConfirmBtnConfig {
  confirmCallback?: () => void;
  confirmLabel?: string;
  isDisabled?: boolean;
}
interface GMSModalCancelBtnConfig {
  cancelCallback?: () => void;
  cancelLabel?: string;
  isDisabled?: boolean;
}

interface GMSModalProps {
  id: string;
  children: React.ReactNode;
  isOpen: boolean;
  confirmBtnConfig?: GMSModalConfirmBtnConfig;
  cancelBtnConfig?: GMSModalCancelBtnConfig;
  showCloseBtn?: boolean;
  modalSize: ModalSizes;
}

function renderConfirmBtn(confirmBtnConfig?: GMSModalConfirmBtnConfig) {
  if (!confirmBtnConfig) return null;
  return (
    <GMSButton
      color="primary"
      disabled={confirmBtnConfig.isDisabled}
      onClick={confirmBtnConfig.confirmCallback}
      label={confirmBtnConfig.confirmLabel}
    />
  );
}

function renderCancelBtn(cancelBtnConfig?: GMSModalCancelBtnConfig) {
  if (!cancelBtnConfig) return null;
  return (
    <GMSButton
      color="secondary"
      disabled={cancelBtnConfig.isDisabled}
      onClick={cancelBtnConfig.cancelCallback}
      label={cancelBtnConfig.cancelLabel}
    />
  );
}

const modalSizeToClassMap: Map<ModalSizes, string> = new Map([
  ["xsmall", "max-w-xs"],
  ["small", "max-w-lg"],
  ["medium", "max-w-md"],
  ["large", "max-w-lg"],
  ["xlarge", "max-w-xl"],
  ["2xlarge", "max-w-2xl"],
  ["3xlarge", "max-w-3xl"],
  ["4xlarge", "max-w-4xl"],
  ["5xlarge", "max-w-5xl"],
  ["6xlarge", "max-w-6xl"],
  ["7xlarge", "max-w-7xl"],
  ["full", "max-w-full"],
]);

export const GMSModal = ({
  id,
  children,
  confirmBtnConfig,
  cancelBtnConfig,
  isOpen,
  modalSize = "medium",
}: GMSModalProps) => {
  if (!isOpen) return null;
  return (
    <dialog id={id} className="modal" open={isOpen}>
      <div
        className={["modal-box", modalSizeToClassMap.get(modalSize)].join(" ")}
      >
        {children}
        <div className="modal-action">
          {renderCancelBtn(cancelBtnConfig)}
          {renderConfirmBtn(confirmBtnConfig)}
        </div>
      </div>
    </dialog>
  );
};
