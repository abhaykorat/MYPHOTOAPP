export class user{
    email: string;
    id: string;
    name: string;
    profilePhotoUrl: string;
    
    constructor(email : string,id : string,name : string,profilePhotoUrl : string){
        this.email = email;
        this.id = id;
        this.name = name;
        this.profilePhotoUrl = profilePhotoUrl;
    }

}