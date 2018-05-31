import { Cause } from "../cause/cause.model";

export class Error {
  errid: string;
  errcode: string;
  message: string;
  errortype: string;
  batchtype: string;
  causes: Set<Cause>;
  checked: boolean;
}
