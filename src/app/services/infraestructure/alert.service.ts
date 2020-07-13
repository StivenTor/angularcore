import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";

@Injectable()
export class AlertService {

  constructor(private snackBar: MatSnackBar) { }

  info(message: string) {
    this.snackBar.open(message, "X", {
      duration: 4000,
    });
  }

  error(message: string) {
    this.snackBar.open(message, "X", {
      duration: 4000,
      extraClasses: ["error-snackbar"]
    });
  }

}
