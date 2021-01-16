import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Apartment } from 'src/app/model/apartment';
import { SimpleUser } from 'src/app/model/simpleUser';
import { ApartmentService } from 'src/app/service/apartment.service';
import { UserService } from 'src/app/service/user.service';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

  constructor(
    private apartService: ApartmentService,
    private userService: UserService,
    private route: ActivatedRoute,
    private utilsService: UtilsService,
    private dialog: MatDialog,
  ) { }

  apartment: Apartment
  user: SimpleUser
  url: string = "/../";

  ngOnInit(): void {
    this.apartService.findApartment(this.route.snapshot.params.id).subscribe(
      res => {
        console.log(this.route.snapshot.params);
        const apart: Apartment = {
          id: res.id,
          userId: res.userId,
          address: res.address,
          city: res.city,
          squareFeet: res.squareFeet,
          details: res.details,
          pictureList: res.pictureList,
          price: res.price,
          rooms: res.rooms
        }
        this.apartment = apart
        this.userService.getUser(this.apartment.userId).subscribe(
          res => {
            const usr: SimpleUser = {
              id: res.id,
              name: res.name,
              phoneNumber: res.phoneNumber,
              email: res.email,
              profilePicture: res.profilePicture,
              apartments: []
            }
            this.user = usr
            console.log(this.user);
          },
          err => {
            this.utilsService.openFailSnackBar("This apartment does not exist!")
          }
        )
      },
      err => {
        this.utilsService.openFailSnackBar("This apartment does not exist!")
      }
    )
  }

  openDialog(url: string): void {
    this.dialog.open(DialogData, {
      data: {
        image: url
      }
    });
  }

}



export interface DialogData {
  image: string
}

@Component({
  selector: 'dialog-data',
  templateUrl: './image-dialog-data.html',
})
export class DialogData {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  }

}
