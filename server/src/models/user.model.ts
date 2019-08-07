import { property, Entity, model } from '@loopback/repository';

@model()
export class User extends Entity {  

  @property({required: true})
  Username: string;  
  @property({required: true})
  Password: string;
  @property({required: true})
  Email: string;
  @property({required: true})
  Birth: Date;  
  @property({required: true})
  Sex: string;
  @property({required: true})
  Phone: string;
  @property({required: true})
  NationalID: number;
  @property({required: true})
  Height: number;
  
}
