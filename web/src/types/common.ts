import { FieldValue } from 'firebase/firestore';

export type metaType = {
  createdAt: FieldValue;
  updatedAt: FieldValue;
};

export type idType = {
  id: string;
};

export type modelBaseType = idType & metaType;
