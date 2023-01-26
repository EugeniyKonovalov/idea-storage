export type InputsObjType = {
  id?: string;
  type?: string;
  value?: string | number;
  placeholder?: string;
};

export interface InputsType {
  label?: string;
  input?: InputsObjType;
  onChange?: (event: any) => void;
  onBlur?: () => void;
  onClick?: () => void;
}

export interface BtnType {
  title?: string;
  disabled?: boolean;
  customStyles?: any;
  onClick?: () => void;
}

export interface ModalType {
  isOpen: boolean;
  onClose: () => void;
}
