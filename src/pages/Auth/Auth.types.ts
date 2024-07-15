import type { Dispatch, SetStateAction } from 'react';

export interface VerifyModalProps {
  storedEmailAddress: string;
}

export interface VerifyModalProps {
  storedEmailAddress: string;
  setShowVerificationModal: Dispatch<SetStateAction<boolean>>;
  setFirstStep: Dispatch<SetStateAction<boolean>>;
}
