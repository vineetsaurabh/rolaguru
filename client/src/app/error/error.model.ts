import { Cause } from "../cause/cause.model";
import { Observable } from "rxjs/Observable";

export class Error {
  errid: string;
  domain: string;
  module: string;
  errcode: string;
  description: string;
  operation: string;
  severity: string;
  frequency: string;
  causes: Set<Cause>;
  checked: boolean;
  files: Observable<string[]>;
}
