import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  validationErrors: string[] = [];

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register() {
    this.accountService.register(this.model).subscribe(Response => {
      console.log(Response);
      this.cancel();
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
      if (error.error) {
        this.validationErrors = error;
      }
    }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
