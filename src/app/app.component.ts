import { sampleData } from './sampledata';
import { ContextMenuComponent, MenuEventArgs, MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { Component, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommandColumnService, ContextMenuService, EditService, FilterService, PageService, ToolbarService, TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { ChangeEventArgs, DropDownList, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { Browser } from '@syncfusion/ej2-base';
import { DialogEditEventArgs, SaveEventArgs } from '@syncfusion/ej2-angular-grids';
import { FormGroup } from '@angular/forms';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [EditService ,FilterService, ToolbarService , PageService,    CommandColumnService,ContextMenuService
    ],
    encapsulation: ViewEncapsulation.None

})
export class AppComponent {

    public editColumn=false
    @ViewChild('contextmenu')
    public contextmenu!: ContextMenuComponent;
    @ViewChild('contextmenu')
    public contextmenu2!: ContextMenuComponent;
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
      
        },
       
        {
            text: 'ChooseCol',
            iconCss: 'e-cm-icons e-link'
        },
        {
            text: 'FreezeCol',
            iconCss: 'e-cm-icons e-comment'
        },
        {
            text: 'FilterCol',
            iconCss: 'e-cm-icons e-comment'
        },
        {
            text: 'MultiSort',
            iconCss: 'e-cm-icons e-comment'
        }
    
    
    ];

   public menuItems1:MenuItemModel[] = [
    {
        text: 'AddNext',
        iconCss: 'e-cm-icons e-copy'
    },
    {
        text: 'MultiSelect',
        iconCss: 'e-cm-icons e-copy'
    },{
        text: 'CopyRows',
        iconCss: 'e-cm-icons e-copy'
    },{
        text: 'PasteNext',
        iconCss: 'e-cm-icons e-copy'
    },{
        text: 'PasteChild',
        iconCss: 'e-cm-icons e-copy'
    }, 
   ]

    public filterSettings!: Object;
    public templateOptions!: object;
    public dropDownFilter!: DropDownList;
    public fields1!: Object;



    public data: Object[] = [];
    public editSettings: Object | undefined=false;
    public toolbar:string[]| undefined;
    public taskidrules: Object| undefined;
    public tasknamerules: Object| undefined;
    public startdaterules: Object| undefined;
    public durationrules: Object| undefined;
    public edit: Object| undefined;
    public d1data!: Object;
    public ddlfields: Object| undefined;
    public taskdata: ITaskModel | undefined;
    @ViewChild('taskForm')
    public taskForm!: FormGroup;
     @ViewChild('treegrid')
  public treegrid!: TreeGridComponent;
  
  @ViewChild('dropdown1')
    public dropdown1!: DropDownListComponent;
    pageSettings: { pageCount: 5; } | undefined;
    enddaterules: { date: boolean; } | undefined;
    isCommandClick: any;
    content: string | undefined;
    content1!: string;

    editParams: { params: { format: string; }; } | undefined;

  constructor  (
    // @Inject('sourceFiles') private sourceFiles: any
  ){
    // sourceFiles.files = ['filter.style.css'];

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



    onCreated1(): void {
        if (Browser.isDevice) {
            this.content1 = 'Touch hold to open the ContextMenu';
            this.contextmenu.animationSettings.effect = 'ZoomIn';
        } else {
            this.content1 = 'Menu 2';
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
            console.log('date')
            this.data = sampleData;
            this.editColumn=false
            this.pageSettings = { pageCount: 5 };

            this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true , mode: 'Dialog' , newRowPosition: 'Below'};
            // this.toolbar = ['Add', 'Edit', 'Delete'];
            this.pageSettings = { pageCount: 5 };
            this.editParams = {  params: { format: 'n' } };
            this.tasknamerules = { required: true};
            this.taskidrules = { required: true};
            this.startdaterules = { date: true};
            this.enddaterules = { date: true};
            
            
            
            // this.taskidrules = { required: true , number: true};
            // this.tasknamerules = { required: true};
            // this.startdaterules = { date: true};
            this.durationrules = {number: true , min: 0};
            // this.edit = { params: {  format: 'n'}};
            this.ddlfields = { text: 'name' , value: 'id'};
            this.d1data= [{ id: 'CellEditing', name: 'Cell Editing' }, {id: 'RowEditing', name: 'Row Editing'} ]

        }

        // else if(args.item.text=='FilterCol'){
        //     console.log('FilterCol')

        // }
        else if (args.item.text ==='FilterCol'){
            console.log('date11',this.editColumn)
            // this.editColumn=true
            this.editColumn=true

            this.data = sampleData;
            this.pageSettings = { pageCount: 5 };

            this.filterSettings = { type: 'FilterBar', hierarchyMode: 'Parent', mode: 'Immediate' };
            this.templateOptions = {
                create: (args: { element: Element }) => {
                    let dd: HTMLInputElement = document.createElement('input');
                    dd.id = 'duration';
                    return dd;
                },
                write: (args: { element: Element }) => {
                    let dataSource: string[] = ['All', '1', '3', '4', '5', '6', '8', '9'];
                    this.dropDownFilter = new DropDownList({
                        dataSource: dataSource,
                        value: 'All',
                        change: (e: ChangeEventArgs) => {
                            let valuenum: any = +e.value;
                            let id: any = <string>this.dropDownFilter.element.id;
                            let value: any = <string>e.value;
                            if ( value !== 'All') {
                                this.treegrid.filterByColumn( id, 'equal', valuenum );
                            } else {
                                this.treegrid.removeFilteredColsByField(id);
                            }
                        }
                    });
                    this.dropDownFilter.appendTo('#duration');
             }
            };

            this.fields1 = { text: 'mode' , value: 'id'};
            this.d1data= [{ id: 'Parent', mode: 'Parent' },
                          { id: 'Child', mode: 'Child' },
                          { id: 'Both', mode: 'Both' },
                          { id: 'None', mode: 'None' },]
        }
        else if(args.item.text==='NewCol'){
            console.log('NewCol',args)
            this.editColumn=false

              var obj = { field: "priority", headerText: 'NewColumn', width: 120 }; 
            //    this.treegrid.columns.push(obj as any);   //you can add the columns by using the treeGrid columns method     
                  this.treegrid.refreshColumns();   
                    }
        else if(args.item.text==='DelCol'){
            console.log('DelCol',args)
            // this.treegrid.columns.filter((i,x) => {  
            //     if(i.field == 'duration') { 
            //     this.treegrid.columns.splice(x,1); //you can simply remove based on field name or an index of a column 
            // } 
            // }); 
            // this.treegrid.refreshColumns(); 

        }
             
                    
        

    }
    public addDisabled1  (args: MenuEventArgs) {
    }

    public rowSelected(args:any) {
        if (this.isCommandClick) {
          debugger;
          this.isCommandClick = false;
          args.cancel = true;
        }
      }

      actionBegin(args: SaveEventArgs): void {
        if (args.requestType === 'beginEdit' || args.requestType === 'add') {
            this.taskdata = Object.assign({}, args.rowData);
        }
        if (args.requestType === 'save') {
            if (this.taskForm.valid) {
                args.data = this.taskdata;
            } else {
                args.cancel = true;
            }
        }
    }

    actionComplete(args: DialogEditEventArgs): void {
        if (args.requestType === 'beginEdit' || args.requestType === 'add') {
            // Set initail Focus
            if (args.requestType === 'beginEdit') {
                // (args.form.elements.namedItem('taskName') as HTMLInputElement).focus();
            } else if (args.requestType === 'add') {
                // (args.form.elements.namedItem('taskID') as HTMLInputElement).focus();
            }

        }
    }



    change (e: ChangeEventArgs) : void {
        let mode: any = <string>e.value;
        this.treegrid.filterSettings.hierarchyMode = mode;
        this.treegrid.clearFiltering();
        this.dropDownFilter.value = 'All';
    }
}

export interface ITaskModel {
    taskID?: number;
    taskName?: string;
    startDate?: Date;
    duration?: number;
    progress?: number;
    priority?: string;
}

