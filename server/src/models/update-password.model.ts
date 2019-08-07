import { property, Entity, model } from '@loopback/repository';

@model()
export class UpdatePassword extends Entity {
  @property()
  current: string;

  @property()
  password: string;

  @property()
  confirm: string;
}
