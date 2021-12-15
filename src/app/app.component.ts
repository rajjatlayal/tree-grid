import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { TreeGridComponent , EditService , ToolbarService , PageService } from '@syncfusion/ej2-angular-treegrid';
import { sampleData } from './sampledata';
import { ContextMenuComponent, MenuEventArgs, MenuItemModel } from '@syncfusion/ej2-angular-navigations';// import { MyAlertDialogComponent } from './my-alert-dialog/my-alert-dialog.component';
import { Browser } from '@syncfusion/ej2-base';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [EditService , ToolbarService , PageService]
})
export class AppComponent {
    @ViewChild('contextmenu')
    public contextmenu!: ContextMenuComponent;
    addData='false'
    public menuItems: MenuItemModel[] = [
        {
            text: 'EditCol',
            iconCss: 'e-cm-icons e-cut'
        },
        {
            text: 'NewCol',
            iconCss: 'e-cm-icons e-copy'
        },
        {
            text: 'DelCol',
            iconCss: 'e-cm-icons e-paste',
            // items: [
            //     {
            //         text: 'Paste Text',
            //         iconCss: 'e-cm-icons e-pastetext'
            //     },
            //     {
            //         text: 'Paste Special',
            //         iconCss: 'e-cm-icons e-pastespecial'
            //     }
            // ]
        },
        // {
        //     separator: true
        // },
        {
            text: 'ChooseCol',
            iconCss: 'e-cm-icons e-link'
        },
        {
            text: 'FreezeCol',
            iconCss: 'e-cm-icons e-comment'
        },
        {
            text: 'FilterCol ',
            iconCss: 'e-cm-icons e-comment'
        },
        {
            text: 'MultiSort ',
            iconCss: 'e-cm-icons e-comment'
        }
    
    
    ];





    [x: string]: any;
    public data: Object[] = [];
    public editSettings: Object | undefined=false;
    public toolbar:string[]| undefined;
    public taskidrules: Object| undefined;
    public tasknamerules: Object| undefined;
    public startdaterules: Object| undefined;
    public durationrules: Object| undefined;
    public edit: Object| undefined;
    public d1data: Object| undefined;
    public ddlfields: Object| undefined;

     @ViewChild('treegrid')
  public treegrid!: TreeGridComponent;

  constructor  (

  ){

  }
    customDialogForm: any;





    ngOnInit(): void {
        this.data = sampleData;
        // this.editSettings ={ allowEditing: true, allowAdding: true, allowDeleting: true, mode:"Cell"}; 
        // this.toolbar = ['Add', 'Delete', 'Update', 'Cancel'];
        // this.taskidrules = { required: true , number: true};
        // this.tasknamerules = { required: true};
        // this.startdaterules = { date: true};
        // this.durationrules = {number: true , min: 0};
        // this.edit = { params: {  format: 'n'}};
        // this.ddlfields = { text: 'name' , value: 'id'};
        // this.d1data= [{ id: 'CellEditing', name: 'Cell Editing' }, {id: 'RowEditing', name: 'Row Editing'} ]
 
 
 
    }



    public onChange(e: ChangeEventArgs): void {
        if (e.value === 'CellEditing') {
            this.treegrid.editSettings.mode = 'Cell';
            this.treegrid.toolbar = ['Add', 'Delete', 'Update', 'Cancel'];
        } else {
            this.treegrid.editSettings.mode = 'Row';
            this.treegrid.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        }
    }

    public saveUsername:boolean | undefined;

 public onSaveUsernameChanged(value:boolean){
    this.saveUsername = value;
}

OpenPopUp(){
    console.log('data')
}

openCustomDialog() {}
   


    // Event triggers once the context menu rendering is completed.
    onCreated(): void {
        if (Browser.isDevice) {
            this.content = 'Touch hold to open the ContextMenu';
            this.contextmenu.animationSettings.effect = 'ZoomIn';
        } else {
            this.content = 'Menu 1';
            this.contextmenu.animationSettings.effect = 'SlideDown';
        }
    }
      // Event triggers while rendering each menu item where “Link” menu item is disabled
      public addDisabled  (args: MenuEventArgs) {

        console.log('data',args.item.text)
        if (args.item.text === 'Link') {
            args.element.classList.add('e-disabled');
        }
        else if(args.item.text === 'EditCol'){
            this.addData='true'
            this.editSettings ={ allowEditing: true, allowAdding: true, allowDeleting: true, mode:"Cell"}; 
            this.toolbar = ['Add', 'Delete', 'Update', 'Cancel'];
            this.taskidrules = { required: true , number: true};
            this.tasknamerules = { required: true};
            this.startdaterules = { date: true};
            this.durationrules = {number: true , min: 0};
            this.edit = { params: {  format: 'n'}};
            this.ddlfields = { text: 'name' , value: 'id'};
            this.d1data= [{ id: 'CellEditing', name: 'Cell Editing' }, {id: 'RowEditing', name: 'Row Editing'} ]
     
     
        }

    }
}