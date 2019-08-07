import { property, Entity, model } from '@loopback/repository';

@model()
export class LoginUser extends Entity {
  @property({required: true})
  username: string;

  @property({required: true})
  password: string;
}
