import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Recette} from "../../models/recette";
import {ServicesConfigComponent} from "../services-config";
import {CategorieIngredient} from "../../models/categorie-ingredient";

@Injectable({
  providedIn: 'root'
})
export class RecetteService {

  constructor(private http : HttpClient) {
  }

  getAllRecettes(){
    var res : Recette[] = [];
    let req = this.http.get<any[]>(ServicesConfigComponent.url+"recette/").subscribe(
        data => {
          data.forEach(e =>{
            res.push(new Recette(e.id_recette,e.id_categorie,e.id_utilisateur,e.titre_recette,e.description_recette,e.nb_couvert,e.temps_recette));
          })},
        error => {console.log("error : "+error)});
    console.log("res : "+res)
    return res
  }

  getRecette(id : number){
    return this.http.get<Recette>(ServicesConfigComponent.url+"recette/"+id);
  }

  getEtapeByRecette(id:number){
    var tab:any[]=[];
    this.http.get<any>(ServicesConfigComponent.url+"recette/etapeRecette/"+id).subscribe(
      data=>{ 
        data.forEach((element: any) => { tab.push({id_etape:element.id_etape, place:element.place}) 
      })}
    );
    return tab;
  }

  createRecette(recette : any){
    return this.http.post<any>(ServicesConfigComponent.url+"recette/",recette).subscribe(
      data => console.log("recette crée")
    );
  }

  modifyRecette(id : number,recette : any){
    return this.http.put<any>(ServicesConfigComponent.url+"recette/"+id,recette).subscribe(
      data => console.log("recette modifiée")
    );
  }

  deleteRecette(id : number){
    return this.http.delete<Recette>(ServicesConfigComponent.url+"recette/"+id).subscribe(
      data => console.log("recette supprimée")
    );
  }
}
