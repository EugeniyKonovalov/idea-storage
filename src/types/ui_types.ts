export type InputsObjType = {
  id?: string;
  type?: string;
  value?: string | number;
  placeholder?: string;
  maxlength?: string;
};

export interface InputsType {
  label?: string;
  input?: InputsObjType;
  customStyles?: any;
  onChange?: (event: any) => void;
  onFocus?: () => void;
  onClick?: () => void;
  onBlur?: () => void;
}

export interface BtnType {
  title?: string;
  disabled?: boolean;
  customStyles?: any;
  onClick?: (event: React.FormEvent) => void;
  onMouseLeave?: () => void;
  onMouseEnter?: () => void;
}

export interface ModalType {
  isOpen: boolean;
  onClose: () => void;
}
export interface addFolderModalType {
  item?: any;
  showSubfolderHandler: () => void;
}

export interface validationTextType {
  isExistName: boolean;
  folderName: string;
  isTouched: boolean;
  topPosition: string | number;
}
