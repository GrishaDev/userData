import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema({ collection: 'userDatas' })
export class UserData {
    @Prop()
    firstName: string;
    @Prop()
    lastName: string;
    @Prop()
    email: string;
    @Prop({ required: false, type: Number, default: null })
    age: number | null;
}

export const UserDataSchema = SchemaFactory.createForClass(UserData);
