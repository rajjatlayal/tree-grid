import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { ContextMenuModule } from '@syncfusion/ej2-angular-navigations';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonAllModule , CheckBoxAllModule} from '@syncfusion/ej2-angular-buttons';
export class MaterialModule { }

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, TreeGridModule,DropDownListAllModule,MultiSelectAllModule,ContextMenuModule,
    DialogModule,FormsModule,ReactiveFormsModule,ButtonAllModule,CheckBoxAllModule
  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }