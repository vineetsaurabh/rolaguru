import { Cause } from "./cause.model";

export class Error {
  errid: string;
  errcode: string;
  message: string;
  errortype: string;
  batchtype: string;
  causes: Set<Cause>;
}
