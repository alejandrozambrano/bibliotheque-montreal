import json
from dataclasses import dataclass, asdict

from fastapi import FastAPI, HTTPException, Path
from pydantic import BaseModel

from fastapi.middleware.cors import CORSMiddleware

# Ajout de la BD dans mon code

with open("livres.json", "r") as f: #Ouvrir le jasonFile en mode lecture
    livres_list = json.load(f)  #lecture du fichier f et conversion en objet python

list_livres = {k+1:v for k,v in enumerate(livres_list) }

@dataclass
class Livre():     # classe model
    id:int
    nameLivre:str
    bio:str
    auteur:str
    picture:str

class LivreUpdate(BaseModel):
    nameLivre: str
    bio: str
    auteur: str
    picture: str

app = FastAPI()   # Faire appel a fast api

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Persistance des données = saugarde permanente
def save_to_file():
    with open("livres.json", "w") as f:
        json.dump(list(list_livres.values()),f,indent=4)





# Donner le nombre de documents
@app.get("/total_livres")
def get_total_livres() -> dict:
    return {"total": len(list_livres)}

# premier end point
# Endpoint GET
@app.get("/livres")
def get_all_livres() -> list[Livre]:
    res = []
    for id in list_livres:
        res.append(Livre(**list_livres[id])) # convertir un  objet grace a l'operateur ** en dictionaire
    return res


# permet de récuperer un livre en fonction de son id
@app.get("/livre/{id}")
def get_livre_by_id(id:int=Path(ge=1))->Livre: # ge veut dire >=
    if id not in list_livres: #verifier que la recherche est dans l'intervalle [1:5]
        raise HTTPException(status_code=404,detail="Cet livre n'esxite pas")
    return Livre(**list_livres[id])

# Creation d'un livre
@app.post("/livre")
def create_livre(livre: Livre) -> Livre:
    if livre.id in list_livres:
        raise HTTPException(status_code=409,detail=f"Cet livre {livre.id} existe deja")
    list_livres[livre.id] = asdict(livre) # asdict trasnforme un objet en dictionnaire
    save_to_file()
    return livre


@app.put("/livre/{id}")
def update_livre(livre:LivreUpdate, id:int=Path(ge=1)) -> Livre: # ge >=
    if id not in list_livres:
        raise HTTPException(status_code=404,detail=f"Cet livre avec {livre.id} n'esxite pas")
    update_data_livre = Livre(id=id,nameLivre=livre.nameLivre, bio=livre.bio, auteur=livre.auteur, picture=livre.picture)
    list_livres[id] = asdict(update_data_livre)
    save_to_file()
    return update_data_livre

@app.delete("/livre/{id}")
def delete_livre(id:int=Path(ge=1))->Livre:
    if id in list_livres:
        livre = Livre(**list_livres[id])  #l'operatue ** convertit un objet en dictionqaire
        del list_livres[id]
        save_to_file()
        return livre
    raise HTTPException(status_code=404, detail=f"Cet livre avec {id} n'esxite pas")




