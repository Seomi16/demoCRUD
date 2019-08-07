import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  username: string;
  user = {username:null,password:null,email:null,date:null,sex: null,phone:null,national_id:null,height:null};
  constructor() { }

  ngOnInit() {
  }
  updateData(){}
}
