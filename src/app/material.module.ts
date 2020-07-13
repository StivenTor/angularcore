import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatSelectModule,
  MatInputModule,
  MatTableModule,
  MatSidenavModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatDialogModule,
  MatGridListModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule,
  MatExpansionModule
} from '@angular/material';


@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatDialogModule,
    MatGridListModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatExpansionModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatDialogModule,
    MatGridListModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatExpansionModule
  ]
})
export class MaterialModule {}