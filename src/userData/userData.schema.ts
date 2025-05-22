import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

// export type VaultDocument = HydratedDocument<Vault>;

@Schema({ collection: 'userDatas' })
export class UserData {
    // @Prop()
    // id: string;
    @Prop()
    firstName: string;
    @Prop()
    lastName: string;
    @Prop()
    email: string;
}

export const UserDataSchema = SchemaFactory.createForClass(UserData);
