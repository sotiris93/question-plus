import { Component, EventEmitter, inject, OnInit, Output, Renderer2 } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-page-modal',
  imports: [],
  templateUrl: './leave-page-modal.component.html',
  styleUrl: './leave-page-modal.component.scss',
})
export class LeavePageModalComponent implements OnInit {
  private modalService = inject(ModalService);
  isVisible: boolean = false;

  ngOnInit(): void {
    this.modalService.modalState$.subscribe((state) => {
      this.isVisible = state;
    });
  }

  leave() {
   this.modalService.closeModal(true);
  }

  stay() {
    this.modalService.closeModal(false);
  }

}
