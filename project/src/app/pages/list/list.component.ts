import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { EmailValidator } from '@angular/forms';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit { 
  listdata: any[]=[];  
  error=""; 
  Selected ={id:null, selected:null}  
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: any[] = [];
  listOfAllData: any[] = [];
  mapOfCheckedId: { [key: string]: boolean } = {};
  isshow= true;
  searchText;
  birth :any[]= [] ;
  birth2 :any[]= [] ;

  date;
  year;
  today = new Date();
  sex = 0;
  

  
  
  constructor( private api:UserService, private router: Router) { }

  ngOnInit() {
    this.getuser();   
    
  }

  getuser(){
    this.api.getListUser().then((list: []) =>{
      this.listOfAllData = list;
      console.log(this.listOfAllData);        
      this.date = this.today.getFullYear(); 
      for(let i = 0; i<this.listOfAllData.length; i++){
        this.year = formatDate(this.listOfAllData[i].Birth, "yyyy","en-vn"); 
         this.birth.push(this.date - parseInt(this.year));
      }
      
    }, (error) => this.error = error );
  }
  

  currentPageDataChange($event: Array<{ ID: number; Username: string; Password: number; Email: string  
    ; Birth: Date; Sex: number; National_id: number; Phone: number; Height: number }>): void {
    this.listOfDisplayData = $event; 
    this.refreshStatus();
  }

  refreshStatus(): void {    
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item.ID]);
    this.isIndeterminate =
      this.listOfDisplayData.some(item => this.mapOfCheckedId[item.ID]) && !this.isAllDisplayDataChecked;

  }
  refresh(event,data){
    this.refreshStatus();
    
    if (event == true){
      this.listdata.push(data);
      this.year = formatDate(data.Birth, "yyyy","en-vn"); 
      this.birth2.push(this.date - parseInt(this.year));
    } else{
      this.listdata.forEach((item,index)=>{
        if(data.Id == item.Id){
          this.listdata.splice(index,1);
          this.birth2.splice(index,1);
        }
      })
    }    
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(item => (this.mapOfCheckedId[item.ID] = value));    
    this.refreshStatus();
  }

  Delete(){
    if(confirm("Are you sure?")){
      for(let i = 0; i < this.listdata.length; i++){
        console.log(this.listdata[i].ID);
        this.api.delUser(this.listdata[i].ID).then(()=> console.log("Delete success!"));
        
      }    
      location.reload(true);   
    }
  }
  Update(){   
    if(this.isshow == true){
      this.isshow = !this.isshow;     
      }else{
        if(confirm("Are you sure?")){        
          console.log(this.listdata);        
          for(let i = 0; i < this.listdata.length; i++){
            console.log(this.listdata[i]);
            
            this.api.putUser(this.listdata[i])
            .then(()=> console.log("Update success"),(error)=> this.error= error);
          }
          this.isshow = !this.isshow;      
        }
    }
  }

}
