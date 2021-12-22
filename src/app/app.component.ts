import { dataSource, sampleData, virtualData } from './sampledata';
import { BeforeOpenCloseMenuEventArgs, ContextMenuComponent, MenuEventArgs, MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { Component, ElementRef, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommandColumnService, ContextMenuService, EditService, FilterService, PageService, ToolbarService, TreeGridComponent, VirtualScrollService } from '@syncfusion/ej2-angular-treegrid';
import { ChangeEventArgs, DropDownList, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { Browser, closest, createElement, EmitType } from '@syncfusion/ej2-base';
import { Column, DialogEditEventArgs, EditEventArgs, EditSettingsModel, SaveEventArgs } from '@syncfusion/ej2-angular-grids';
import { FormGroup } from '@angular/forms';

import { DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [EditService ,FilterService, ToolbarService , PageService,VirtualScrollService,    CommandColumnService,ContextMenuService
    ],
    // encapsulation: ViewEncapsulation.None

})
export class AppComponent {
    public text:any;
    public editColumn=false
    public editingColumn=false
    @ViewChild("deleteDialog")
  deleteDialogObj!: DialogComponent;

    @ViewChild('contextmenu')
    public contextmenu!: ContextMenuComponent;
    @ViewChild('contextmenu')
    public contextmenu2!: ContextMenuComponent;
    addData='false'
    public target: string = '#target';
    @ViewChild('container', { read: ElementRef, static: true })
  container!: ElementRef;
    // The Dialog shows within the target element.
    // The Dialog shows within the target element.
  public targetElement!: HTMLElement;
  public editing!: EditSettingsModel;
  isInitialLoad = true;
    public menuItems: MenuItemModel[] = [
        {
            text: 'EditCol',
            iconCss: 'c-custom', 
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
  @ViewChild("editDialog") dialogObj!: DialogComponent;

  @ViewChild('dropdown1')
    public dropdown1!: DropDownListComponent;
    pageSettings: { pageCount: 5; } | undefined;
    enddaterules: { date: boolean; } | undefined;
    isCommandClick: any;
    content: string | undefined;
    content1!: string;
    public deleteButtons!: ({ click: any; buttonModel: { content: string; isPrimary: boolean; }; } | { click: any; buttonModel: { content: string; isPrimary?: undefined; }; })[];
    public flag = false;

    editParams: { params: { format: string; }; } | undefined;
  contextMenuItems!: (string | { text: string; iconCss: string; target: string; id: string; })[];

  constructor  (
    // @Inject('sourceFiles') private sourceFiles: any
  ){
    // sourceFiles.files = ['filter.style.css'];

  }
    customDialogForm: any;





    ngOnInit(): void {
     
        if (virtualData.length === 0) {
          dataSource();
      }
      this.data = virtualData;
      this.contextMenuItems = [
        {
          text: 'EditCol',
          iconCss: 'c-custom',
          target: '.e-content',
          id: 'selection',
        },
        {
          text: 'NewCol',
          iconCss: 'c-custom',
          target: '.e-content',
          id: 'drag',
        },
        {
          text: 'DelCol',
          iconCss: 'c-custom',
          target: '.e-content',
          id: 'selection',
        },
        {
          text: 'ChooseCol',
          iconCss: 'c-custom',
          target: '.e-content',
          id: 'selection',
        }, {
          text: 'FreezeCol',
          iconCss: 'c-custom',
          target: '.e-content',
          id: 'selection',
        },
        {
          text: 'FilterCol',
          iconCss: 'c-custom',
          target: '.e-content',
          id: 'selection',
        }, {
          text: 'MultiSort',
          iconCss: 'c-custom',
          target: '.e-content',
          id: 'selection',
        },
      ];
      this.deleteButtons = [
        {
          click: this.deleteDlgOKButtonClick.bind(this),
          buttonModel: { content: "Ok", isPrimary: true }
        },
        {
          click: this.deleteDlgCancelButtonClick.bind(this),
          buttonModel: { content: "Cancel" }
        }
      ];
   

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




    // actionBegin(e: { requestType: string; rowData: any; cancel: boolean; }) {      if (!this.flag) {
    //     if (e.requestType == "beginEdit") {
    //       var editedData = e.rowData;
    //       e.cancel = true;
    //       // this.OrderID = editedData.OrderID;
    //       // this.ShipCity = editedData.ShipCity;
    //       // this.ShipCountry = editedData.ShipCountry;
    //       this.dialogObj.show();
    //     }
    //     if (e.requestType == "delete") {
    //       e.cancel = true;
    //       this.deleteDialogObj.show();
    //     }
    //   }
    // }
  
    // actionComplete(e: { requestType: string; }) {
    //   if (e.requestType === "save" || e.requestType === "delete") {
    //     this.flag = false;
    //   }
    // }
  
    // beforeopen(args: { maxHeight: string }) {
    //   args.maxHeight = '300px';
    // }
  
  
    deleteDlgOKButtonClick(args: any) {
      this.deleteDialogObj.hide();
      this.flag = true;
      this.treegrid.deleteRecord();
      if(this.editingColumn==false){
        this.editSettings = { allowEditing: false, allowAdding: false, allowDeleting: false , mode: 'Dialog' };

      }
    }
  
    deleteDlgCancelButtonClick(args: any) {
      this.deleteDialogObj.hide();
    }


    change (e: ChangeEventArgs) : void {
        let mode: any = <string>e.value;
        this.treegrid.filterSettings.hierarchyMode = mode;
        this.treegrid.clearFiltering();
        this.dropDownFilter.value = 'All';
    }


    //...........before close.............//
    contextMenuOpen(args: { element: { querySelectorAll: (arg0: string) => any; }; }) {
      if (this.isInitialLoad) {
        this.isInitialLoad = false;
        var parentNode: any[] = [];
        var customEle = args.element.querySelectorAll('.c-custom');
        if (customEle.length) {
          customEle.forEach((innerEle: { parentElement: any; }) => {
            parentNode.push(innerEle.parentElement);
          });
          console.log(parentNode);
          parentNode.forEach((ele) => {
            var text = ele.textContent;
            ele.innerText = '';
            let inputEle = createElement('input') as HTMLInputElement;
            console.log('inputEle',inputEle)
            // inputEle.nodeType='checkbox';
            inputEle.type = 'checkbox';
  
            inputEle.setAttribute('class', 'e-checkbox');
            ele.prepend(inputEle);
            let spanEle = createElement('span');
            spanEle.textContent = text;
            spanEle.setAttribute('class', 'e-checkboxspan');
            ele.appendChild(spanEle);
          });
        }
      }
    }
    contextMenuClick(args: { event: { target: { classList: { contains: (arg0: string) => any; }; }; }; element: { querySelector: (arg0: string) => any; }; }) {
      if (args.event.target.classList.contains('e-checkboxspan')) {
        var checkbox = args.element.querySelector('.e-checkbox');
        checkbox.checked = !checkbox.checked;
      }

      console.log('data',args.event.target)
    }
    public itemBeforeEvent(args: MenuEventArgs) {

      console.log('dataqqqq',args)
      // if (args.item.text !== 'EditCol') {
        let shortCutSpan: HTMLElement = createElement('span');
        this. text= args.item.text;
        args.element.textContent = '';
  
        let inputEle = createElement('input')as HTMLInputElement;
        inputEle.type = 'checkbox';
        inputEle.setAttribute('class', 'e-checkbox');
        shortCutSpan.innerText = this.text;
  
        args.element.appendChild(inputEle);
        args.element.appendChild(shortCutSpan);
      // }
    }
  
    onSelect(args: { event: { target: { classList: { contains: (arg0: string) => any; }; }; }; item: { text: string; }; element: { querySelector: (arg0: string) => any; }; }) {
      // if (
      //   !args.event.target.classList.contains('e-checkbox') &&
      //   args.item.text !== 'EditCol'
      // ) {
        var checkbox = args.element.querySelector('.e-checkbox');
        console.log('args',args)

        console.log('checkbox',checkbox)
      // }

      if (args.item.text == 'EditCol') {
        this.editColumn=false


        if(checkbox.checked==true){

          if (this.treegrid.getSelectedRecords().length) {
            console.log('args.item.text11',args.item.text)

            // // this.treegrid.startEdit();
            // if( this.editingColumn==false){
            //   this.editingColumn=true
  
              this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true , mode: 'Dialog' };
              this.pageSettings = { pageCount: 5 };
              this.editParams = {  params: { format: 'n' } };
              // this.tasknamerules = { required: true};
              // this.taskidrules = { required: true};
              // this.startdaterules = { date: true};
              // this.enddaterules = { date: true};
            
              // this.durationrules = {number: true , min: 0};
              this.ddlfields = { text: 'name' , value: 'id'};
              this.d1data= [{ id: 'CellEditing', name: 'Cell Editing' }, {id: 'RowEditing', name: 'Row Editing'} ]
    
              // checkbox.checked = !checkbox.checked;
              alert('You can edit any row by clicking on it');

              this.editingColumn=true

             checkbox.checked=true
            } else {
              alert('Select any row');
              checkbox.checked=false
              // this.editingColumn=false
              this.editSettings={}
            }
            }
  // else{
  //   this.editingColumn=false

  // }
    
  
        else{
          console.log('checkbox.checked111',checkbox.checked)
          this.editingColumn=false

          this.editSettings = { allowEditing: false, allowAdding: false, allowDeleting: false , mode: 'Dialog' };
        }

        
      }
      else if (args.item.text ==='FilterCol'){
     

        console.log('date11',this.editColumn)
        // this.editColumn=true
        this.editColumn=true
        if (virtualData.length === 0) {
          dataSource();
      }

      
              this.data = virtualData;
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
    else if (args.item.text ==='NewCol'){
   


    }

    else if (args.item.text ==='DelCol'){
      // this.editingColumn=false
      this.editColumn=false

      if(checkbox.checked==true){

        if (this.treegrid.getSelectedRecords().length) {
       
          this.initilaizeTarget();
    
          this.deleteDialogObj.show();
          this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };

          checkbox.checked=false

        }
        else{
          alert('Select any row');
          checkbox.checked=false
          this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };

          // this.editSettings = { allowEditing: false, allowAdding: false, allowDeleting: false, mode: 'Dialog' };
  
        }
      }
      else{
        checkbox.checked=false
        this.editSettings = { allowEditing: false, allowAdding: false, allowDeleting: false , mode: 'Dialog' };

        // this.editSettings = { allowEditing: false, allowAdding: false, allowDeleting: false, mode: 'Dialog' };
  
      }
    }
    }
    public initilaizeTarget: EmitType<object> = () => {
      this.targetElement = this.container.nativeElement.parentElement;
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

