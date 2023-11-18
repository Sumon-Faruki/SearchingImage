import { Component } from '@angular/core'; 
import { GenerateService } from '../generate.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent {
  srcData: any[]=[];
  imageLoading=false
  data:any
  srchItem:any
  imageQuantity:any
  imageGallery = false
  imageGallerySatic=true

  allUsers = [
    {
      value: 1,
      valueName: "1 Image", 
      selected : 'n'
    },
    {
      value: 2,
      valueName: "2 Image", 
      selected : "n"
    },
    {
      value: 3,
      valueName: "3 Image", 
      selected : "y"
    },
    {
      value: 4,
      valueName: "4 Image", 
      selected : "n"
    },
  ];


  constructor( private service:GenerateService , private sanitizer: DomSanitizer){}

  ngOnInit(): void { 
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.allUsers.forEach(elem=>{
      if(elem.selected=='y')
      this.imageQuantity = elem.value
    })  
  }
  
  imageGenerator(){ 
    this.imageGallerySatic = false
    this.imageLoading  = true
    this.data = this.service.aiGenerate(this.srchItem, this.imageQuantity).subscribe(res=>{ 
        if(res.data.length>0){
            res.data.forEach((ele:any)=>{
            let objectURL = 'data:image/jpeg;base64,' + ele.b64_json;
            this.srcData.push( objectURL ) ;
          }) 
          this.imageGallery = true
          this.imageLoading  = false
        }else{
          alert("Api Crashed");
        } 
    })

  }

  inputChecker(){ 
    console.log("HelloinputChecker", this.srchItem); 
  } 

  imageQuantityChange(imageQuantityValue:Event){
    console.log("imageQuantityChange",imageQuantityValue);
    
  } 
}
