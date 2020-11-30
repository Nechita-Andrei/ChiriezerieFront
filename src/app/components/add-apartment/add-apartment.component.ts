import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Apartment } from '../../model/apartment';
import { ApartmentService } from '../../service/apartment.service';
import { UtilsService } from '../../service/utils.service';

@Component({
  selector: 'app-add-apartment',
  templateUrl: './add-apartment.component.html',
  styleUrls: ['./add-apartment.component.css']
})
export class AddApartmentComponent {

  addressForm = this.fb.group({
    squareFeet: [null, Validators.required],
    city: [null, Validators.required],
    address: [null, Validators.required],
    details: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private apartmentService: ApartmentService,
    private authService: AuthenticationService,
    private utilsService: UtilsService,
    private router: Router
  ) {}

  files = [];
  myFiles: string[] = [];  
  msg = "";    
  sMsg: string = '';  
  urls = new Array<string>();

  ngOnInit() {}  
    
  getFileDetails(e) {  
    this.msg = "";
    for (let index = 0; index < e.target.files.length; index++) {
      
      var mimeType = e.target.files[index].type;
      
      if (mimeType.match(/image\/*/) == null) {
        if (this.msg === "") {
          this.msg = "<p>Only images are supported!</p>"  
        }
        this.msg += "<p>" + e.target.files[index].name + " is not valid!</p>";
        
      } else {
        this.files.push(e.target.files[index]);
        this.myFiles.push(e.target.files[index]);
      }
    }

    console.log(this.files)
    console.log(this.myFiles)

    this.urls = [];
    for (let file of this.files) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.urls.push(e.target.result);
      }
      reader.readAsDataURL(file);
    }
  }  

  onSubmit() {
    const formData = new FormData();  
    for (var i = 0; i < this.myFiles.length; i++) {  
      formData.append("fileUpload", this.myFiles[i]);  
    }
       console.log(formData.get('fileUpload'));

    let apartment: Apartment = {
      id: null,
      // userId:'',
      userId: this.authService.getUserFromLocalCache().userId,
      address: this.addressForm.controls['address'].value,
      city: this.addressForm.controls['city'].value,
      squareFeet: this.addressForm.controls['squareFeet'].value,
      details: this.addressForm.controls['details'].value,
      formData: formData
    }

    console.log(apartment.formData.get('fileUpload'))

    this.apartmentService.addApartment(apartment).subscribe(
      (res) => {
        console.log(res)
        // this.router.navigateByUrl('/home');
        this.utilsService.openSuccesSnackBar("Apartment added successfully!");
      },
      (err) => {
        console.log(err)
        this.utilsService.openFailSnackBar("Failed to submit the application!");
      }
    )    
  }
}
