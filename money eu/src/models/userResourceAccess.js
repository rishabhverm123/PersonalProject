


export class UserResourceAccess {
  id;
  idUser;
  idResource;
  idAccess;

  constructor(
    id,
    access,
    resource
  ) {
    this.id = id;
    this.idResource = resource;
    this.idAccess = access;
  }
}
