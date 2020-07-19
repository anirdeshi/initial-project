import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { CommonService } from 'src/app/shared/common.service';
import { Observable, Subject } from 'rxjs';
import { Register } from 'src/app/models/register';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css']
})
export class Form1Component implements OnInit {
  lastind: number = null;
  isList: boolean = true;
  userdata: any;
  userdataresult = [];
  private updationdetails = new Subject<any>();

  @ViewChild('f1', { static: false }) form: any
  constructor(private commonservice: CommonService, private router: Router, public route: ActivatedRoute, public location: Location) {
    this.userdata = new Register();

    this.route.params.subscribe(params => {
      if (params.id != null && params.id != undefined) {
        this.edit(params.id);
      }
    })
  }


  ngOnInit() {

    this.GetAlldata();

  }

  GetAlldata() {

    this.commonservice.getdata().pipe(map((resdata, res) => {
      return resdata.userdata.map(a => {
        return {
          id: a._id,
          fname: a.fname,
          lname: a.lname,
          email: a.email,
          pass: a.pass,
          cpass: a.cpass,

        }
      })
    })
    ).
      subscribe((res) => {

        this.userdataresult = res;
        console.log(res);
      });


  }


  onsubmit() {
    debugger;
    if (this.userdata.id == undefined && this.userdata == null) {
      this.commonservice.postdata(this.userdata).subscribe((resdata: any) => {
        debugger;
        let id = resdata.postedid;
        this.userdata.id = id;
        this.userdataresult.push(this.userdata);
        this.cancel();
      });
    }
    else {
      this.commonservice.updatedata(this.userdata.id, this.userdata).pipe(map((resdata: any) => {

        return resdata.postdata = {
          id: resdata.postdata._id,
          fname: resdata.postdata.fname,
          lname: resdata.postdata.lname,
          email: resdata.postdata.email,
          pass: resdata.postdata.pass,
          cpass: resdata.postdata.cpass
        }
      })).subscribe((res: any) => {
        debugger;
        let updateindex = this.userdataresult.findIndex(a => a.id == res.id);
        this.userdataresult[updateindex] = res;
        this.updationdetails.next(this.userdataresult);
        this.cancel();

      })
    }
  }
  edit(id: any) {
    debugger;
    let param = 'Add';
    if (id != null) {
      param = id;
      this.commonservice.getById(id).pipe(map((resdata: any) => {
        return resdata = {
          id: resdata._id,
          fname: resdata.fname,
          lname: resdata.lname,
          email: resdata.email,
          pass: resdata.pass,
          cpass: resdata.cpass
        }
      })).subscribe(res => {
        debugger;
        this.userdata = res;
      });
    }
    else {
      this.userdata = new Register;

    }
    let url = this.router.url;
    this.route.params.subscribe(params => {
      if (params.id != undefined && params.id != "") {
        url = url.replace("/" + params.id, "");
      }
      this.location.go(`${url}/${param}`);
    });
    this.isList = false;
  }

  cancel() {
    this.form.resetForm();
    this.isList = true;
    let url = this.router.url;
    this.route.params.subscribe(param => {
      if (param.id != null && param.id != undefined) {
        url = url.replace("/" + param.id, "");
      }
      this.location.go(url);
    })
  }
  Delete(id: string) {
    debugger;
    this.commonservice.deletedata(id).subscribe(res => {

      let deletedata = this.userdataresult.filter(a => a.id !== id)

      this.userdataresult = deletedata;

      this.updationdetails.next(this.updationdetails);


    })
  }

}