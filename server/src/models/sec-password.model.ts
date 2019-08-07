import { property, Entity, model } from '@loopback/repository';

@model()
export class SecPassword extends Entity {
  @property()
  password: string;

  @property()
  confirm: string;
}
