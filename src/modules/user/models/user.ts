import mongoose, {Schema} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export const rolesAvailable = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not a valid role'
};

const userSchema = new Schema({
    name: {type: String, required: [true, 'Name is required']},
    email: {type: String, unique: true, required: [true, 'Email is required']},
    password: {type: String, required: [true, 'Password  is required']},
    image: {type: String, required: false},
    role: {type: String, required: false, default: 'USER_ROLE', enum: rolesAvailable}
});

userSchema.plugin(uniqueValidator, {message: '{PATH} must be unique'});

export default mongoose.model('User', userSchema);