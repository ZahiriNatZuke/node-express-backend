import mongoose, {Schema} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export const rolesAvailable = {
    values: ['ADMIN_ROLE', 'STUDENT_ROLE', 'TEACHER_ROLE'],
    message: '{VALUE} no es un rol válido'
};

const userSchema = new Schema({
    name: {type: String, required: [true, 'El nombre es requerido']},
    user: {type: String, unique: true, required: [true, 'El usuario es requerido'], lowercase: true},
    password: {type: String, required: [true, 'La contraseña es requerida']},
    role: {type: String, required: false, default: 'USER_ROLE', enum: rolesAvailable},
    extra: {
        escuela: {type: String},
        edad: {type: Number},
        municipio: {type: String},
        provincia: {type: String}
    }
});

userSchema.plugin(uniqueValidator, {message: '{PATH} debe ser único'});

export default mongoose.model('User', userSchema, 'users');