"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../src/user/models");
const Role = require('../../src/utils/userRoles');
const userModel = new models_1.UserModel();
test('should create new user', () => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        email: 'joepboekhold+24@gmail.com',
        username: 'Joep53',
        password: 'Welkom01',
        first_name: 'Joep',
        last_name: 'Boekhold',
        description: 'test',
        id: 6,
        role: Role.User
    };
    //prismaMock.user.create.mockResolvedValue(user)
    yield expect(userModel.createUser(user)).resolves.toEqual(user);
}));
test('should update user', () => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        email: 'joepboekhold+24@gmail.com',
        username: 'Joep54',
        password: 'Welkom01',
        first_name: 'Joep',
        last_name: 'Boekhold',
        description: 'test',
        id: 6,
        role: Role.User
    };
    //prismaMock.user.update.mockResolvedValue(user)
    yield expect(userModel.updateUser(6, user)).resolves.toEqual(user);
}));
//# sourceMappingURL=models.test.js.map