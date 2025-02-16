import { TaskType } from "../../types";

export enum Operation {
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  ADD = 'ADD'
}

export interface ItemFormType {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  operationToBePerformed: Operation;
};

export interface IProps {
  drawerOpen: boolean;
  title: string;
  description: string;
  status: "pending" | "completed";
  updateTheSelectedItem: (reset: boolean, index?: number,) => void;
  itemId: string;
  refreshTheList: (msg?: string) => void;
  operationToBePerformed?: Operation;
}
