import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { ContextMenuModule } from '@syncfusion/ej2-angular-navigations';
// import { MyAlertDialogComponent } from './my-alert-dialog/my-alert-dialog.component';

export class MaterialModule { }

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, TreeGridModule,DropDownListAllModule,MultiSelectAllModule,ContextMenuModule
  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
