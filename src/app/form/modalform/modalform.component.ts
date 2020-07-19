import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-modalform',
  templateUrl: './modalform.component.html',
  styleUrls: ['./modalform.component.css']
})
export class ModalformComponent implements OnInit {
  modalRef: BsModalRef;
  showpopup: boolean = false;
  constructor(private modalservice: BsModalService) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.showpopup = true;
    this.modalservice.show(template);

  }
  closemodal() {
    this.modalservice.hide(1);
  }

}
